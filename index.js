const express = require('express');
const { Configuration, OpenAI } = require("openai");
require('dotenv').config();

const configuration = {
    apiKey: process.env.OPENAI_API_KEY,
};
const openai = new OpenAI(configuration);

const textGeneration = async(prompt) => {
    try {
        const response = await openai.complete({
            engine: 'davinci',
            prompt: `Human: ${prompt}\nAI: `,
            temperature: 0.9,
            maxTokens: 500,
            topP: 1,
            frequencyPenalty: 0,
            presencePenalty: 0.6,
            stop: ['Human:', 'AI:']
        });

        return {
            status: 1,
            response: `${response.choices[0].text}`
        };
    } catch (error) {
        return {
            status: 0,
            response: ''
        };
    }
};

const webApp = express();
const PORT = process.env.PORT || 3000; // Ange en standardport om PORT inte är satt

webApp.use(express.urlencoded({ extended: true }));
webApp.use(express.json());
webApp.use((req, res, next) => {
    console.log(`Path ${req.path} with Method ${req.method}`);
    next();
});

webApp.get('/', (req, res) => {
    res.sendStatus(200);
});

webApp.post('/dialogflow', async(req, res) => {
    console.log('Dialogflow request body:', req.body); // Lägg till denna loggning

    let action = req.body.queryResult.action;
    let queryText = req.body.queryResult.queryText;

    if (action === 'input.unknown') {
        let result = await textGeneration(queryText);
        if (result.status == 1) {
            res.send({
                fulfillmentText: result.response
            });
        } else {
            res.send({
                fulfillmentText: `Sorry, I'm not able to help with that.`
            });
        }
    } else {
        res.send({
            fulfillmentText: `No handler for the action ${action}.`
        });
    }
});


webApp.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});