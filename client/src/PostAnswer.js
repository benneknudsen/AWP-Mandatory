import React, {Component} from 'react';

class PostAnswer extends Component {
    API_URL = process.env.REACT_APP_API_URL;
    constructor(props) {
        super(props);
        this.state = {
            answer: ""
        }
    }

    onChange(event) {
        this.setState({
            id: this.props.data,
            [event.target.name]: event.target.value
        })
    }

    onSubmit() {
        this.props.submit(this.state.answer);
    }

    render() {
        return (
            <>
                <h3>Comments</h3>
                <input autoComplete="off" name="answer" onChange={event => this.onChange(event)} type="text"/>
                <button onClick={_ => this.onSubmit()}>Answer the question</button>
            </>
        );
    }
}

export default PostAnswer;

