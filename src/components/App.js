import React from "react";
import { connect } from "react-redux";
import { fetchQuestions } from "../actions";

import Question from "./Question";
import Results from "./Results";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchQuestions();
  }

  render() {
    return (
      <div>
        <Question />
        <Results />
      </div>
    );
  }
}

export default connect(null, { fetchQuestions })(App);