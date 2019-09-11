import * as React from 'react'
import TableBaseDisplay from './TableBaseDisplay'
import {Pie} from 'react-chartjs-2'

import './../../../style/index.css'

export default class TablePieDisplay extends TableBaseDisplay {
  pieData = {}

  public constructor(props) {
    super(props)
    const { columns, items } = props
    this.pieData = this.preparePieData(columns, items, this.pieData)
  }

  public render() {
    const { stripDisplay } = this.props
    return (
      <div className="overflowYOverlay" style={{ maxHeight: this.getHeigthStyle(stripDisplay), overflowY: 'auto' }}>
        <Pie
          data={this.pieData}
        />
      </div>
    )
  }

  protected preparePieData(columns, items, data) {
    let labels: Array<any> = []
    let backgroundColor: Array<any> = []
    let hoverBackgroundColor: Array<any> = []
    for (let i = 0; i < items.length; i++) {
      labels = labels.concat(items[i][columns[0]['name']])
      let color = this.getRandomColor()
      backgroundColor = backgroundColor.concat(color)
      hoverBackgroundColor = hoverBackgroundColor.concat(color)
    }
    data['labels'] = labels
    let datasets: Array<any> = []
    for (let i = 1; i < columns.length; i++) {
      let serieName = columns[i]['name']
      let dataset = {
        label: serieName,
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor
      }
      let data = []
      for (let j = 0; j < items.length; j++) {
        data = data.concat(items[j][serieName])
      }
      dataset['data'] = data
      datasets = datasets.concat(dataset)
    }
    data['datasets'] = datasets
    return data
  }

}
