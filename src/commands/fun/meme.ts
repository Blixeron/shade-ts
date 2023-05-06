import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { Command } from '../../utils/commands';
import axios, { AxiosResponse } from 'axios';

export default new Command({
    data: {
        name: 'meme',
        description: 'Sends a random meme from Reddit.'
    },

    run: async (interaction: ChatInputCommandInteraction) => {
        let res: AxiosResponse;

        const subs = ['memes', 'meme'];

        try {
            res = await axios.get(`https://reddit.com/r/${subs[~~(Math.random() * subs.length)]}/randomrising.json`);
        } catch {
            interaction.reply({
                content: 'An error occurred while getting the meme.',
                ephemeral: true
            });
        }

        const data = res.data.data.children.find(d => d.data.url && !d.data.over_18)?.data;

        interaction.reply({
            embeds: [
                new EmbedBuilder({
                    title: data.title,
                    description: `
Posted by [u/${data.author}](https://www.reddit.com/user/${data.author} "u/${data.author}") - [Jump to post](https://reddit.com${data.permalink} "${data.title}")
                    `,
                    image: { url: data.url },
                    footer: { text: `${data.ups - data.downs} upvotes - ${data.num_comments} comments - ${data.total_awards_received} awards` }
                })
            ]
        });
    }
});