import { AttachmentBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../../utils/commands';
import axios from 'axios';
import * as config from '../../config.json';

export default new Command({
    data: {
        name: 'dog',
        description: 'Shows a dog image and a dog fact. 🐶'
    },

    run: async (interaction: ChatInputCommandInteraction) => {
        const fact = await axios.get('https://dogapi.dog/api/v2/facts');
        const image = await axios.get('https://api.thedogapi.com/v1/images/search?limit=1&size=full', {
            headers: {
                'x-api-key': config.cat_api_token
            }
        });

        if ((fact.status || image.status) != 200) {
            interaction.reply({
                content: 'An error occurred while getting the fact or the image.',
                ephemeral: true
            });
        }

        await interaction.deferReply();

        const attachment = new AttachmentBuilder(image.data[0].url);

        interaction.followUp({
            content: fact.data.data[0].attributes.body,
            files: [attachment]
        });
    }
});