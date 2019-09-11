import * as React from 'react'
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export default class DetailsList extends React.Component<any, any> {
  private items
  private selection
  private MicrosoftApi = window["MicrosoftApi"]

  public constructor(props) {
    super(props)
    // The items array for the DetailsList, and the selection for the MarqueeSelection.
    this.items = []
    this.selection = new Selection();
    this.selection.onSelectionChanged = () => this.setState({ 
      selectionDetails: this.getSelectionDetails() 
    })
    this.state = {
      items: this.items,
      selectionDetails: this.getSelectionDetails(),
      isLoadingCounter: false,
      nextPageToken: null
    }
    this.showError = this.showError.bind(this);
  }
  
  // Get the files for the details list data source.
  public componentWillMount() {
    this.MicrosoftApi.getFiles(null, (err, res) => {
      this.processItems(err, res);
    });
  }
  
  public render() {

    return (

      <div>
        <h3>Details List example</h3>
        <p>This example uses the <a href='https://graph.microsoft.io/en-us/docs/api-reference/v1.0/api/item_list_children' target='_blank'><i>/me/drive/root/children</i></a> endpoint,
         which returns the files and folders in the user's root drive. Results are paged when the number of drive items is greater than 100.</p> 
        <br />

        <Label>
          Current selection:
        </Label>
        <p><i>{ this.state.selectionDetails }</i></p>
        <br />
{/*
        <TextField
          label='Filter by name:'
          onChanged={ this.onFilterChanged.bind(this) } 
        />
*/}
        <MarqueeSelection selection={ this.selection }>
          <DetailsList
            items={ this.state.items }
            setKey='set'
            selection={ this.selection }
            onItemInvoked={ (item) => window.open(item.WebUrl) }
            onRenderItemColumn={ this.onRenderItemColumn.bind(this) }
            onRenderMissingItem={ () => this.onLoadNextPage() } />
          { 
            this.state.isLoadingCounter &&
              <div>
                <br />
                <Spinner className='loadingSpinner' label='Loading...' />                
                <br />
              </div>
          }
        </MarqueeSelection>
        <br />

        {
          this.state.error &&
            <MessageBar
              messageBarType={ this.state.error.type }>
              { this.state.error.text }
            </MessageBar> 
        }
      </div> 
    );
  }
  
  // Map file metadata to list items.
  private processItems(err, res) { 
      if (!err) {
        const files = res.value;
        let nextLink = null;          
        const items = files.map((f) => {
          return {
            Name: f.name,
            Type: (f.file) ? 'File' : 'Folder',
            CreatedBy: f.createdBy.user.displayName,
            Created: new Date(f.createdDateTime).toLocaleDateString(),
            LastModifiedBy: f.lastModifiedBy.user.displayName,
            LastModified: new Date(f.lastModifiedDateTime).toLocaleString(),
            WebUrl: f.webUrl
          }
        });
        // If the result set is paged, add a null item to trigger DetailsList.onRenderMissingItem.
        if (!!res['@odata.nextLink']) {
          nextLink = res['@odata.nextLink'];
          items.push(null);
        }
        this.items = this.items.filter((f) => { 
          return f !== null; 
        }).concat(items);
        this.setState({
          items: this.items,
          isLoadingCounter: !!nextLink,
          nextPageToken: nextLink
        });
      }
      else this.showError(err);
    }

  // Build the details list.
  private onRenderItemColumn(item, index, column) {
    if (column.key === 'WebUrl') {
      return <Link data-selection-invoke={ true }>{ item[column.key] }</Link>;
    }
    return item[column.key];
  }

  // Get data to display for the items selected in the details list.
  private getSelectionDetails() {
    let selectionCount = this.selection.getSelectedCount();
    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this.selection.getSelection()[0]).Name;
      default:
        return `${selectionCount} items selected`;
    }
  }

  // Handler for when text is entered into the details list.
  // This sample filters for case-insensitive, exact match, and simply clears th current selection.
  private onFilterChanged(filterText) {
    this.selection.setItems([], true);
    this.setState({ 
      items: filterText ? this.items.filter(i => i.Name.toLowerCase().indexOf(filterText.toLowerCase()) > -1) : this.items 
    });
  }

  // Get paged results.
  private onLoadNextPage(): any {
    const pageLink = this.state.nextPageToken;
    this.MicrosoftApi.getFiles(pageLink, (err, res) => {
      this.processItems(err, res);
    });
  }

  // Configure the error message.
  private showError(err) {
    this.setState({
      error: {
        type: MessageBarType.error,
        text: `Error ${err.statusCode}: ${err.code} - ${err.message}`
      }
    });
  }

}
