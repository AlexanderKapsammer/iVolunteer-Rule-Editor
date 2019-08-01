import React from "react";
import RuleName from "./formElements/RuleName";
import Conditions from "./formElements/Conditions";
import RequiredBadges from "./formElements/RequiredBadges";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ruleName: "",
      ruleConditions: [
        {
          conditionCount: 1,
          conditionObject: ""
        }
      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddCondition = this.handleAddCondition.bind(this);
    this.handleRemoveCondition = this.handleRemoveCondition.bind(this);
    this.handleConditionsChange = this.handleConditionsChange.bind(this);
    this.createRule = this.createRule.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState(() => {
      return { [name]: value };
    });
  }

  handleAddCondition() {
    let newRuleConditions = this.state.ruleConditions.slice();
    newRuleConditions.push({
      conditionCount: 1,
      conditionObject: ""
    });
    this.setState({ ruleConditions: newRuleConditions });
  }

  handleRemoveCondition(event) {
    const conditionindex = event.target.getAttribute("conditionindex");
    let newRuleConditions = this.state.ruleConditions.slice();
    newRuleConditions.splice(conditionindex, 1);
    this.setState({ ruleConditions: newRuleConditions });
    this.forceUpdate();
  }

  handleConditionsChange(event) {
    const { name, value } = event.target;
    const conditionindex = event.target.getAttribute("conditionindex");
    let newRuleConditions = this.state.ruleConditions.slice();
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
    this.setState({ ruleConditions: newRuleConditions });
  }

  createRule() {
    for (let i = 0; i < this.state.ruleConditions.length; i++) {
      if (
        this.state.ruleConditions[i].conditionObject === "" ||
        this.state.ruleName === ""
      ) {
        alert("Complete filling in the form!");
        return;
      }
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
        <h1>iVolunteer rule editor prototype</h1>
        <hr />
        <RuleName value={this.state.ruleName} onChange={this.handleChange} />
        <hr />
        <Conditions
          onAdd={this.handleAddCondition}
          ruleConditions={this.state.ruleConditions}
          onConditionsChange={this.handleConditionsChange}
          onSingleRemove={this.handleRemoveCondition}
        />
        <hr />
        <button onClick={this.createRule}>create rule</button>
      </div>
    );
  }
}

export default App;
