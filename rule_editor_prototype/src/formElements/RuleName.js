import React from "react";

function RuleName(props)
{
    return(
        <div>
            <h2><span style={{color: "#ff0000"}}>rule name: </span></h2>
            <input 
                name="ruleName"
                type="text"
                placeholder="enter the name of your rule"
                style={{width: 250}}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}
export default RuleName;