import * as React from 'react'
import TableBaseDisplay from './TableBaseDisplay'
import { Doughnut } from 'react-chartjs-2'

import './../../../style/index.css'

export default class TableDoughnutDisplay extends TableBaseDisplay {

  doughnutData = {}
/*
  doughnutData = {
    labels: ['Red', 'Green', 'Yellow'],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  }
*/
  public constructor(props) {
    super(props)
    const { columns, items } = props
    this.prepareDoughnutData(columns, items)
  }

  public render() {
    const { stripDisplay } = this.props
    return (
      <div className="overflowYOverlay" style={{ maxHeight: this.getHeigthStyle(stripDisplay), overflowY: 'auto' }}>
        <Doughnut
          data={this.doughnutData}
//          options={this.options}
        />
      </div>
    )
  }

  protected prepareDoughnutData(columns, items) {
    let labels: Array<any> = []
    let backgroundColor: Array<any> = []
    let hoverBackgroundColor: Array<any> = []
    for (let i = 0; i < items.length; i++) {
      labels.push(items[i][columns[0]['name']])
      let color = this.getRandomColor()
      backgroundColor.push(color)
      hoverBackgroundColor.push(color)
    }
    let data: Array<any> = []
      for (let i = 0; i < columns.length; i++) {
        let acc = 0
        for (let j = 0; j < items.length; j++) {
        let val = items[j][columns[i].fieldName]
        acc += parseInt(val)
      }
      data.push(acc)
    }
    let doughnutData = {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor
      }]
    }
    this.doughnutData = doughnutData
  }

}
