import React from "react";

export default function Button (props) {
    
    const className = props.className ? props.className + "buttonStyle" : "buttonStyle";  
    
    return(
        <button 
            disabled={props.disabled}
            className={className} 
            style={props.style} 
            onClick={props.onClick} >
            {props.children}
        </button>
    );
}