import React from "react";
import { connect } from "react-redux"
import { selectAnswer } from "../actions";
import { decodeHtml } from "./helper";

class Answers extends React.Component {
    render() {
        const { answers, counter, selectAnswer } = this.props;

        return answers[counter].map((q, i) => {
            ++i;
            return (
                <div className="custom-control custom-radio custom-control-inline" key={i}>
                    <input
                        className="custom-control-input"
                        type="radio"
                        name="inlineRadioOptions"
                        ref={this.props.radioRefs[i]}
                        id={`inlineRadio${i}`}
                        value={q}
                        onChange={e => selectAnswer(e.target.value, i)}
                    />
                    <label className="custom-control-label" htmlFor={`inlineRadio${i}`}>
                        {decodeHtml(q)}
                    </label>
                </div>
            );
        });
    }
}

const mapStateToProps = state => {
    return {
        answers: state.answers,
        counter: state.counter
    };
};

export default connect(mapStateToProps, { selectAnswer })(Answers);