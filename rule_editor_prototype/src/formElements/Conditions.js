import React from "react";
import SingleCondition from "./SingleCondition";
import OrCondition from "./OrCondition";

function Conditions(props) {
  
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
    const countConds = props.ruleConditions[condType + "Conds"].slice();
    let singleConditions = [];
    for (let ii = 0; ii < countConds.length; ii++) {
      singleConditions.push(
        <SingleCondition
          key={ii}
          existingData={props.existingData}
          conditiontype={condType}
          conditionindex={ii}
          conditionCount={i === 0 || i === 4? countConds[ii].conditionCount : -1}
          conditionObject={countConds[ii].conditionObject}
          onChange={props.onConditionsChange}
          onRemove={props.onSingleRemove}
        />
      );
    }

    listOfConditions[condType + "Conds"] = singleConditions.slice();

  }
  for (let i = 0; i < props.ruleConditions["orConds"].length; i++) {
    listOfConditions.orConds.push(
      <OrCondition
        key={i}
        onAdd={props.onAdd}
        existingData={props.existingData}
        ruleConditions={props.ruleConditions}
        conditiontype="or"
        conditionindex={i}
        onChange={props.onConditionsChange}
        onRemove={props.onSingleRemove}
      />
    );
  }



  return (
    <div>
      <h2>
        <span style={{ color: "#0000ff" }}>Bedingung(en):</span>
      </h2>
      <button onClick={props.onAdd} req_cond_type={"count"}>Bedingung mit Zahl</button>
      <button onClick={props.onAdd} req_cond_type={"general"}>Generelles</button>
      <button onClick={props.onAdd} req_cond_type={"course"}>Kurs</button>
      <button onClick={props.onAdd} req_cond_type={"komp"}>Kompetenz</button>
      <button onClick={props.onAdd} req_cond_type={"feedback"}>Bedingung aus Feedback</button>
      <button onClick={props.onAdd} req_cond_type={"or"}>ODER Verknüpfung</button>
      {listOfConditions["countConds"].length > 0? <h3>Bedingungen mit Zahlen</h3> : <div />}
      <ol>{listOfConditions["countConds"]}</ol>
      {listOfConditions["generalConds"].length > 0? <h3>Generelles</h3> : <div />}
      <ol>{listOfConditions["generalConds"]}</ol>
      {listOfConditions["courseConds"].length > 0? <h3>Kurse</h3> : <div />}
      <ol>{listOfConditions["courseConds"]}</ol>
      {listOfConditions["kompConds"].length > 0? <h3>Kompetenzen</h3> : <div />}
      <ol>{listOfConditions["kompConds"]}</ol>
      {listOfConditions["feedbackConds"].length > 0? <h3>Bedingungen aus Feedback</h3> : <div />}
      <ol>{listOfConditions["feedbackConds"]}</ol>
      {listOfConditions["orConds"].length > 0? <h3>Oder Bedingungen</h3> : <div />}
      <ol>{listOfConditions["orConds"]}</ol>
    </div>
  );
}
export default Conditions;
