import * as React from 'react'
import { ChasingDots, Circle, CubeGrid, DoubleBounce, FadingCircle, FoldingCube, Pulse, RotatingPlane, ThreeBounce, WanderingCubes, Wave } from 'better-react-spinkit'

export default class Spinner extends React.Component<any, any> {
  private spinners = []

  public constructor(props) {
    super(props)
    var spinnerSize = props.size
    this.spinners = [
      React.createElement(ChasingDots, {size: spinnerSize}),
      React.createElement(Circle, {size: spinnerSize}),
      React.createElement(CubeGrid, {size: spinnerSize}),
      React.createElement(DoubleBounce, {size: spinnerSize}),
      React.createElement(FadingCircle, {size: spinnerSize}),
      React.createElement(FoldingCube, {size: spinnerSize}),
      React.createElement(Pulse, {size: spinnerSize}),
      React.createElement(RotatingPlane, {size: spinnerSize}),
      React.createElement(Wave, {size: spinnerSize}),
      React.createElement(ChasingDots, {size: spinnerSize}),
      React.createElement(ThreeBounce, {size: spinnerSize}),
      React.createElement(WanderingCubes, {size: spinnerSize}),
    ]
  }

  public render() {
    return <div>{this.randomSpinner()}</div>
  }

  private randomSpinner() {
    return this.spinners[Math.floor(Math.random() * this.spinners.length)]
  }

}
