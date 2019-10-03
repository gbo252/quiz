import React from "react";
import { connect } from "react-redux";

class Results extends React.Component {
    render() {
        if (this.props.counter === this.props.quizLength) {
            return <div>Your Results!</div>;
        }
        return null;
    }
}

const mapStateToProps = state => {
    return {
        counter: state.counter,
        quizLength: state.quizLength
    };
};

export default connect(mapStateToProps)(Results);