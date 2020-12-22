import React from 'react';
import "./button-style.scss";

function button(props) {
    return (
        <button
            onClick={() => props.onClick()}
            style={{...props.style}}
            className="my-custom-button"
        >
            {props.children}
        </button>
    );
}

export default button;