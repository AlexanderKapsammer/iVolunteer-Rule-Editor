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
                <option value="">-- select something --</option>
                <option value="required">required</option>
                <option value="optional">optional</option>
            </select>
            {/* todo: control values below with state from App */}
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
                <option value="leadership training">leadership training</option>
                <option value="drivers license">drivers licence</option>
                <option value="hours of working experience">h of working experience</option>
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