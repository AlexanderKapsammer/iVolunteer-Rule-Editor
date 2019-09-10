import React from "react";
import SingleCondition from "./SingleCondition";

function OrCondition(props)
{
    let listOfConditions = {
        countConds: [],
        generalConds: [],
        courseConds: [],
        kompConds: [],
        feedbackConds: [],
        orConds: []
    };

    // cycle through condition types
    for (let i = 0; i < 5; i++)
    {
        let condType = "";

        // select type
        switch (i){
            case 0: {condType = "count"; break;}
            case 1: {condType = "general"; break;}
            case 2: {condType = "course"; break;}
            case 3: {condType = "komp"; break;}
            case 4: {condType = "feedback"; break;}
            default: {console.error("This definitely should not have happened. Something major seems to have went wrong!")}
        }
        const countConds = props.ruleConditions.orConds[props.conditionindex][condType + "Conds"].slice();
        let singleConditions = [];
        for (let ii = 0; ii < countConds.length; ii++) {
            singleConditions.push(
                <SingleCondition
                key={ii}
                existingData={props.existingData}
                conditiontype={condType}
                orcondindex={props.conditionindex}
                conditionindex={ii}
                conditionCount={i === 0 || i === 4? countConds[ii].conditionCount : -1}
                conditionObject={countConds[ii].conditionObject}
                onChange={props.onChange}
                onRemove={props.onRemove}
                />
            );
        }

        listOfConditions[condType + "Conds"] = singleConditions.slice();

    }
    return(
        <div>
            <h4>ODER Element&nbsp;&nbsp;&nbsp;
                <button conditionindex={props.conditionindex} onClick={props.onRemove} conditiontype="or">
                    entfernen
                </button>
            </h4>
            <button onClick={props.onAdd} conditionindex={props.conditionindex} isorbutton="true" req_cond_type={"count"}>Bedingung mit Zahl</button>
            <button onClick={props.onAdd} conditionindex={props.conditionindex} isorbutton="true" req_cond_type={"general"}>Generelles</button>
            <button onClick={props.onAdd} conditionindex={props.conditionindex} isorbutton="true" req_cond_type={"course"}>Kurs</button>
            <button onClick={props.onAdd} conditionindex={props.conditionindex} isorbutton="true" req_cond_type={"komp"}>Kompetenz</button>
            <button onClick={props.onAdd} conditionindex={props.conditionindex} isorbutton="true" req_cond_type={"feedback"}>Bedingung aus Feedback</button>
            {listOfConditions["countConds"].length > 0? <p>Bedingungen mit Zahlen</p> : <div />}
            <ol>{listOfConditions["countConds"]}</ol>
            {listOfConditions["generalConds"].length > 0? <p>Generelles</p> : <div />}
            <ol>{listOfConditions["generalConds"]}</ol>
            {listOfConditions["courseConds"].length > 0? <p>Kurse</p> : <div />}
            <ol>{listOfConditions["courseConds"]}</ol>
            {listOfConditions["kompConds"].length > 0? <p>Kompetenzen</p> : <div />}
            <ol>{listOfConditions["kompConds"]}</ol>
            {listOfConditions["feedbackConds"].length > 0? <p>Bedingungen aus Feedback</p> : <div />}
            <ol>{listOfConditions["feedbackConds"]}</ol>
        </div>
    );
}

export default OrCondition;