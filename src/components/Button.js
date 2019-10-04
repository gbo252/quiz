import React from "react";

const Button = ({ text, click, atts }) => {
    return (
        <button className="btn btn-lg btn-primary" onClick={click} {...atts}>
            {text}
        </button>
    );
}

export default Button;