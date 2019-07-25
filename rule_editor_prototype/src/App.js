import React from "react";
import RuleName from "./formElements/RuleName";
import Conditions from "./formElements/Conditions";

class App extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            ruleName: "",
            ruleConditions: [
                {
                    conditionType: "required",
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

    handleChange(event)
    {
        const{name, value} = event.target;
        this.setState(() => { return( {[name]: value} ); });
    }
    handleAddCondition()
    {
        let newRuleConditions = this.state.ruleConditions.slice();
        newRuleConditions.push( {
            conditionType: "required",
            conditionCount: 1,
            conditionObject: ""
        } );
        this.setState({ruleConditions: newRuleConditions})
    }
    handleRemoveCondition(event)
    {
        const conditionindex = event.target.getAttribute("conditionindex");
        let newRuleConditions = this.state.ruleConditions.slice();
        newRuleConditions.splice(conditionindex, 1);
        this.setState({ruleConditions: newRuleConditions});
        this.forceUpdate();
    }
    handleConditionsChange(event)
    {
        const{name, value} = event.target;
        const conditionindex = event.target.getAttribute("conditionindex");
        let newRuleConditions = this.state.ruleConditions.slice();
        if(name === "conditionCount" && value < 1)
        {
            alert("The count must be at least 1!");
            newRuleConditions[conditionindex] = {
                ...newRuleConditions[conditionindex],
                conditionCount: 1
            }
        }
        else
        {
            newRuleConditions[conditionindex] = {
                ...newRuleConditions[conditionindex],
                [name]: value
            }
        }
        this.setState({ruleConditions: newRuleConditions});
    }

    createRule()
    {
        for(let i = 0; i < this.state.ruleConditions.length; i++)
        {
            if(this.state.ruleConditions[i].conditionType === "" || this.state.ruleConditions[i].conditionObject === "" || this.state.ruleName === "")
            {
                alert("Complete filling in the form!");
                return;
            }
        }

        // create drools file and export it
        // all the right data (even if it doesn't show correctly in the app)
        // sits in this.state!

        // just for displaying data
        let message = "New rule name: " + this.state.ruleName + "\n\n";
        for(let i = 0; i < this.state.ruleConditions.length; i++)
        {
            message += " " + (i + 1).toString() + ".  " + this.state.ruleConditions[i].conditionType + ":   " + this.state.ruleConditions[i].conditionCount + " " + this.state.ruleConditions[i].conditionObject + "\n";
        }
        alert(message);
    }

    render()
    {
        return(
            <div>
                <h1>Ivolunteer rule editor prototype</h1>
                <hr />
                <RuleName value={this.state.ruleName} onChange={this.handleChange}/>
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