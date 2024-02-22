const { Configuration, OpenAI } = require("openai");
require('dotenv').config();

const configuration = {
    apiKey: process.env.OPENAI_API_KEY,
};
const openai = new OpenAI(configuration);

const textGeneration = async(prompt) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            prompt: `Human: ${prompt}\nAI: `,
            stop: ['Human:', 'AI:']
        });

        return {
            status: 1,
            response: `${response.choices[0].text}`
        };
    } catch (error) {
        console.log(error);
        return {
            status: 0,
            response: '',
        };

    }
};

// Testa textGeneration-funktionen med olika prompt-strängar
const testTextGeneration = async() => {
    const prompts = [
        "Hello, how are you?"
    ];

    for (const prompt of prompts) {
        const result = await textGeneration(prompt);
        console.log(`Prompt: ${prompt}`);
        console.log(`Response: ${result.response}`);
        console.log();
    }
};

testTextGeneration();