const express = require("express");
const bodyParser = require("body-parser");
const { WebhookClient } = require("dialogflow-fulfillment");

const app = express().use(bodyParser.json());

const port = process.env.PORT || 9005;

app.post("/webhook", (req, res) => {
    console.log("request", req.body);
    const _agent = new WebhookClient({ request: req, response: res });

    function welcome(agent) {
        
        agent.add('Welcome to ask my couch ');
    }

    function func(agent) {
        agent.add('This is your schedule');
    }

    let intents = new Map();
    intents.set('welcome', welcome);
    intents.set('schedule', func);
    _agent.handleRequest(intents);  // Uncomment this line to handle Dialogflow intents
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
