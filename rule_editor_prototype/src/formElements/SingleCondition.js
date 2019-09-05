import React from "react";

function SingleCondition(props) {
  const condType = props.conditiontype;

  console.log(props.existingData);

  let dropdownList;
  switch (condType)
  {
    case "count": {
      dropdownList = <span>
        <select
          conditiontype={condType}
          conditionindex={props.conditionindex}
          name="conditionObject"
          value={props.conditionObject}
          onChange={props.onChange}
        >
          <option value="">-- wähle etwas aus --</option>
          <option value="Mindestalter">Mindestalter</option>
          <option value="Stunden an Arbeitserfahrung">Stunden an Arbeitserfahrung</option>
          <option value="more stuff">more stuff</option>
        </select>
        &nbsp;&nbsp;&nbsp;
      </span>;
      break;
    }
    case "general": {
      dropdownList = <span>
        <select
          conditiontype={condType}
          conditionindex={props.conditionindex}
          name="conditionObject"
          value={props.conditionObject}
          onChange={props.onChange}
        >
          <option value="">-- wähle etwas aus --</option>
          <option value="Schulabschluss">Schulabschluss</option>
          <option value="Führerschein Klasse A">Führerschein Klasse A</option>
          <option value="Führerschein Klasse B">Führerschein Klasse B</option>
          <option value="Führerschein Klasse C">Führerschein Klasse C</option>
          <option value="Führerschein Klasse D">Führerschein Klasse D</option>
          <option value="Führerschein Klasse E">Führerschein Klasse E</option>
          <option value="Führerschein Klasse F">Führerschein Klasse F</option>
          <option value="Matura">Matura</option>
          <option value="körperliche und geistige Eignung">körperliche und geistige Eignung</option>
          <option value="more stuff">more stuff</option>
        </select>
        &nbsp;&nbsp;&nbsp;
      </span>;
      break;
    }
    case "course": {
      let courseOptGroups = [];
      for (let i = 0; i < props.existingData["organisations"].length; i++) {
        const courses = props.existingData[props.existingData["organisations"][i] + "_courses"].slice();
        let options = [];
        for (let ii = 0; ii < courses.length; ii++) {
          options.push(<option key={ii} value={courses[ii]}>{courses[ii]}</option>)
        }
        if (options.length > 0)
        {
          courseOptGroups.push(
            <optgroup 
              key={i}
              label={props.existingData["organisations"][i]}
              >
              {options}
            </optgroup>
          );
        }
      }
      dropdownList = <span>
        <select
          conditiontype={condType}
          conditionindex={props.conditionindex}
          name="conditionObject"
          value={props.conditionObject}
          onChange={props.onChange}
        >
          <option value="">-- wähle etwas aus --</option>
          {courseOptGroups}
        </select>
        &nbsp;&nbsp;&nbsp;
      </span>;
      break;
    }
    case "komp": {
      let allOptions = [];
      let existingKomps = props.existingData["competences"].slice();
      existingKomps.sort();
      for (let i = 0; i < existingKomps.length; i++) {
        allOptions.push(<option key={i} value={existingKomps[i]}>{existingKomps[i]}</option>);
      }

      dropdownList = <span>
        <select
          conditiontype={condType}
          conditionindex={props.conditionindex}
          name="conditionObject"
          value={props.conditionObject}
          onChange={props.onChange}
        >
          <option value="">-- wähle etwas aus --</option>
          {allOptions}
        </select>
        &nbsp;&nbsp;&nbsp;     
      </span>;
      break;
    }
    case "feedback": {
      dropdownList = <span>
        <input 
          conditiontype={condType}
          conditionindex={props.conditionindex}
          name="conditionObject"
          value={props.conditionObject}
          onChange={props.onChange}
          style={{width: 250}}
        />
        &nbsp;&nbsp;&nbsp;
      </span>
      break;
    }
    default: {
      throw new Error("Can not render invalid conditon type of \"" + condType + "\"!");
    }
  }

  return (
    <div>
      {condType === "count" || condType === "feedback"? <span>
          <input
            conditiontype={condType}
            conditionindex={props.conditionindex}
            name="conditionCount"
            style={{ width: 40 }}
            type="number"
            value={props.conditionCount}
            onChange={props.onChange}
          />
          &nbsp;&nbsp;&nbsp;
        </span>: null
      }
      {dropdownList}
      <button conditionindex={props.conditionindex} onClick={props.onRemove} conditiontype={condType}>
        entfernen
      </button>
    </div>
  );
}
export default SingleCondition;
