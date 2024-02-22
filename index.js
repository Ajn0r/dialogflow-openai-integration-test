const express = require('express');
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
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 150,
            temperature: 0.7,
            stop: ['Human:', 'AI:']
        });

        return {
            status: 1,
            response: `${response.choices[0].message.content}`
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

const supportedIntents = ['Värnplikt', 'gpt', 'Söka jobb', 'Upphittad ammunition', 'Flygning med drönare'];

webApp.post('/dialogflow', async(req, res) => {
    console.log('Dialogflow request body:', req.body);

    let intentDisplayName = req.body.queryResult.intent.displayName;
    let queryText = req.body.queryResult.queryText;

    if (supportedIntents.includes(intentDisplayName)) {
        // Använd OpenAI för att generera svar
        let result = await textGeneration(queryText);

        if (result.status == 1) {
            res.json({
                fulfillmentText: result.response
            });
        } else {
            res.json({
                fulfillmentText: `Jag kan tyvärr inte svara på den frågan.`
            });
        }
    } else {
        res.json({
            fulfillmentText: `Jag förstår inte frågan. Ställ en annan fråga eller kontakta handläggare på Försvarsmakten via telefon: 08 - 788 75 00 eller e-post:  exp-hkv@mil.se.`
        });
    }
});



webApp.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});