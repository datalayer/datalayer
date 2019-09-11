import * as React from 'react'

export default class TableBaseDisplay extends React.Component<any, any> {

 options = {
  responsive: true,
//  maintainAspectRatio: true
  tooltips: {
    mode: 'label'
  },
  elements: {
    line: {
      fill: false
    }
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: {
          display: false
        },
        labels: {
          show: true
        }
      }
    ],
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
        gridLines: {
          display: false
        },
        labels: {
          show: true
        }
      }
     ]}
   }

  public constructor(props) {
    super(props)
  }

  protected getHeigthStyle(stripDisplay: boolean) {
    if (stripDisplay) return '80vh'
    return '100%'
  }

  protected prepareData(columns, items, data) {
    let labels = []
    for (let i = 0; i < items.length; i++) {
      labels = labels.concat(items[i][columns[0]['name']])
    }
    data['labels'] = labels
    let datasets: Array<any> = []
    for (let i = 1; i < columns.length; i++) {
      let serieName = columns[i]['name']
      let color = this.getRandomColor()
      let dataset = {
        label: serieName,
//        type:'line',
//        yAxisID: 'y-axis-1',
        fill: false,
        pointBorderColor: color,
        pointBackgroundColor: color,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: color,
        borderWidth: 1,
        borderColor: color,
        backgroundColor: color,
        hoverBackgroundColor: color,
        hoverBorderColor: color
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

  protected getRandomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
