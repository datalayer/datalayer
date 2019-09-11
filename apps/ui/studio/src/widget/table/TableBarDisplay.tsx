import * as React from 'react'
import TableBaseDisplay from './TableBaseDisplay'
import {Bar} from 'react-chartjs-2';
import './../../../style/index.css'

export default class TableBarDisplay extends TableBaseDisplay {
  barData = {}

  constructor(props) {
    super(props)
    const { columns, items } = props
    this.barData = this.prepareData(columns, items, this.barData)
  }

  render() {
    const { stripDisplay } = this.props
    return (
      <div className="overflowYOverlay" style={{ maxHeight: this.getHeigthStyle(stripDisplay), overflowY: 'auto' }}>
        <Bar
          data={this.barData}
//          options={this.options}
        />
      </div>
    )
  }

}
