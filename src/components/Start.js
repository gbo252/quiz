import React from "react";
import { connect } from "react-redux";

import { nextQuestion } from "../actions";
import Button from "./Button";

class Start extends React.Component {
    render() {
        const { counter, nextQuestion } = this.props;

        if (counter === -1) {
            return (
                <div className="d-flex flex-column align-items-center mt-3">
                    <h2>Click below to begin quiz!</h2>
                    <div className="mt-4">
                        <Button text="Start Quiz" click={nextQuestion} />
                    </div>
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