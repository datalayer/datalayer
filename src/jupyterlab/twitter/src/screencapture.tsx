import React from 'react'
import html2canvas from 'html2canvas'
export default class ScreenCapture extends React.Component<any, any> {

  static defaultProps = {
    onStartCapture: () => null,
    onEndCapture: () => null
  }

  state = {
    on: false,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    crossHairsLeft: 0,
    crossHairsTop: 0,
    isMouseDown: false,
    windowWidth: 0,
    windowHeight: 0,
    borderWidth: '0px',
    cropPositionTop: 0,
    cropPositionLeft: 0,
    cropWidth: 0,
    cropHeigth: 0
  }

  public constructor(props) {
    super(props)
    this.handleWindowResize = this.handleWindowResize.bind(this)
    this.handleStartCapture = this.handleStartCapture.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleClickTakeScreenShot = this.handleClickTakeScreenShot.bind(this)
  }

  public render() {
    const { on, crossHairsLeft, crossHairsTop, borderWidth, isMouseDown } = this.state
    if (!on) return this.renderChild()
    return (
      <div
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
      >
        {this.renderChild()}
        <div
          className={`overlay ${isMouseDown && 'highlighting'}`}
          style={{ borderWidth }}
        />
        <div
          className="crosshairs"
          style={{ left: (crossHairsLeft - 30) + 'px', top: (crossHairsTop - 215) + 'px' }}
        />
      </div>
    )
  }

  private renderChild() {
    const { children } = this.props
    if (typeof children === 'function') {
      const props = {
        onStartCapture: this.handleStartCapture
      }
      return children(props)
    }
    return children
  }

  public componentDidMount() {
    this.handleWindowResize()
    window.addEventListener('resize', this.handleWindowResize)
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  private handleWindowResize() {
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.setState({
      windowWidth,
      windowHeight
    })
  }

  private handleStartCapture(){
    this.setState({ on: true })
  } 

  private handleMouseDown(e) {
    const startX = e.clientX
    const startY = e.clientY
    this.setState((prevState) => ({
      startX,
      startY,
      cropPositionLeft: startX,
      cropPositionTop: startY,
      isMouseDown: true,
      borderWidth: `${prevState.windowWidth}px ${prevState.windowHeight}px`
    }))
  }

  private handleMouseMove(e) {
    const { isMouseDown, windowWidth, windowHeight, startX, startY, borderWidth } = this.state
    let cropPositionTop = startY
    let cropPositionLeft = startX
    const endX = e.clientX
    const endY = e.clientY
    const isStartTop = endY >= startY
    const isStartBottom = endY <= startY
    const isStartLeft = endX >= startX
    const isStartRight = endX <= startX
    const isStartTopLeft = isStartTop && isStartLeft
    const isStartTopRight = isStartTop && isStartRight
    const isStartBottomLeft = isStartBottom && isStartLeft
    const isStartBottomRight = isStartBottom && isStartRight
    let newBorderWidth = String(borderWidth)
    let cropWidth = 0
    let cropHeigth = 0
    if (isMouseDown) {
      if (isStartTopLeft) {
        newBorderWidth = `${startY}px ${windowWidth - endX}px ${windowHeight - endY}px ${startX}px`
        cropWidth = endX - startX
        cropHeigth = endY - startY
      }
      if (isStartTopRight) {
        newBorderWidth = `${startY}px ${windowWidth - startX}px ${windowHeight - endY}px ${endX}px`
        cropWidth = startX - endX
        cropHeigth = endY - startY
        cropPositionLeft = endX
      }
      if (isStartBottomLeft) {
        newBorderWidth = `${endY}px ${windowWidth - endX}px ${windowHeight - startY}px ${startX}px`
        cropWidth = endX - startX
        cropHeigth = startY - endY
        cropPositionTop = endY
      }
      if (isStartBottomRight) {
        newBorderWidth = `${endY}px ${windowWidth - startX}px ${windowHeight - startY}px ${endX}px`
        cropWidth = startX - endX
        cropHeigth = startY - endY
        cropPositionLeft = endX
        cropPositionTop = endY
      }
    }
    this.setState({
      crossHairsLeft: e.clientX,
      crossHairsTop: e.clientY,
      borderWidth: newBorderWidth,
      cropWidth,
      cropHeigth,
      cropPositionTop: cropPositionTop,
      cropPositionLeft: cropPositionLeft
    })
  }

  private handleMouseUp(e) {
    this.handleClickTakeScreenShot()
    this.setState({
      on: false,
      isMouseDown: false,
      borderWidth: '0px'
    })
  }

  private handleClickTakeScreenShot() {
    let { windowWidth, windowHeight, cropPositionLeft, cropPositionTop, cropWidth, cropHeigth } = this.state
    const shot = document.querySelector('.jp-LabShell')
    let scale = window.devicePixelRatio
//    let scale = 1
    html2canvas(shot, {
      width: windowWidth,
      height: windowHeight,
      scale: scale
    }).then(canvas => {
      let croppedCanvas = document.createElement('canvas')
      croppedCanvas.width = cropWidth * scale
      croppedCanvas.height = cropHeigth * scale
      let croppedCanvasContext = croppedCanvas.getContext('2d')
      croppedCanvasContext.drawImage(
        canvas, 
        cropPositionLeft * scale, 
        cropPositionTop * scale, 
        cropWidth * scale,
        cropHeigth * scale, 
        0, 
        0, 
        cropWidth * scale,
        cropHeigth * scale
        )
      this.props.onEndCapture(croppedCanvas.toDataURL(), cropWidth * scale, cropHeigth * scale)
    })
  }

}
