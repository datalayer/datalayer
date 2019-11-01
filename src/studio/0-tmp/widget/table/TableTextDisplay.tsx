import * as React from 'react'
import { DetailsList, DetailsListLayoutMode, ConstrainMode, Selection } from 'office-ui-fabric-react/lib/DetailsList'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import TableBaseDisplay from './TableBaseDisplay'
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection'
import './../../../style/index.css'

export default class TableTextDisplay extends TableBaseDisplay {
//  private detailsList: DetailsList
  private selection: Selection

  state = {
    columns: [],
    items: [],
    filteredItems: [],
    selectionDetails: ''
  }

  public constructor(props) {
    super(props)
    this.selection = new Selection({
      onSelectionChanged: () => this.setState({ 
        selectionDetails: this.getSelectionDetails() 
      })
    })
    let { columns, items } = props
    if (items) {
      this.state = {
        columns: columns,
        items: items,
        filteredItems: items,
        selectionDetails: this.getSelectionDetails()
      }
    }

  }

  public render() {
    const { stripDisplay } = this.props
    let { columns, items, filteredItems, selectionDetails } = this.state
    return (
      <div>
        <div>{ selectionDetails }</div>
        <TextField
//          label='Filter on first column:'
          placeholder='Filter on first column.'
//          onChanged={ text => this.setState({
//             filteredItems: text ? items.filter(i => i[this.state.columns[0]['name']].toLowerCase().indexOf(text) > -1) : items 
//           })}
        />
        <div className="overflowYOverlay" style={{maxHeight: this.getHeigthStyle(stripDisplay), overflowX: 'hidden', overflowY: 'auto', position: 'relative'}}>
{/*
          <MarqueeSelection selection={ this.selection }>
            <DetailsList
              columns={ columns }
              items={ filteredItems }
              layoutMode={ DetailsListLayoutMode.justified }
              selection={ this.selection }
              constrainMode={ ConstrainMode.horizontalConstrained }
              selectionPreservedOnEmptyClick={ true }
              ref={ ref => this.detailsList = ref }
              compact={ true }
              setKey='set'
              />
          </MarqueeSelection>
*/}
          </div>
      </div>
    )
  }

  private getSelectionDetails(): string {
    let selectionCount = this.selection.getSelectedCount()
    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this.selection.getSelection()[0] as any).name;
      default:
        return `${selectionCount} items selected`;
    }
  }

}
