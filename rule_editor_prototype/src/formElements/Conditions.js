import React from "react";
import SingleCondition from "./SingleCondition";

function Conditions(props)
{
    const ruleConditions = props.ruleConditions.slice();
    let singleConditions = [];
    for (let i = 0; i < ruleConditions.length; i++)
    {
        singleConditions.push(
        <SingleCondition 
            key={i}
            conditionindex={i}
            conditionType={props.ruleConditions[i].conditionType}
            conditionCount={props.ruleConditions[i].conditionCount}
            conditionObject={props.ruleConditions[i].conditionObject}
            onChange={props.onConditionsChange}
            onRemove={props.onSingleRemove}
        />
        );
    }

    return(
        <div>
            <h2>
                <span style={{color: "#00ff00"}}>
                    achievement condition(s):
                </span>
            </h2>
            <button onClick={props.onAdd}>
                add condition
            </button>
            <ol>
                {singleConditions}
            </ol>
        </div>
    );
}
export default Conditions;