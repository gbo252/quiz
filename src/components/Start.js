import React from "react";
import { connect } from "react-redux";

import { nextQuestion } from "../actions";
import Button from "./Button";

class Start extends React.Component {
    render() {
        const { counter, nextQuestion } = this.props;

        if (counter === -1) {
            return (
                <div>
                    <h2>Click to begin quiz!</h2>
                    <Button text="Start Quiz" click={nextQuestion} />
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