import React from "react";
import { connect } from "react-redux";

import "../css/Jumbotron.css";
import quiz from "../images/quiz.png";

const Jumbotron = ({ counter, quizLength }) => {
	return (
		<div className={"jumbotron jumbotron-fluid keyboard mb-3"}>
			<img
				src={quiz}
				className={
					"quiz img-fluid d-block mx-auto" +
					(counter >= 0 && counter < quizLength ? " slim-quiz" : "")
				}
				alt="quiz"
			/>
		</div>
	);
};

const mapStateToProps = ({ counter, quizLength }) => {
	return { counter, quizLength };
};

export default connect(mapStateToProps)(Jumbotron);
