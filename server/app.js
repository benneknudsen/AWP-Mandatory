/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db');
const path = require('path');

/**** Configuration ****/
const appName = "Express API Template"; // Change the name of your server app!
const port = process.env.PORT || 8085; // Pick port 8080 if the PORT env variable is empty.
const app = express(); // Get the express app object.

app.use(bodyParser.json()); // Add middleware that parses JSON from the request body.
app.use(morgan('combined')); // Add middleware that logs all http requests to the console.
app.use(cors()); // Avoid CORS errors. https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use(express.static('../client/build'));

app.get('/api/questions', (req, res) => {
    // get all the questions
    async function allQuestions(){
        const questions = await db.getQuestions()    
        res.json(questions)
    }

    // run the function
    allQuestions()
});

app.put('/api/askquestion', (req, res) => {
    let title = req.body.title
    let desc = req.body.desc
    
    async function addQuestion(){
        await db.addQuestion(title, desc)
    }
    addQuestion()
})

app.put('/api/questions/:id', (req, res) => {
    // Getting the value from the request
    const id = req.body.id
    const answer = req.body.answer

    // Add answer to the db
    async function addAnswer(){
        const question = await db.addAnswer(id, answer)
        console.log(question)
    }

    // run the function
    addAnswer()
});

app.put('/api/vote', (req, res) => {
    // get the data from the body
    const answerId = req.body.answerId
    const vote = req.body.vote

    // updateVote function to increment count
    async function updateVote(){
        await db.vote(answerId, vote)
    }

    // run the function
    updateVote()
})


app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);

app.listen(port, () => console.log(`${appName} Server running on port ${port}!`));