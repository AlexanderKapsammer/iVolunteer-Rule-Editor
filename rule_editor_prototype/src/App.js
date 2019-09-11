import React from "react";

import Conditions from "./formElements/Conditions";
import serverData from "./testData/database.json"



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      existingData: {},
      prevStates: [],

      ruleImg: "",
      ruleType: "kompetenz",
      ruleName: "",
      ruleDescription: "",
      ruleConditions: {
        countConds: [],
        generalConds: [],
        courseConds: [],
        kompConds: [],
        feedbackConds: [],
        orConds: []
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.saveState = this.saveState.bind(this);
    this.handleAddCondition = this.handleAddCondition.bind(this);
    this.handleRemoveCondition = this.handleRemoveCondition.bind(this);
    this.handleConditionsChange = this.handleConditionsChange.bind(this);
    this.createRule = this.createRule.bind(this);
  }

  // basic generic methodes
  // =================================================================================

  componentWillMount()
  {
    this.setState({existingData: serverData});
  }

  handleChange(event) {
    const { name, value, files} = event.target;
    const trueValue = files !== null? files.length > 0? URL.createObjectURL(files[0]) : "" : value;
    if (files === null) {
      this.saveState();
    }
    this.setState(() => {
      return { [name]: trueValue };
    });
  }

  // =================================================================================
  // undo mechanics

  handleUndo()
  {
    if (this.state.prevStates.length > 0) {
      const prevStatesLenght= this.state.prevStates.length;
      this.setState(prevstate => {
        let newPrevStates = prevstate.prevStates.slice();
        newPrevStates.splice(prevStatesLenght - 1, 1)
        return({
          ruleType: prevstate.prevStates[prevStatesLenght - 1].ruleType,
          ruleName: prevstate.prevStates[prevStatesLenght - 1].ruleName,
          ruleConditions: prevstate.prevStates[prevStatesLenght - 1].ruleConditions,
          ruleDescription: prevstate.prevStates[prevStatesLenght - 1].ruleDescription,
          prevStates: newPrevStates
        });
      });
    }
    else {
      alert("no previous state available");
    }
  }
  saveState()
  {
    this.state.prevStates.push({
      ruleType: this.state.ruleType,
      ruleName: this.state.ruleName,
      ruleDescription: this.state.ruleDescription,
      ruleConditions: this.state.ruleConditions
    });
    if (this.state.prevStates.length > 20) {
      this.state.prevStates.splice(0, 1);
    }
  }

  // =================================================================================
  // specialized methodes to work for Conditions.js and OrCondition.js
  handleAddCondition(event) {
    const isOrCond = event.target.getAttribute("isorbutton");
    const condIndex = event.target.getAttribute("conditionindex");
    const condType = event.target.getAttribute("req_cond_type");
    let newRuleConditions = isOrCond === null? 
      this.state.ruleConditions[condType + "Conds"].slice() : 
      this.state.ruleConditions.orConds[condIndex][condType + "Conds"].slice();
    let newState;
    if (condType === "or") {
      newRuleConditions.push({
        chooseX: 1,
        countConds: [],
        generalConds: [],
        courseConds: [],
        kompConds: [],
        feedbackConds: []
      });
      newState = {
        ruleConditions: {
          ...this.state.ruleConditions,
          orConds: newRuleConditions
        }
      }
    }
    else if (isOrCond === null) {
      newRuleConditions.push({
        conditionCount: condType === "count" || condType === "feedback"? 1 : -1,
        conditionObject: ""
      });
      newState = {
        ruleConditions: {
          ...this.state.ruleConditions,
          [condType + "Conds"]: newRuleConditions
        }
      }
    }
    else {
      newRuleConditions.push({
        conditionCount: condType === "count" || condType === "feedback"? 1 : -1,
        conditionObject: ""
      });

      const a = {
        ...this.state.ruleConditions.orConds[condIndex],
        [condType + "Conds"]: newRuleConditions
      }
      let b = this.state.ruleConditions.orConds.slice();
      b[condIndex] = a;

      newState = {
        ruleConditions: {
          ...this.state.ruleConditions,
          orConds: b
        }
      }
    }
    
    this.saveState();
    this.setState(newState);
  }

  handleRemoveCondition(event) {
    const condType = event.target.getAttribute("conditiontype");
    const orCondIndex = event.target.getAttribute("orcondindex");
    const conditionindex = event.target.getAttribute("conditionindex");
    let newState;
    if (orCondIndex === null) {
      let newRuleConditions = this.state.ruleConditions[condType + "Conds"].slice();
      newRuleConditions.splice(conditionindex, 1);

      newState = {
        ruleConditions: {
          ...this.state.ruleConditions,
          [condType + "Conds"]: newRuleConditions
        }
      }
    }
    else {
      let newRuleConditions = this.state.ruleConditions.orConds[orCondIndex][condType + "Conds"].slice();
      newRuleConditions.splice(conditionindex, 1);

      let newChooseX = this.state.ruleConditions.orConds[orCondIndex].chooseX - 1;
      if (newChooseX < 1) {
        newChooseX = 1;
      }

      const a = {
        ...this.state.ruleConditions.orConds[orCondIndex],
        [condType + "Conds"]: newRuleConditions,
        chooseX: newChooseX
      }
      let b = this.state.ruleConditions.orConds.slice();
      b[orCondIndex] = a;

      newState = {
        ruleConditions: {
          ...this.state.ruleConditions,
          orConds: b
        }
      }
    }

    this.saveState();
    this.setState(newState);
  }

  handleConditionsChange(event) {
    const { name, value } = event.target;
    const condType = event.target.getAttribute("conditiontype");
    const orCondIndex = event.target.getAttribute("orcondindex");
    const conditionindex = event.target.getAttribute("conditionindex");
    let newState;
    let newRuleConditions 
    if (name === "chooseX") {
      newRuleConditions = this.state.ruleConditions.orConds.slice();
    }
    else if (orCondIndex === null) {
      newRuleConditions = this.state.ruleConditions[condType + "Conds"].slice();
    } else {
      newRuleConditions = this.state.ruleConditions.orConds[orCondIndex][condType + "Conds"].slice();
    }
    if (name === "chooseX") {
      let innerOrCount = 0;
      let condTypeTest;
      for (let i = 0; i < 5; i++) {
        switch (i) {
          case 0: {condTypeTest = "count"; break;}
          case 1: {condTypeTest = "general"; break;}
          case 2: {condTypeTest = "course"; break;}
          case 3: {condTypeTest = "komp"; break;}
          case 4: {condTypeTest = "feedback"; break;}
          default: {console.error("This definitely should not have happened. Something major seems to have went wrong!")}
        }
        innerOrCount += newRuleConditions[conditionindex][condTypeTest + "Conds"].length;
      }
      if ((value < 1 || value > innerOrCount) && value !== 1) {
        alert("Error, value out of range");
        newRuleConditions[conditionindex].chooseX = this.state.ruleConditions.orConds[conditionindex].chooseX;
      }
      else {
        newRuleConditions[conditionindex].chooseX = value;
      }
 
    } else if (condType === "count" || condType === "feedback") {
      if (name === "conditionCount" && value < 1) {
        alert("The count must be at least 1!");
        newRuleConditions[conditionindex] = {
          ...newRuleConditions[conditionindex],
          conditionCount: 1
        };
      } else {
        newRuleConditions[conditionindex] = {
          ...newRuleConditions[conditionindex],
          [name]: value
        };
      }
    } else {
      newRuleConditions[conditionindex] = {
        ...newRuleConditions[conditionindex],
        [name]: value
      };
    }

    if (orCondIndex === null) {
      newState = {
        ruleConditions: {
          ...this.state.ruleConditions,
          [condType + "Conds"]: newRuleConditions
        }
      }
    }
    else {
      const a = {
        ...this.state.ruleConditions.orConds[orCondIndex],
        [condType + "Conds"]: newRuleConditions
      }
      let b = this.state.ruleConditions.orConds.slice();
      b[orCondIndex] = a;

      newState = {
        ruleConditions: {
          ...this.state.ruleConditions,
          orConds: b
        }
      }
    }

    this.saveState();
    this.setState(newState);
  }



  // ===================================================================================
  // creating the rule!
  createRule() {

    // check if form is completed
    let sthExists = false;
    for (let i = 0; i < 6; i++) {
      let condType = "";

      // select type
      switch (i) {
        case 0: {condType = "count"; break;}
        case 1: {condType = "general"; break;}
        case 2: {condType = "course"; break;}
        case 3: {condType = "komp"; break;}
        case 4: {condType = "feedback"; break;}
        case 5: {condType = "or"; break;}
        default: {console.error("This definitely should not have happened. Something major seems to have went wrong!")}
      }
      for (let ii = 0; ii < this.state.ruleConditions[condType + "Conds"].length; ii++)
      {
        if (condType === "or") {
          for(let iii = 0; iii < 5; iii++) {
            let innerCondType = "";
            switch (iii) {
              case 0: {innerCondType = "count"; break;}
              case 1: {innerCondType = "general"; break;}
              case 2: {innerCondType = "course"; break;}
              case 3: {innerCondType = "komp"; break;}
              case 4: {innerCondType = "feedback"; break;}
              default: {console.error("This definitely should not have happened. Something major seems to have went wrong!")}
            }
            for (let iiii = 0; iiii < this.state.ruleConditions.orConds[ii][innerCondType + "Conds"].length; iiii++) {
              sthExists = true;
              if (this.state.ruleConditions.orConds[ii][innerCondType + "Conds"][iiii].conditionObject === "") {
                alert("Complete filling in the form!");
                return;
              }
            }
          }
        } else {
          sthExists = true;
          if (this.state.ruleConditions[condType + "Conds"][ii].conditionObject === "") {
            alert("Complete filling in the form!");
            return;
          }
        }
      }
    }
    if (this.state.ruleName === "" || !sthExists) {
      alert("Complete filling in the form!");
      return;
    }
    if (this.state.ruleImg === "") {
      alert("You are missing an image!");
      return;
    }

    // create drools file and export it
    let drool;
    /*var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "./src/rules.drl", false);
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          drool = rawFile.responseText;
        } else {
          drool = 'dialect  "mvel"\r\nimport model.Volunteer \r\n';
        }
      } else {
      }
    };
    rawFile.send(void);*/
    try {
      require(`${"./src/rules.drl"}`);
      fetch("./src/rules.drl")
        .then(r => r.text())
        .then(text => {
          drool = text;
        });
      alert(drool);
    } catch (err) {
      drool = 'dialect  "mvel"\r\nimport model.Volunteer \r\n';
    }

    drool +=
      'rule "' + this.state.ruleName + '" when volunteer: model.Volunteer(';
    for (let i = 0; i < this.state.ruleConditions.length; i++) {
      if (i !== 0) {
        drool += "&& ";
      }
      drool +=
        this.state.ruleConditions[i].conditionObject +
        " == " +
        this.state.ruleConditions[i].conditionCount;
    }
    drool += ') then System.out.println("' + this.state.ruleName + '"); end';

    const element = document.createElement("a");
    const file = new Blob([drool], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "rules.drl";
    document.body.appendChild(element);
    element.click();

    // just for displaying data

    /*let message = "New rule name: " + this.state.ruleName + "\n\n";
    for (let i = 0; i < this.state.ruleConditions.length; i++) {
      message +=
        " " +
        (i + 1).toString() +
        ".  " +
        this.state.ruleConditions[i].conditionCount +
        " " +
        this.state.ruleConditions[i].conditionObject +
        "\n";
    }
    alert(message);*/
  }


  //===============================================================================================================================
  // render App component
  render() {
    //console.log("=========================================\n=======================================\nstate before rendering:");
    //console.log(this.state);
    return (
      <div>
        <h1>
          iVolunteer Regel Editor Prototyp
        </h1>
        <img onClick={this.handleUndo} src={require("./imgs/undoDog.png")} alt="undo dog"/>
        <br />
        <small><i>copyright Nintendo SMM2</i></small>
        <hr />
        Regeltyp auswählen:
        <input type="radio" name="ruleType" value="kompetenz" checked={this.state.ruleType === "kompetenz"} onChange={this.handleChange} />Kompetenz
        <input type="radio" name="ruleType" value="milestone" checked={this.state.ruleType === "milestone"} onChange={this.handleChange} />Meilenstein
        <input type="radio" name="ruleType" value="badge" checked={this.state.ruleType === "badge"} onChange={this.handleChange} />Badge
        <hr />
        <div>
          <h2><span style={{color: "#ff0000"}}>Regel Name: </span></h2>
          <input 
            name="ruleName"
            type="text"
            placeholder="gib hier den Namen deiner Regel ein"
            style={{width: 250}}
            value={this.state.ruleName}
            onChange={this.handleChange}
          />
        </div>
        <hr />
        <Conditions
          existingData={this.state.existingData}
          onAdd={this.handleAddCondition}
          ruleConditions={this.state.ruleConditions}
          onConditionsChange={this.handleConditionsChange}
          onSingleRemove={this.handleRemoveCondition}
        />
        <hr />
        <div>
          <h2><span style={{color: "#009999"}}>Beschreibung: </span></h2>
          <textarea 
            name="ruleDescription"
            placeholder="gib hier eine Beschreibung ein (optional)"
            style={{resize: "none", height: 100, width: 300}}
            value={this.state.ruleDescription}
            onChange={this.handleChange}
          />
        </div>
        <hr />
        <div>
          <h2>
            <span style={{color: "#77aa00"}}>Badge Bild:</span>
          </h2>
          {this.state.ruleImg !== ""? <img style={{height: 100, width: 100, objectFit: "cover"}} src={this.state.ruleImg} alt="selected file " /> : null}
          <br />
          <input type="file" name="ruleImg" accept="image/jpg, image/jpeg, image/png" onChange={this.handleChange} />
        </div>
        <hr />
        <button onClick={this.createRule}>Regel erstellen</button>
        <hr />
        <img style={{height: 75, width: 88}} src={require("./imgs/iVolLogo.png")} alt="logo" />
      </div>
    );
  }
}

export default App;
