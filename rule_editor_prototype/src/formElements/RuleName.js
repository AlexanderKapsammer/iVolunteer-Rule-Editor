import React from "react";

function RuleName(props)
{
    return(
        <div>
            <h2><span style={{color: "#ff0000"}}>Regel Name: </span></h2>
            <input 
                name="ruleName"
                type="text"
                placeholder="gib hier den Namen deiner Regel ein"
                style={{width: 250}}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}
export default RuleName;