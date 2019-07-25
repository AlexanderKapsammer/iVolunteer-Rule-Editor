import React from "react";

function SingleCondition(props)
{
    return(
        <div>
            <select
                conditionindex={props.conditionindex}
                name="conditionType"
                value={props.conditionType}
                onChange={props.onChange}
            >
                <option value="required">required</option>
                <option value="optional">optional</option>
            </select>
            &nbsp;&nbsp;&nbsp;
            <input 
                conditionindex={props.conditionindex}
                name="conditionCount"
                style={{width: 40}} 
                type="number" 
                value={props.conditionCount}
                onChange={props.onChange}
            />
            &nbsp;&nbsp;&nbsp;
            <select
                conditionindex={props.conditionindex}
                name="conditionObject"
                value={props.conditionObject}
                onChange={props.onChange}
            >
                <option value="">-- select something --</option>
                {/* add condition objects below */}
                <optgroup label="general">
                    <option value="minimum age">minimum age</option>
                    <option value="drivers license">drivers licence</option>
                    <option value="years of working experience">years of working experience</option>
                </optgroup>
                <optgroup label="firebrigarde">
                    <option value="Grundlehrgang">Grundlehrgang</option>
                    <option value="Refresher Prüfung">Refresher Prüfung</option>
                    <option value="Gruppenkommandantenprüfung">Gruppenkommandantenprüfung</option>
                </optgroup>
                <option value="more stuff">more stuff</option>
            </select>
            &nbsp;&nbsp;&nbsp;
            <button 
                conditionindex={props.conditionindex} 
                onClick={props.onRemove}
            >
                remove
            </button>
        </div>
    );
}
export default SingleCondition;