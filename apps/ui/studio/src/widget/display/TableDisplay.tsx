import * as React from 'react'
import { connect } from 'react-redux'
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar'
import TableData from './../../util/data/TableData'
import TableTextDisplay from './../table/TableTextDisplay'
import TableLineDisplay from './../table/TableLineDisplay'
import TablePieDisplay from './../table/TablePieDisplay'
import TableBarDisplay from './../table/TableBarDisplay'
import TableBarHorizontalDisplay from './../table/TableBarHorizontalDisplay'
import TableBubbleDisplay from './../table/TableBubbleDisplay'
import TableDoughnutDisplay from './../table/TableDoughnutDisplay'
import TableScatterDisplay from './../table/TableScatterDisplay'
import { downloadCSV } from './../../util/data/DataUtil'

import './../../../style/index.css'

export default class TableDisplay extends React.Component<any, any> {
//  private readonly zeppelinApi: ZeppelinApi

  private leftItems = [
    {
      key: 'Table',
      title: 'Table Display',
      name: '',
      icon: 'Table',
      onClick: (e) => this.updateFormat(e, 'text')
    },
    {
      key: 'Line',
      title: 'Line Display',
      name: '',
      icon: 'Chart',
      onClick: (e) => this.updateFormat(e, 'line')
    },
    {
      key: 'Bar',
      title: 'Bar Display',
      name: '',
      icon: 'BarChart4',
      onClick: (e) => this.updateFormat(e, 'barchart')
    },
    {
      key: 'BarHorizontal',
      title: 'BarHorizontal Display',
      name: '',
      icon: 'BarChartHorizontal',
      onClick: (e) => this.updateFormat(e, 'barchart-horizontal')
    },
    {
      key: 'Pie',
      title: 'Pie Display',
      name: '',
      icon: 'PieDouble',
      onClick: (e) => this.updateFormat(e, 'pie')
    },
    {
      key: 'Doughnut',
      title: 'Doughnut Display',
      name: '',
      icon: 'DonutChart',
      onClick: (e) => this.updateFormat(e, 'doughnut')
    },
/*
    {
      key: 'Scatter',
      title: 'Scatter Display',
      name: '',
      icon: 'Dialpad',
      onClick: (e) => this.updateFormat(e, 'scatter')
    },
*/
    {
      key: 'Bubble',
      title: 'Bubble Display',
      name: '',
      icon: 'ProgressRingDots',
      onClick: (e) => this.updateFormat(e, 'bubble')
    },
    {
      key: 'download',
      title: 'Download as CSV',
      name: '',
      icon: 'Download',
      onClick: (e) => this.downloadCSV(e)
    }
  ]

  private rightItems: any[] = [{}]

  constructor(props) {
    super(props)
    let format = 'text'
    if (props.p.config && props.p.config.results) {
      if (props.p.config.results[0]) {
        if (props.p.config.results[0].graph) {
          let f = props.p.config.results[0].graph.mode
          if (f) {
            format = f
          }
        }
      }
    }
    let tableData = new TableData()
    tableData.loadParagraphDisplay({
      type: "TABLE",
      msg: this.props.data
    })
    let columnsData = tableData.columns
    let columnNamesData = tableData.columnNames
    let columns = columnNamesData.map( c => {
      return {
        key: c,
        name: c,
        fieldName: c,
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
        isCollapsable: true
      }
    })
    let rowData: any[] = tableData.rows
    let items = []
    for (let i = 0; i < rowData.length; i++) {
      let row = rowData[i]
      let item = {}
      for (let j = 0; j < columnNamesData.length; j++) {
        item[columnNamesData[j]] = row[j]
      }
//      items.push(item)
    }
    this.state = {
      id: props.id,
      p: props.p,
      data: props.data,
      columns: columns,
      items: items,
      columnsData: columnsData,
      showGraphBar: props.showGraphBar,
      format: format,
      stripDisplay: props.stripDisplay
    }
//    this.zeppelinApi = window["ZeppelinApi"]
  }

