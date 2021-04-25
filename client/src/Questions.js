import React, {Component} from 'react';
import { Link } from "@reach/router";

class Questions extends Component {
    
    render() {
        let questions = this.props.data;
        const list = questions.map((d) => <Link  key={Math.random()} to={"/question/"+d._id}><li>{d.text}</li></Link>);

        

        return (
            <>
                <h3>Questions</h3>
                <ul>
                    {list}
                </ul>
            </>
        );
    }
}

export default Questions;

