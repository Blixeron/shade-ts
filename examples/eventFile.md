## Event Example 
Here's an example of how an event would look like.

```ts
import { Event } from "../bot/classes/event";

export default new Event({
    name: "The name of the event. If it isn't valid, an error will be raised.",

    // Run Function, where you can assign the parameters you want to use in the event. They're declared in https://github.com/BlixerDev/shade/blob/main/src/bot/classes/event.ts
    async run(client) {
        // Here goes your event code. I recommend taking a look at Discord.js' documentation.
    }
});
```