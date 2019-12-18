import * as React from 'react'
import TableBaseDisplay from './TableBaseDisplay'
import { Scatter } from 'react-chartjs-2'

import './../../../style/index.css'

export default class TableScatterDisplay extends TableBaseDisplay {

  scatterData = {}

  public constructor(props) {
    super(props)
    const { columns, items } = props
    this.prepareDataset(columns, items)
  }

  public render() {
    const { stripDisplay } = this.props
    return (
      <div className="overflowYOverlay" style={{ maxHeight: this.getHeigthStyle(stripDisplay), overflowY: 'auto' }}>
        <Scatter
          data={this.scatterData}
//          options={this.options}
        />
      </div>
    )
  }

  private prepareDataset(columns, items) {
    let data = [
      { x: 65, y: 75 },
      { x: 59, y: 49 },
      { x: 80, y: 90 },
      { x: 81, y: 29 },
      { x: 56, y: 36 },
      { x: 55, y: 25 },
      { x: 40, y: 18 },
    ]
    this.scatterData = {
      labels: ['Scatter'],
      showLines: false,
      datasets: [
        {
          label: '',
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data
        }
      ]  
    }
  }

}
