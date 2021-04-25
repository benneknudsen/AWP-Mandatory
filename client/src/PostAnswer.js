import React, {Component} from 'react';

class PostAnswer extends Component {
    API_URL = process.env.REACT_APP_API_URL;
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    onChange(event) {
        this.setState({
            id: this.props.data,
            [event.target.name]: event.target.value
        })
    }

    async onSubmit() {
        // this.props.submit(this.state.answer, this.state.id);
        let response = await fetch(`${this.API_URL}/questions/${this.state.id}`, {
        headers: {
            'Content-Type': 'application/json'
        },    
        method: 'PUT',
            mode: 'cors',
            body: JSON.stringify({
                id: this.state.id,
                answer: this.state.answer
            })
        })
        const data = await response.json();
        console.log("Response ", data)
    }

    render() {
        return (
            <>
                
                <input autoComplete="off" name="answer" onChange={event => this.onChange(event)} type="text"/>
                <button onClick={_ => this.onSubmit()}>Answer the Question</button>
                <h3>Comments</h3>
            </>
        );
    }
}

export default PostAnswer;

