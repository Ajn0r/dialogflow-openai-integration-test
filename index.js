const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const userInput = req.body.queryResult.text;

    // Skicka användarens inmatning till GPT-tjänsten för bearbetning
    axios.post('https://api.openai.com/v1/engines/davinci/completions', {
            prompt: userInput,
            engine: 'davinci',
            max_tokens: 2048
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        })
        .then(response => {
            const gptResponse = response.data.choices[0].text;
            // Skicka svaret från GPT-tjänsten tillbaka till Dialogflow
            res.json({ fulfillmentText: gptResponse });
        })
        .catch(error => {
            console.error(error);
            res.json({ fulfillmentText: 'Ett fel inträffade' });
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servern körs på port ${PORT}`);
});