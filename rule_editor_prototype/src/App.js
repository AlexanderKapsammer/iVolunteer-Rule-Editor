import React from "react";
import RuleName from "./formElements/RuleName";
import Conditions from "./formElements/Conditions";
import RequiredBadges from "./formElements/RequiredBadges";

class App extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            existingBadges: [],
            ruleName: "",
            ruleConditions: [
                {
                    conditionType: "required",
                    conditionCount: 1,
                    conditionObject: ""
                }
            ],
            ruleRequiredBadges: [
                {
                    requiredType: "required",
                    requiredObject: ""
                }
            ]
        };

        // binding this. for this.setState() to work in those functions
        this.handleChange = this.handleChange.bind(this);
        this.handleAddCondition = this.handleAddCondition.bind(this);
        this.handleRemoveCondition = this.handleRemoveCondition.bind(this);
        this.handleConditionsChange = this.handleConditionsChange.bind(this);
        this.handleAddBadge = this.handleAddBadge.bind(this);
        this.handleRemoveBadge = this.handleRemoveBadge.bind(this);
        this.handleBadgesChange = this.handleBadgesChange.bind(this);
        this.createRule = this.createRule.bind(this);
    }
    componentDidMount()
    {
        // get the data (e.g. existing badge names) from the server

        // filling existingBadges with demo data
        const newExistingBadges=[
            "Rettungssanitäter",
            "Rettungsfahrzeuglenker",
            "Feuerwehrgruppenkommandant",
            "much more stuff"
        ]
        this.setState({existingBadges: newExistingBadges});
    }

    // ==============================================================

    // handle events in conditon lines
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

    // ===============================================================

    // handle events in badge lines
    // very similar to condition lines
    handleAddBadge()
    {
        let newRuleRequiredBadges = this.state.ruleRequiredBadges.slice();
        newRuleRequiredBadges.push({
            requiredType: "required",
            requiredObject: ""
        });
        this.setState({ruleRequiredBadges: newRuleRequiredBadges});
    }
    handleRemoveBadge(event)
    {
        console.log("got till here!");
        
        const badgeindex = event.target.getAttribute("badgeindex");
        let newRuleRequiredBadges = this.state.ruleRequiredBadges.slice();
        newRuleRequiredBadges.splice(badgeindex, 1);
        this.setState({ruleRequiredBadges: newRuleRequiredBadges});
    }
    handleBadgesChange(event)
    {
        const{name, value} = event.target;
        const badgeindex = event.target.getAttribute("badgeindex");
        let newRuleRequiredBadges = this.state.ruleRequiredBadges.slice();
        newRuleRequiredBadges[badgeindex] = {
            ...newRuleRequiredBadges[badgeindex],
            [name]: value
        }
        this.setState({ruleRequiredBadges: newRuleRequiredBadges});
    }

    // ===============================================================

    // handle events in App
    handleChange(event)
    {
        const{name, value} = event.target;
        this.setState(() => { return( {[name]: value} ); });
    }
    createRule()
    {
        if(!(this.state.ruleConditions.length > 0 || this.state.ruleRequiredBadges.length > 0) || this.state.ruleName == "")
        {
            alert("Complete filling in the form!");
            return;                
        }
        for(let i = 0; i < this.state.ruleConditions.length; i++)
        {
            if(this.state.ruleConditions[i].conditionObject === "")
            {
                alert("Complete filling in the form!");
                return;
            }
        }
        for(let i = 0; i < this.state.ruleRequiredBadges.length; i++)
        {
            if(this.state.ruleRequiredBadges[i].requiredObject === "")
            {
                alert("Complete filling in the form!");
                return;
            }
        }

        // check if chosen rule name already exists, if so,
        // reject request and send alert
        // create drools file and export it
        // all the right data sits in this.state!

        // just for displaying data
        let message = "New rule name: " + this.state.ruleName + "\n\nAchievement(s):\n";
        for(let i = 0; i < this.state.ruleConditions.length; i++)
        {
            message += " " + 
            (i + 1).toString() + ".  " + 
            this.state.ruleConditions[i].conditionType + ":   " + 
            this.state.ruleConditions[i].conditionCount + " " + 
            this.state.ruleConditions[i].conditionObject + "\n";
        }
        message += "\nBadge(s):\n";
        for(let i = 0; i < this.state.ruleRequiredBadges.length; i++)
        {
            message += " " + 
            (i + 1).toString() + ".  " + 
            this.state.ruleRequiredBadges[i].requiredType + ":   " + 
            this.state.ruleRequiredBadges[i].requiredObject + "\n";
        }
        alert(message);
    }

    // ======================================================================

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
                <RequiredBadges 
                    onAdd={this.handleAddBadge}
                    ruleRequiredBadges={this.state.ruleRequiredBadges}
                    existingBadges={this.state.existingBadges}
                    onBadgesChange={this.handleBadgesChange}
                    onSingleRemove={this.handleRemoveBadge}
                />
                <hr />
                <button onClick={this.createRule}>create rule</button>
            </div>
        );
    }
}

export default App;