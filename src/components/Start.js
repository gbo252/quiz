import React from "react";
import { connect } from "react-redux";

import { fetchQuestions, nextQuestion, selectCategory } from "../actions";
import Button from "./Button";

class Start extends React.Component {
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
                return [<option value="X" key="X">Choose category...</option>]
                    .concat(categories.sort((a, b) => {
                        if (a.name < b.name) { return -1; }
                        if (b.name < a.name) { return 1; }
                        return 0;
                    }).map(category => {
                        return <option value={category.id} key={category.id}>
                            {category.name.replace(/Entertainment:\s/, "").replace(/Science:\s/, "")}
                        </option>;
                    }));
            }
        }
    }

    render() {
        const { counter, selectCategory, selectedCategory, fetchQuestions, nextQuestion } = this.props;

        let atts = { disabled: true };

        if (selectedCategory !== null && selectedCategory !== "X") {
            atts.disabled = false;
        }

        if (counter === -1) {
            return (
                <div className="d-flex flex-column align-items-center mt-3">
                    <h2>Click below to begin quiz!</h2>
                    <form>
                        <div className="form-group mt-4">
                            <select
                                onChange={e => selectCategory(e.target.options[e.target.selectedIndex].value)}
                                className="custom-select"
                            >
                                {this.renderCategories()}
                            </select>
                        </div>
                    </form>
                    <div className="mt-4">
                        <Button
                            text="Start Quiz"
                            click={async () => { await fetchQuestions(); nextQuestion(); }}
                            atts={atts}
                        />
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
        selectedCategory: state.selectedCategory
    };
};

export default connect(mapStateToProps, { fetchQuestions, nextQuestion, selectCategory })(Start);