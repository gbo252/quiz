import React from "react";
import { connect } from "react-redux";

import {
    fetchQuestions,
    nextQuestion,
    selectCategory,
    toggleLoading
} from "../actions";

class Start extends React.Component {

    first = true;
    instructionsRef = React.createRef();

    componentDidUpdate(prevProps) {
        if (prevProps.counter !== this.props.counter) {
            if (this.props.counter === -1) {
                this.type();
            }
        }
    }

    renderCategories() {
        const { categories } = this.props;

        if (categories.length === 0) {
            return <option className="text-dark" value="loading" key="loading">LOADING...</option>;
        } else {
            if (categories[0].error) {
                return <option className="text-dark" value="error" key="error">Server Error</option>;
            } else {
                return [<option className="text-dark" value="X" key="X">CATEGORIES...</option>]
                    .concat(categories.map(category => {
                        return <option className="text-dark" value={category.id} key={category.id}>
                            {category.name.replace(/Entertainment:\s/, "").replace(/Science:\s/, "").toUpperCase()}
                        </option>;
                    }).sort((a, b) => {
                        if (a.props.children < b.props.children) { return -1; }
                        if (a.props.children > b.props.children) { return 1; }
                        return 0;
                    }));
            }
        }
    }

    renderButton() {
        const { selectedCategory, fetchQuestions, nextQuestion, loading, toggleLoading } = this.props;

        let atts = { disabled: true };

        if (selectedCategory !== null && selectedCategory !== "X") {
            atts.disabled = false;
        }

        const onClick = async () => {
            toggleLoading();
            await fetchQuestions();
            nextQuestion();
            toggleLoading();
        }

        if (!loading) {
            return (
                <button
                    className={
                        "btn btn-lg"
                        + ((selectedCategory !== null && selectedCategory !== "X") ? "" : " btn-secondary")
                    }
                    onClick={onClick}
                    {...atts}>
                    BEGIN QUIZ
                </button>
            );
        } else {
            return (
                <button className="btn btn-lg" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                    LOADING...
                </button>
            );
        }
    }

    type() {
        let i = 0;
        let txt = "CHOOSE A CATEGORY...";
        let speed = 100;

        const typeWriter = () => {
            if (i < txt.length) {
                if (this.instructionsRef.current) {
                    this.instructionsRef.current.innerHTML += txt.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                }
            }
        }

        if (this.instructionsRef.current) {
            if (this.instructionsRef.current.innerHTML === "&nbsp;") {
                if (this.first) {
                    setTimeout(() => {
                        typeWriter();
                        this.first = false;
                    }, 750);
                } else {
                    this.instructionsRef.current.innerHTML = txt;
                }
            }
        }
    }

    render() {
        const { counter, selectCategory } = this.props;

        const onChange = e => {
            selectCategory(e.target.options[e.target.selectedIndex].value)
        };

        if (counter === -1) {
            return (
                <div className="row d-flex justify-content-center align-items-around mw-25">
                    <p ref={this.instructionsRef} className="col-12 h5 text-center pt-3 mb-0">
                        {this.type()}
                        &nbsp;
                    </p>
                    <select
                        onChange={e => onChange(e)}
                        className="col-10 mt-3 mb-5 form-control form-control-lg text-white-50"
                        style={{ backgroundColor: "transparent" }}
                    >
                        {this.renderCategories()}
                    </select>
                    <div className="col-12 d-flex justify-content-center mb-4">
                        {this.renderButton()}
                    </div>
                </div>
            );
        }

        return null;
    }
}

const mapStateToProps = state => {
    return {
        counter: state.counter,
        categories: state.categories,
        selectedCategory: state.selectedCategory,
        loading: state.loading
    };
};

export default connect(
    mapStateToProps,
    {
        fetchQuestions,
        nextQuestion,
        selectCategory,
        toggleLoading
    }
)(Start);