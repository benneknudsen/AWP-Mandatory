import React, {Component} from 'react';
import PostAnswer from "./PostAnswer";

class Question extends Component {
    API_URL = process.env.REACT_APP_API_URL;
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
        }
    }

    submit(answer){
        this.setState({
            answer: answer
        }, () => {
            this.props.submitAnswer(this.state.answer, this.state.id)
        });
    }

    async updateVote(id, vote){
        let response = await fetch(`${this.API_URL}/vote`, {
        headers: {
            'Content-Type': 'application/json'
        },    
        method: 'PUT',
            mode: 'cors',
            body: JSON.stringify({
                answerId: id,
                vote: vote
            })
        })
        const data = await response.json();
        console.log("Response ", data)
    }
    
    render() {
        const id = this.props.id;
        const question = this.props.getQuestion(id);
        const answers = question.answers;

        const displayAnswers = answers.map(answer => 
        <div className="comment">{answer.text}
            <span className="votes">Votes: {answer.votes}</span>
            <button onClick={() => { this.updateVote(answer._id, "up") }} className="btn">Like</button>
            <button onClick={() => { this.updateVote(answer._id, "down") }} className="btn">Dislike</button>
        </div>)
        
        return (
            <>
                <h1>{question.text}</h1>
                <p>{question.desc}</p>
                <PostAnswer data={this.state.id} submit={(answer, id) => this.submit(answer, id)} onClick={_ => this.clicked()}></PostAnswer>
                {displayAnswers}
            </>
        );
    }
}

export default Question;

