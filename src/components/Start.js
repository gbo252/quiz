import React from "react";
import { connect } from "react-redux";

import {
    fetchQuestions,
    nextQuestion,
    selectCategory,
    toggleLoading
} from "../actions";

class Start extends React.Component {

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
            return [
                <option value="loading" key="loading">Loading...</option>,
                <option value="sizer" key="sizer">Japanese Anime & Manga</option>
            ];
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
                    className="btn btn-lg btn-danger"
                    onClick={onClick}
                    {...atts}>
                    BEGIN QUIZ
                </button>
            );
        } else {
            return (
                <button className="btn btn-lg btn-danger" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                    LOADING...
                </button>
            );
        }
    }

    instructionsRef = React.createRef();

    type() {
        let i = 0;
        let txt = "CHOOSE A CATEGORY...";
        let speed = 100;

        const typeWriter = () => {
            if (i < txt.length) {
                this.instructionsRef.current.innerHTML += txt.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }

        if (this.instructionsRef.current) {
            if (this.instructionsRef.current.innerHTML === "") {
                typeWriter();
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
                <div className="d-flex flex-column align-items-center mt-3">
                    <h2 ref={this.instructionsRef}>{this.type()}</h2>
                    <form>
                        <div className="form-group mt-4">
                            <select
                                onChange={e => onChange(e)}
                                className="custom-select"
                            >
                                {this.renderCategories()}
                            </select>
                        </div>
                    </form>
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