  public render() {
    let { format, showGraphBar, stripDisplay } = this.state
    return (
      <div>
        <div>
          {
            (showGraphBar == true) && 
            <CommandBar
              items={ this.leftItems }
              farItems={ this.rightItems }
//              ref="table-renderer-command-bar"
              className="commandBarBackgroundTransparentMarginLeftMinus30"
            />
          }
          {
            (format == 'text') && <TableTextDisplay columns={this.state.columns} items={this.state.items} stripDisplay={stripDisplay} />
          }
          {
            (format == 'line') && <TableLineDisplay columns={this.state.columns} items={this.state.items} stripDisplay={stripDisplay} />
          }
          {
            (format == 'barchart') && <TableBarDisplay columns={this.state.columns} items={this.state.items} stripDisplay={stripDisplay} />
          }
          {
            (format == 'barchart-horizontal') && <TableBarHorizontalDisplay columns={this.state.columns} items={this.state.items} stripDisplay={stripDisplay} />
          }
          {
            (format == 'pie') && <TablePieDisplay columns={this.state.columns} items={this.state.items} stripDisplay={stripDisplay} />
          }
          {
            (format == 'doughnut') && <TableDoughnutDisplay columns={this.state.columns} items={this.state.items} stripDisplay={stripDisplay} />
          }
          {
            (format == 'scatter') && <TableScatterDisplay columns={this.state.columns} items={this.state.items} stripDisplay={stripDisplay} />
          }
          {
            (format == 'bubble') && <TableBubbleDisplay columns={this.state.columns} items={this.state.items} stripDisplay={stripDisplay} />
          }
        </div>
      </div>
    )
  }

  private updateFormat(e: MouseEvent, format) {
    e.stopPropagation()
    e.preventDefault()
    this.setState({
      format: format
    })
//    this.zeppelinApi.commitParagraphWithGraph(this.state.p, this.graph(format))
  }

  private downloadCSV(e: MouseEvent) {
    e.preventDefault()
    downloadCSV({
      filename: "data_" + new Date().toISOString().replace(" ", "_") + ".csv",
      items: this.state.items
    })
  }

  private graph(format: string) {
    return {
      'mode': format,
      'height': 300,
      'optionOpen': false,
      'setting': {
          'table': {
              'tableGridState': {},
              'tableColumnTypeState': {
                  'names': {
                      'name': 'string',
                      'weights': 'string'
                  },
                  'updated': false
              },
              'tableOptionSpecHash': '[{\'name\':\'useFilter\',\'valueType\':\'boolean\',\'defaultValue\':false,\'widget\':\'checkbox\',\'description\':\'Enable filter for columns\'},{\'name\':\'showPagination\',\'valueType\':\'boolean\',\'defaultValue\':false,\'widget\':\'checkbox\',\'description\':\'Enable pagination for better navigation\'},{\'name\':\'showAggregationFooter\',\'valueType\':\'boolean\',\'defaultValue\':false,\'widget\':\'checkbox\',\'description\':\'Enable a footer for displaying aggregated values\'}]',
              'tableOptionValue': {
                  'useFilter': false,
                  'showPagination': false,
                  'showAggregationFooter': false
              },
              'updated': false,
              'initialized': false
          },
          'multiBarChart': {
              'rotate': {
                  'degree': '-45'
              },
              'xLabelStatus': 'default'
          },
          'stackedAreaChart': {
              'rotate': {
                  'degree': '-45'
              },
              'xLabelStatus': 'default'
          },
          'lineChart': {
              'rotate': {
                  'degree': '-45'
              },
              'xLabelStatus': 'default'
          }
      },
      'commonSetting': {},
      'keys': [
          {
              'name': 'name',
              'index': 0,
              'aggr': 'sum'
          }
      ],
      'groups': [],
      'values': [
          {
              'name': 'weights',
              'index': 1,
              'aggr': 'sum'
          }
      ]
    }
  }

}
