import React from "react";

const Button = ({ text, click }) => {
    return (
        <button className="btn btn-lg btn-primary" onClick={click}>
            {text}
        </button>
    );
}

export default Button;