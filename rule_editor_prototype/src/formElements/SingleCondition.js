import React from "react";

function SingleCondition(props) {
  const condType = props.conditiontype;
  
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
      dropdownList = <span>
        <select
          conditiontype={condType}
          conditionindex={props.conditionindex}
          name="conditionObject"
          value={props.conditionObject}
          onChange={props.onChange}
        >
          <option value="">-- wähle etwas aus --</option>
          <option value="Rettungssantitäterkurs (100h)">Rettungssantitäterkurs (100h)</option>
          <option value="Rettungssanitäter Praktikum (160h)">Rettungssanitäter Praktikum (160h)</option>
          <option value="more stuff">more stuff</option>
        </select>
        &nbsp;&nbsp;&nbsp;
      </span>;
      break;
    }
    case "komp": {
      dropdownList = <span>
        <select
          conditiontype={condType}
          conditionindex={props.conditionindex}
          name="conditionObject"
          value={props.conditionObject}
          onChange={props.onChange}
        >
          <option value="">-- wähle etwas aus --</option>
          <option value="Vertrauenswürdigkeit">Vertrauenswürdigkeit</option>
          <option value="Dialogfähigkeit">Dialogfähigkeit</option>
          <option value="Höflichkeit">Höflichkeit</option>
          <option value="Kontaktfähigkeit">Kontaktfähigkeit</option>
          <option value="Teamfähigkeit">Teamfähigkeit</option>
          <option value="Kritikfähigkeit">Kritikfähigkeit</option>
          <option value="Menschenkenntnis">Menschenkenntnis</option>
          <option value="Konfliktfähigkeit">Konfliktfähigkeit</option>
          <option value="Respekt">Respekt</option>
          <option value="Rücksichtsnahme">Rücksichtsnahme</option>
          <option value="Wertschätzung">Wertschätzung</option>
          <option value="Empathie">Empathie</option>
          <option value="Motivation">Motivation</option>
          <option value="Wachsamkeit">Wachsamkeit</option>
          <option value="Strategievermögen">Strategievermögen</option>
          <option value="Ziele setzten">Ziele setzen</option>
          <option value="Selbstdisziplin">Selbstdisziplin</option>
          <option value="Veranwortungsvoll">Veranwortungsvoll</option>
          <option value="Lernfähigkeit">Lernfähigkeit</option>
          <option value="more stuff">more stuff</option>
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
