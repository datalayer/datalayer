import * as React from 'react'
import MicrosoftApi from './../api/microsoft/MicrosoftApi'
import { NormalPeoplePicker } from 'office-ui-fabric-react/lib/Pickers'
import { Persona, PersonaPresence, IPersonaProps } from 'office-ui-fabric-react/lib/Persona'
import { Button } from 'office-ui-fabric-react/lib/Button'
import { Label } from 'office-ui-fabric-react/lib/Label'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'

export default class PeoplePickerExample extends React.Component<any, any> {
  private peopleList: IPersonaProps[]
  private searchResults
  private MicrosoftApi: MicrosoftApi = window["MicrosoftApi"]

  public constructor(props) {
    super(props)
    // Set the initial state for the picker data source. The people list is populated in the onFilterChanged function.
    this.peopleList = []
    this.searchResults = []
    // Helper that uses the JavaScript SDK to communicate with Microsoft Graph.
    this.showError = this.showError.bind(this)
    this.state = {
      selectedPeople: [],
      isLoadingCounterPeople: true,
      isLoadingCounterPics: true
    }
  }

  // Renders the people picker using the NormalPeoplePicker template.
  public render() {

    return (

      <div>
        <h3>People Picker example</h3>
        <p>This example uses the preview <a href='https://graph.microsoft.io/en-us/docs/api-reference/beta/api/user_list_people' target='_blank'><i>/me/people</i></a> endpoint,
         which returns people who are relevant to the current user.</p>
        <p>Hint: <b><a onClick={ this.showPeopleResults.bind(this) }>Click here</a></b> to see all the people returned from <i>/me/people</i></p>
        <br />
        <Label>Start typing a name in the People Picker. If you don't see who you're looking for, click <b>Search</b>.</Label>

        <NormalPeoplePicker
          onResolveSuggestions={ this.onFilterChanged.bind(this) }
          pickerSuggestionsProps={ {
            suggestionsHeaderText: 'Suggested People',
            noResultsFoundText: 'No results found',
            searchForMoreText: 'Search',
            loadingText: 'Loading...'
//            isLoadingCounter: this.state.isLoadingCounterPics
           } }
//          getTextFromItem={ (persona) => persona.primaryText }
          onChange={ this.onSelectionChanged.bind(this) }
          onGetMoreResults={ this.onGetMoreResults.bind(this) }
          className='ms-PeoplePicker'
          key='normal-people-picker' />
        <br />

        <Button
          buttonType={ 0 }
          onClick={ this.sendMailToSelectedPeople.bind(this) }
          disabled={ (! (this.state.selectedPeople.length > 0)) }>
          Send mail
        </Button>

        <br />
        <br />
        
        {
          this.state.result &&
            <MessageBar
              messageBarType={ this.state.result.type }>
              { this.state.result.text }
            </MessageBar> 
        }
      </div>

    )

  }

  // Map user properties to persona properties.
  private mapUsersToPersonas(users, useMailProp) {
    return users.map((p) => { 
      // The email property is returned differently from the /users and /people endpoints. 
      let email = (useMailProp) ? p.mail : p.emailAddresses[0].address;
      let personaProps = {
        id: p.id,
        primaryText: p.displayName,
        secondaryText: email || p.userPrincipalName,
        presence: PersonaPresence.none,
        imageInitials: (!!p.givenName && !!p.surname) ? p.givenName.substring(0,1) + p.surname.substring(0,1) : p.displayName.substring(0,1),
        initialsColor: Math.floor(Math.random() * 15) + 0
      }
//      let persona = new Persona(personaProps);
//      return persona;
      return personaProps;
    })
  }

  // Gets the profile photo for each user.
  private getPics(personas) {    
    // Make suggestions available before retrieving profile pics.
    this.setState({
      isLoadingCounterPeople: false
    })    
    this.MicrosoftApi.getProfilePics(personas, (err) => {
      this.setState({
        isLoadingCounterPics: false
      })
    })
  }

  // Build and send the email to the selected people.
  private sendMailToSelectedPeople() {
    const recipients = this.state.selectedPeople.map((r) => {
      return {
        EmailAddress: {
          Address: r.secondaryText
        }
      }
    })
    this.MicrosoftApi.sendMail(
      recipients,
      'Email from the Microsoft Graph Sample with Office UI Fabric',
      `<p>Thanks for trying out Office UI Fabric!</p>
       <p>See what else you can do with <a href="http://dev.office.com/fabric#/components">
       Fabric React components</a>.</p>`, 
      (err, toRecipients) => {
        if (!err) {
          this.setState({
            result: {
              type: MessageBarType.success,
              text: `Mail sent to ${toRecipients.length} recipient(s).`
            }
          })
        }
        else {
          this.showError(err)
        }
    })
  }

  // Handler for when text is entered into the picker control. Populate the people list.
  private onFilterChanged(filterText, items) {

    if (this.peopleList) {
      return filterText ? this.peopleList.concat(this.searchResults)
//        .filter(item => item.primaryText.toLowerCase().indexOf(filterText.toLowerCase()) === 0)
        .filter(item => !this.listContainsPersona(item, items)) : [];
    }

    else {

      let promise = new Promise<IPersonaProps[]>( (resolve, reject) => this.MicrosoftApi.getPeople((err, people) => {
        if (!err) {
          this.peopleList = this.mapUsersToPersonas(people, false);
          this.getPics(this.peopleList);
          alert(this.peopleList[0].primaryText)
          resolve(this.peopleList);
       }
       else { this.showError(err); }
      }))
        .then(value => value.concat(this.searchResults)
//        .filter(item => item.primaryText.toLowerCase().indexOf(filterText.toLowerCase()) === 0)
        .filter(item => !this.listContainsPersona(item, items)));

    }

  }

  // Remove currently selected people from the suggestions list.
  private listContainsPersona(persona, items) {
    if (!items || !items.length || items.length === 0) {
      return false;
    }
    return items.filter(item => item.primaryText === persona.primaryText).length > 0;
  }

  // Handler for when the Search button is clicked. This sample returns the first 20 matches as suggestions.
  private onGetMoreResults(searchText) {
    this.setState({
      isLoadingCounterPeople: true,
      isLoadingCounterPics: true
    });
    return new Promise((resolve) => {
      this.MicrosoftApi.searchForPeople(searchText.toLowerCase(), (err, people) => {
        if (!err) {
          this.searchResults = this.mapUsersToPersonas(people, true);
          this.setState({
            isLoadingCounterPeople: false
          });          
          this.getPics(this.searchResults);
          resolve(this.searchResults);
        }
      });
    });
  }
  
  // Handler for when the selection changes in the picker control. This sample updates the list of selected people and clears any messages.
  private onSelectionChanged(items) {
    this.setState({
      result: null,
      selectedPeople: items
    })
  }

  // Show the results of the `/me/people` query. For sample purposes only.
  private showPeopleResults() {
    let message = 'Query loading. Please try again.';
    if (!this.state.isLoadingCounterPeople) {
      const people = this.peopleList.map((p) => {
        return `\n${p.primaryText}`
      })
      message = people.toString()
    }
  }

  // Configure the error message.
  private showError(err) {
    this.setState({
      result: {
        type: MessageBarType.error,
        text: `Error ${err.statusCode}: ${err.code} - ${err.message}`
      }
    })
  }

}
