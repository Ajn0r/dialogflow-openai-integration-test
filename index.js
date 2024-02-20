const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const axios = require('axios');
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function welcome(agent) {
        agent.add(`Welcome to my agent!`);
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }

    function handleUserInput(agent) {
        const userInput = agent.query;
        return axios.post('https://api.openai.com/v1/engines/davinci/completions', {
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
                agent.add(gptResponse);
            })
            .catch(error => {
                console.error(error);
                agent.add('An error occurred while processing your request');
            });
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('Small talk', handleUserInput); // Replace 'User Input Intent' with the actual intent name where you expect user input

    agent.handleRequest(intentMap);
});