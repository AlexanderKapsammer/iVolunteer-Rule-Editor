import React from "react";
import RuleName from "./formElements/RuleName";
import Conditions from "./formElements/Conditions";
import serverData from "./testData/database.json"



  // TODO:
  
  // create OR condition




class App extends React.Component {
  constructor() {
    super();
    this.state = {
      existingData: {},

      ruleType: "kompetenz",
      ruleName: "",
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
    this.handleAddCondition = this.handleAddCondition.bind(this);
    this.handleRemoveCondition = this.handleRemoveCondition.bind(this);
    this.handleConditionsChange = this.handleConditionsChange.bind(this);
    this.createRule = this.createRule.bind(this);
  }

  componentWillMount()
  {
    this.setState({existingData: serverData});
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState(() => {
      return { [name]: value };
    });
  }

  handleAddCondition(event) {
    const condType = event.target.getAttribute("req_cond_type");
    let newRuleConditions = this.state.ruleConditions[condType + "Conds"].slice();
    newRuleConditions.push({
      conditionCount: condType === "count" || condType === "feedback"? 1 : -1,
      conditionObject: ""
    });

    const newState = {
      ruleConditions: {
        ...this.state.ruleConditions,
        [condType + "Conds"]: newRuleConditions
      }
    }
    this.setState(newState);
  }

  handleRemoveCondition(event) {
    const condType = event.target.getAttribute("conditiontype");
    const conditionindex = event.target.getAttribute("conditionindex");
    let newRuleConditions = this.state.ruleConditions[condType + "Conds"].slice();
    newRuleConditions.splice(conditionindex, 1);

    const newState = {
      ruleConditions: {
        ...this.state.ruleConditions,
        [condType + "Conds"]: newRuleConditions
      }
    }
    this.setState(newState);
  }

  handleConditionsChange(event) {
    const { name, value } = event.target;
    const condType = event.target.getAttribute("conditiontype");
    const conditionindex = event.target.getAttribute("conditionindex");
    let newRuleConditions = this.state.ruleConditions[condType + "Conds"].slice()
    if (condType === "count" || condType === "feedback") {
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
    const newState = {
      ruleConditions: {
        ...this.state.ruleConditions,
        [condType + "Conds"]: newRuleConditions
      }
    }
    this.setState(newState);
  }

  createRule() {

    // check if form is completed
      let sthExists = false;
    for (let i = 0; i < 5; i++) {
      let condType = "";

      // select type
      switch (i) {
        case 0: {condType = "count"; break;}
        case 1: {condType = "general"; break;}
        case 2: {condType = "course"; break;}
        case 3: {condType = "komp"; break;}
        case 4: {condType = "feedback"; break;}
        default: {console.error("This definitely should not have happened. Something major seems to have went wrong!")}
      }
      for (let ii = 0; ii < this.state.ruleConditions[condType + "Conds"].length; ii++)
      {
        sthExists = true;
        if (this.state.ruleConditions[condType + "Conds"][ii].conditionObject === "") {
          alert("Complete filling in the form!");
          return;
        }
      }
    }
    if (this.state.ruleName === "" || !sthExists) {
      alert("Complete filling in the form!");
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

  render() {
    return (
      <div>
        <h1>iVolunteer Regel Editor Prototyp</h1>
        <hr />
        Regeltyp auswählen:
        <input type="radio" name="ruleType" value="kompetenz" checked={this.state.ruleType === "kompetenz"} onChange={this.handleChange} />Kompenenz
        <input type="radio" name="ruleType" value="badge" checked={this.state.ruleType === "badge"} onChange={this.handleChange} />Badge
        <hr />  
        <RuleName value={this.state.ruleName} onChange={this.handleChange} />
        <hr />
        <Conditions
          existingData={this.state.existingData}
          onAdd={this.handleAddCondition}
          ruleConditions={this.state.ruleConditions}
          onConditionsChange={this.handleConditionsChange}
          onSingleRemove={this.handleRemoveCondition}
        />
        <hr />
        <button onClick={this.createRule}>Regel erstellen</button>
      </div>
    );
  }
}

export default App;
