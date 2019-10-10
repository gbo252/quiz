import React from "react";
import { CSSTransition } from 'react-transition-group';

import "../css/Progress.css";

const Progress = ({ progress, counter, quizLength }) => {
    return (
        <div>
            <CSSTransition
                in={counter >= 0 && counter < quizLength}
                timeout={1250}
                classNames="grow"
                appear={true}
            >
                <div className="progress">
                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default Progress;