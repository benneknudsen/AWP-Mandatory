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
    onSubmit() {
        this.props.submit(this.state.title, this.state.desc);
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
