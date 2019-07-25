import React from "react";
import SingleCondition from "./SingleCondition";

function Conditions(props)
{
    const ruleConditions = props.ruleConditions.map(
        (condition) => { return(condition); }
    );
    let singleConditions = [];
    for (let i = 0; i < ruleConditions.length; i++)
    {
        singleConditions.push(
        <SingleCondition 
            key={i}
            conditionindex={i}
            conditionType={props.ruleConditions[i].conditionType}
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