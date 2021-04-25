import React, {Component} from 'react';

class AskQuestion extends Component {
    API_URL = process.env.REACT_APP_API_URL;
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            desc: ""
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
 
    async onSubmit() {
        // this.props.submit(this.state.answer, this.state.id);
        let response = await fetch(`${this.API_URL}/askquestion`, {
        headers: {
            'Content-Type': 'application/json'
        },    
        method: 'PUT',
            mode: 'cors',
            body: JSON.stringify({
                title: this.state.title,
                desc: this.state.desc
            })
        })
        const data = await response.json();
        console.log("Here's the response: ", data)
    }

    render() {
        return (
            <>
                <input placeholder="Title of question" name="title" onChange={event => this.onChange(event)} type="text"/>
                <input placeholder="What is your question?" name="desc" onChange={event => this.onChange(event)} type="text"/>
                <button onClick={_ => this.onSubmit()}>Submit Question</button>
            </>
        )
    }
}

export default AskQuestion;
