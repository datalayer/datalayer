import * as React from 'react'
import TableBaseDisplay from './TableBaseDisplay'

import './../../../style/index.css'

/*
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis'
import 'react-vis/dist/style.css'
import {ForceGraph, ForceGraphNode, ForceGraphLink} from 'react-vis-force'

export default class GraphDisplay extends React.Component<any, any> {

//    "react-vis": "2.0.0-beta.4",
//    "react-vis-force": "0.1.4",
    

 render() {
    return (

      <div>

      <XYPlot
        width={300}
        height={300}>
        <HorizontalGridLines />
        <LineSeries
          data={[
            {x: 1, y: 10},
            {x: 2, y: 5},
            {x: 3, y: 15}
          ]}/>
        <XAxis />
        <YAxis />
      </XYPlot>

      <ForceGraph simulationOptions={{ height: 300, width: 300 }}>
        <ForceGraphNode node={{ id: 'first-node' }} fill="red" />
        <ForceGraphNode node={{ id: 'second-node' }} fill="blue" />
        <ForceGraphLink link={{ source: 'first-node', target: 'second-node' }} />
      </ForceGraph>

    </div>

    )

  }

}
*/

import {Bar} from 'react-chartjs-2'

//     "react-chartjs-2": "2.1.0",
//    "chart.js": "2.5.0",

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

export default class TableUberGraphDisplay extends TableBaseDisplay {
  displayName: 'BarExample'

  public render() {
    const { stripDisplay } = this.props
    return (
      <div className="overflowYOverlay" style={{ maxHeight: this.getHeigthStyle(stripDisplay), overflowY: 'auto' }}>
        <h2>Bar Example (custom size)</h2>
        <Bar
          data={data}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: true
          }}
        />
      </div>
    )
  }

}
