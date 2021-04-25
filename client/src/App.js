import React, {Component} from 'react';
import { Router, Link } from "@reach/router";
import AskQuestion from './AskQuestion';
import Question from './Question';
import Questions from './Questions';
import './mystyle.css'

class App extends Component {
    API_URL = process.env.REACT_APP_API_URL;
    constructor(props) {
        super(props);

        this.state = {
            questions: []
        }
    }

    componentDidMount(){
        this.getQuestions().then(() => console.log("Questions are working"));
    }

    async getQuestions(){
        let url = `${this.API_URL}/questions`;
        let response = await fetch(url);
        let data = await response.json()
        return this.setState({
            questions: data
        })
    }


    getQuestion(id) {
        const findFunction = questions => questions._id === id; 
        return this.state.questions.find(findFunction)
    }

    submitAnswer(answer, id){
        let state = this.state.questions
        let element = state.find(x=>x.id === id)
        element.comments.unshift(answer);
    }

    submit(title, desc, votes, comments) {
        let last = this.state.questions[this.state.questions.length -1]
        const newQuestion = {
            id: last.id + 1,
            title: title,
            question: desc,
            votes: votes,
            comments: comments
        };
        this.setState({
            questions: [...this.state.questions, newQuestion]
        })
    }


    vote(questionID, answerID, isUpvote) {
        let stateCopy = this.state.questions;
        let targetQuestion = stateCopy.find(question => question._id === questionID);
        let targetAnswer = targetQuestion.answers.find(answer => answer._id === answerID);

        console.log(targetQuestion + targetAnswer);
        if (isUpvote) {
            targetAnswer.votes ++;
        } else {
            targetAnswer.votes --;
        }

        this.setState({
                questions: stateCopy
            });
    }

    async voting(answer, questionID) {
        const response = await fetch(`${this.API_URL}/questions/${questionID}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                text: answer
            })
        });
        const data = await response.json();
        console.log("response:", data);
    }

    render() {
        return (
            <>
            <nav>
                <ul>
                    <Link to="/"><li key="home">Home</li></Link>
                    <Link to="/"><li key ="questions">Questions</li></Link>
                    <Link to="/ask"><li key="ask">Ask a question</li></Link>
                </ul>
            </nav>
            <h1>Welcome to BenneOverflow</h1>
                <Router>
                  <AskQuestion path="/ask" submit={(title, desc, vote, comments) => this.submit(title, desc, vote, comments)}></AskQuestion>
                  <Question path="/question/:id" getQuestion={(id) => this.getQuestion(id)} submitAnswer={(answer, id) => this.submitAnswer(answer, id)}></Question>
                  <Questions path="/" data={this.state.questions}></Questions>
                </Router>

            </>
        );
    }
}

export default App;
