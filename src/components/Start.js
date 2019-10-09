import React from "react";
import { connect } from "react-redux";

import "../css/Start.css";
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
            return <option value="loading" key="loading">Loading...</option>;
        } else {
            if (categories[0].error) {
                return <option value="error" key="error">Server Error</option>;
            } else {
                return [<option value="X" key="X">CATEGORIES...</option>]
                    .concat(categories.map(category => {
                        return <option value={category.id} key={category.id}>
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
                    className="btn btn-lg btn-secondary"
                    onClick={onClick}
                    {...atts}>
                    BEGIN QUIZ
                </button>
            );
        } else {
            return (
                <button className="btn btn-lg btn-secondary" type="button" disabled>
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
                    typeWriter();
                    this.first = false;
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
                <div className="d-flex flex-column align-items-center mt-3 mw-25">
                    <h2 ref={this.instructionsRef}>
                        {this.type()}
                        &nbsp;
                    </h2>
                    <select
                        onChange={e => onChange(e)}
                        className="custom-select mt-4"
                    >
                        {this.renderCategories()}
                    </select>
                    <div className="mt-4">
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