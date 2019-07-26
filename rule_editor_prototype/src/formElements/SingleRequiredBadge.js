import React from "react";

function SingleRequiredBadge(props)
{
    let dropdownExisting = [];
    const existingBadges = props.existingBadges.slice();
    for(let i = 0; i < existingBadges.length; i++)
    {
        dropdownExisting.push(
            <option key={i} value={existingBadges[i]}>{existingBadges[i]}</option>
        );
    }

    return (
        <div>
            <select
                badgeindex={props.badgeindex}
                name="requiredType"
                value={props.requiredType}
                onChange={props.onChange}
            >
                <option value="required">required</option>
                <option value="optional">optional</option>
            </select>
            &nbsp;&nbsp;&nbsp;
            <select
                badgeindex={props.badgeindex}
                name="requiredObject"
                value={props.requiredObject}
                onChange={props.onChange}
            >
                <option value="">-- select something --</option>
                {dropdownExisting}
            </select>
            &nbsp;&nbsp;&nbsp;
            <button 
                badgeindex={props.badgeindex} 
                onClick={props.onRemove}
            >
                remove
            </button>
        </div>
    );
}
export default SingleRequiredBadge;