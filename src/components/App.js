import React from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../actions";

import Start from "./Start";
import Question from "./Question";
import Results from "./Results";

class App extends React.Component {
  
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <div className="container">
        <Start />
        <Question />
        <Results />
      </div>
    );
  }
}

export default connect(null, { fetchCategories })(App);