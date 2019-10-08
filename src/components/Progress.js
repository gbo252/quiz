import React from "react";

const Progress = ({ progress }) => {
    return (
        <div className="progress">
            <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    );
};

export default Progress;