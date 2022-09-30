import React from "react";

const TextBox = (props) =>{
    return(
        <input type="text" onFocus={props.onFocus} name="inputvalue" value={props.variable} onChange={props.function} className={props.className}></input>
    )
}

export default TextBox