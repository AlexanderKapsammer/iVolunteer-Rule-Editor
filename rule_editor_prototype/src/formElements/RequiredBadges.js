import React from "react";
import SingleRequiredBadge from "./SingleRequiredBadge";

function RequiredBadges(props)
{
    const ruleRequiredBadges = props.ruleRequiredBadges.slice();
    let singleBadges = [];
    for(let i = 0; i < ruleRequiredBadges.length; i++)
    {
        singleBadges.push(
            <SingleRequiredBadge 
                key={i}
                badgeindex={i}
                requiredType={props.ruleRequiredBadges[i].requiredType}
                requiredObject={props.ruleRequiredBadges[i].requiredObject}
                existingBadges={props.existingBadges}
                onChange={props.onBadgesChange}
                onRemove={props.onSingleRemove}
            />
        );
    }

    return(
        <div>
        <h2>
            <span style={{color: "#ffa500"}}>
                required badge(s):
            </span>
        </h2>
        <button onClick={props.onAdd}>
            add required badge
        </button>
        <ol>
            {singleBadges}
        </ol>
    </div>
    );
}
export default RequiredBadges;