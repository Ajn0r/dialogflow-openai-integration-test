const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const openai = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// OpenAI API-nyckel
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Öppna AI konfiguration
const openaiConfig = {
    apiKey: OPENAI_API_KEY,
    engine: "text-davinci-002",
    temperature: 0.7,
    maxTokens: 100
};

// POST-endpoint för Dialogflow webhook
app.post('/webhook', async(req, res) => {
    try {
        const userInput = req.body.queryResult.queryText;

        // Anropa OpenAI för att få svar på användarens inmatning
        const response = await openai.Completion.create({
            ...openaiConfig,
            prompt: userInput + ' in one brief paragraph'
        });

        // Extrahera svarstext från OpenAI-responsen
        const gptResponse = response.data.choices[0].text.trim();

        // Returnera svaret till Dialogflow
        res.json({ fulfillmentText: gptResponse });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ fulfillmentText: "Ett fel inträffade" });
    }
});

// Starta servern
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});