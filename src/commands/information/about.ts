import { ChatInputCommandInteraction, EmbedBuilder, User } from 'discord.js';
import { Command } from '../../utils/commands';
import packages from '../../../package.json';
import { commands } from '../../utils/commands';
import * as emojis from '../../assets/emojis.json';

export default new Command({
    data: {
        name: 'about',
        description: 'Shows information about me.'
    },

    run: async (interaction: ChatInputCommandInteraction) => {
        const embed = new EmbedBuilder()
            .setTitle(interaction.client.user.username)
            .setDescription(`
${interaction.client.application.description}

${emojis.githubIcon} [Check out my source code on GitHub!](https://github.com/Drazkai/shade-ts)
☕ [Buy my developer a coffee!](https://buymeacoffee.com/Drazkai)
            `
            )
            .setThumbnail(interaction.client.user.avatarURL({ extension: 'png', size: 1024 }))
            .addFields(
                {
                    name: 'Development',
                    inline: true,
                    value: `
**Developer:** [${(interaction.client.application.owner as User).tag}](https://discord.com/users/${interaction.client.application.owner.id})
**Running on:** Node.js ${process.versions.node}
**Library:** discord.js ${packages.dependencies['discord.js'].substring(1)}
                    `
                },
                {
                    name: 'Counts',
                    inline: true,
                    value: `
**Servers I'm in:** ${interaction.client.guilds.cache.size}
**Users I'm helping:** ${interaction.client.users.cache.filter(u => !u.bot).size}
**Total commands:** ${commands.size}
                    `
                },
                {
                    name: 'Connection',
                    value: `
**Up since:** <t:${~~(interaction.client.readyTimestamp / 1000)}>
**Latency:** ${~~interaction.client.ws.ping}ms
                    `
                }
            );

        interaction.reply({ embeds: [embed] });
    }
});