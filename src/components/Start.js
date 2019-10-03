import React from "react";
import { connect } from "react-redux";

import { nextQuestion } from "../actions";

class Start extends React.Component {
    render() {
        const { counter, nextQuestion } = this.props;

        if (counter === -1) {
            return (
                <div>
                    <button className="btn btn-lg btn-primary" onClick={nextQuestion}>Start Quiz</button>
                </div>
            );
        }

        return null;
    }
}

const mapStateToProps = state => {
    return { counter: state.counter };
};

export default connect(mapStateToProps, { nextQuestion })(Start);