import React from "react";
import { connect } from "react-redux";

import "../css/App.css";
import { fetchCategories } from "../actions";
import Jumbotron from "./Jumbotron";
import Start from "./Start";
import Question from "./Question";
import Results from "./Results";

class App extends React.Component {

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <React.Fragment>
        <Jumbotron />
        <div className="container text-white-50">
          <Start />
          <Question />
          <Results />
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, { fetchCategories })(App);