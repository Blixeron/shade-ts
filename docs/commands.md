# Commands Guide
This is how commands work on Shade.

# Collections
The first thing we do is creating 2 collections. A `Collection` is a extension of native JavaScript `Map` class, but with more functionality. To put it simple, is Discord.js' way to store information that we'd need later, and interact with it more easily.

This is how we do it:
```js
/** @type {discord.Collection<string, { name: string, commands: string[] }>} */
categories = new discord.Collection;
/** @type {discord.Collection<string, Command>} */
commands = new discord.Collection;
```
It looks a bit complex, doesn't it? But it isn't that hard, let's take a look at it:

First of all, we use an `@type` declaration, which declares the type of the code below. What we're declaring here is how our collection structure is going to look like.

For the `categories` Collection, we make a property of type `string`, which will be the name of the category. Inside of that property, we have two more: `name`, which is the name of the category (again), and `commands`, where all the commands names are stored inside of an Array.

The delcarations for our `commands` Collection are more simple. We just add a property of type `string`, which represents the name of the command, and a property of type... `Command`? It's a class. In this case, a schema we follow every time we make a Command, which we use to use commands data more easily, as well as automatic type declarations.

## Command class
Here's how the class works:
```js
/** 
 * @typedef {Object} RunOptions
 * @property {Shade} client
 * @property {discord.CommandInteraction | discord.ContextMenuInteraction} interaction
 */

/** @typedef {(options: RunOptions) => any} RunFunction */

/**
 * @typedef {{
 *     data: discord.ApplicationCommandData;
 *     permission?: discord.PermissionResolvable;
 *     guildOnly?: boolean;
 *     ownerOnly?: boolean;
 *     run: RunFunction;
 * }} CommandOptions
 */

module.exports = class Command {
    /** @type {discord.ApplicationCommandData} */
    data;
    /** @type {discord.PermissionResolvable} */
    permission;
    /** @type {boolean} */
    guildOnly;
    /** @type {boolean} */
    ownerOnly;
    /** @type {RunFunction} */
    run;

    /** @param {CommandOptions} commandOptions */
    constructor(commandOptions) {
        Object.assign(this, commandOptions);
    }
};
```
Wow! That's a lot of stuff going on, let me explain:

First of all, we declare the type of our Run Options (which are the parameters we're going to use later in our commands), `Shade` being the `client`, and `interaction`, which has two types: `CommandInteraction` and `ContextMenuInteraction`. That's so we can use both classes properties and methods.

Then we store all of these values inside our Run Function (the actual property where all the command code is placed in).

Now, we create our Command Options, and by this I mean all the properties we want our commands to have:
- `data` is where all the information of the Slash Commands is located. `ApplicationCommandData` gives the property all the values that we need.
- `permission` is a property where we select if a command shold require a permission, or not. `PermissionResolvable` gives us autocompletion for the permissions' names.
- `guildOnly` we put here whether if the command can be executed only inside of servers (true), or not (false).
- `ownerOnly` we put here whether if the command can only be executed by the bot owner (true) or if can be ran by everyone (false).
- `run` the property of our Run Function where our code is located.

We're almost done! Now we export the class `Command` and specify all the properties it has, those are the same we mentioned before. And that's it! By using it as a type for the `commands` Collection, we're just telling JavaScript that everything we put in that value, must be a valid Command.

## Loading our commands
Now, we need to load all of our commands. This is how we do it:
```js
/** @param {Shade} client */
async load(client) {
    console.log("Loading commands...");

    for (const folder of fs.readdirSync("./src/commands/")) {
        const files = fs.readdirSync(`./src/commands/${folder}`);

        client.categories.set(folder, {
            name: folder,
            commands: files.map(file => file.slice(0, -3)),
        });

        for (const file of files) {
            /** @type {Command}*/
            const command = require(`../../commands/${folder}/${file}`);
            client.commands.set(command.data.name, command);
            console.log(`- ${command.data.name} loaded.`);
        }
    }
}
```
Okay. Let me explain how this works:

First of all, we make a `load` method that we'll be using later.

Inside of this method, we make a `for-loop`, using the `fs` module (FS stands for FileSystem), we scan all the folders inside our `./src/commands` folder, recursively. With this, we gain access to the contents of these folders, and store them in a `folder`constant.

After that we declare a `ffiles` value, and use the `fs` module once again, but this time, we use the `folder`constant we declared before to, this time, access all the files inside of the folders.

Now, we use the `categories` Collection to store the names of our categories, and store the names of the commands inside of each one.

Then, we just make another `for-loop`, and declare the type of the files (which must be a valid `Command`, else it will throw an error), and we require all the commands to work with them.
 them.

The last step is setting the commands up in the collection, so we add the command names, and the entire command, inside of the `commands`Collection.

In the client file, we just require the loader we just made, create a `loadModules` method, and use the `load` method inside of this one, to losd commands and events simultaneously. 
```js
loadModules() {
    commands.load(this);
    events.load(this);
}
```
In our `start` method, we use the method we just created, and... Boom! Now your commands are loaded!