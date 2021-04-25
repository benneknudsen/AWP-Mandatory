const mongoose = require('mongoose')

try {
    const url =  process.env.MONGODB_URL || 'mongodb://localhost/database_overflow';
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
} catch (e) {
    console.error(e)
}


const questionSchema = new mongoose.Schema({
        text: String,
        desc: String,
        answers: [{
            text: String,
            votes: Number
        }]
    });


const Question = mongoose.model('Question', questionSchema);


mongoose.set('useFindAndModify', false); 


async function addQuestion(title, desc) {
    const quest = new Question({
        text: title,
        desc: desc
    });
    try {
        let savedQ = await quest.save();
        console.log("Questions saved.", savedQ);
    } catch(error) {
        console.error(error);
    }
};

async function addAnswer(id, answer) {

    const newAnswer = {
            votes: 0,
            text: answer,      
    };

  
    let answers = mongoose.model('Question')
    await answers.findByIdAndUpdate(
        { _id: id },
        { $push: { answers: newAnswer} }
    );
    return newAnswer
}

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