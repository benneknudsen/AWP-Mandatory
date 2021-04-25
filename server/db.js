const mongoose = require('mongoose')

try {
    const url =  process.env.MONGODB_URL || 'mongodb://localhost/my-database';
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
} catch (e) {
    console.error(e)
}

// Schema for Mongoose
const questionSchema = new mongoose.Schema({
        text: String,
        desc: String,
        answers: [{
            text: String,
            votes: Number
        }]
    });

// Model for Mongoose
const Question = mongoose.model('Question', questionSchema);

// Allow use of findByIdAndUpdate
mongoose.set('useFindAndModify', false); 

// Add a new question to the db
async function addQuestion(title, desc) {
    // Template for a new question
    const quest = new Question({
        text: title,
        desc: desc
    });
    
    // Save to the db
    try {
        let savedQ = await quest.save();
        console.log("Questions saved.", savedQ);
    } catch(error) {
        console.error(error);
    }
};

// Add a new answer to already existing question
async function addAnswer(id, answer) {

    // New object to push to Mongoose document
    const newAnswer = {
            votes: 0,
            text: answer,      
    };

    // Update the item from id
    let answers = mongoose.model('Question')
    await answers.findByIdAndUpdate(
        { _id: id },
        { $push: { answers: newAnswer} }
    );
    return newAnswer
}

// Get all the questions in the db
async function getQuestions(){
    const questions = mongoose.model('Question').find(function(err, questions){
        return questions
    })
    return questions
};

async function vote(answerId, vote){
    
    let points = -1
    if(vote === "up"){
        points = 1
    }

    let answers = mongoose.model('Question')
    await answers.updateOne(
        {'answers._id': answerId},
        {'$inc': { 'answers.$.votes': points }
    })
}

module.exports = {
    addQuestion: addQuestion,
    addAnswer: addAnswer,
    getQuestions: getQuestions,
    vote: vote
}