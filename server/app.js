
const express = require('express'); 
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db');
const path = require('path');


const appName = "benneoverflow"; 
const port = process.env.PORT || 8093; 
const app = express(); 

app.use(bodyParser.json()); 
app.use(morgan('combined')); 
app.use(cors()); 
app.use(express.static('../client/build'));

app.get('/api/questions', (req, res) => {
    // get all the questions
    async function allQuestions(){
        const questions = await db.getQuestions()    
        res.json(questions)
    }


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
   
    const id = req.body.id
    const answer = req.body.answer

   
    async function addAnswer(){
        const question = await db.addAnswer(id, answer)
        console.log(question)
    }

    addAnswer()
});

app.put('/api/vote', (req, res) => {
    
    const answerId = req.body.answerId
    const vote = req.body.vote

  
    async function updateVote(){
        await db.vote(answerId, vote)
    }


    updateVote()
})


app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);

app.listen(port, () => console.log(`${appName} Server running on port ${port}!`));