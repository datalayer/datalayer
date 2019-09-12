import * as React from 'react'
import { Button } from 'semantic-ui-react'
import * as sem from './../style/semantic-extend.less'
import * as style from './../style/style.less'

export default class ThemeExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <div className="header">header style with CSS extracted</div>
        <div className="container">container style with CSS extracted</div>
        <div className={ style.header }>header style CSS not-extracted (not configured to work).</div>
        <div className={ sem.container }>container style CSS not-extracted (not configured to work).</div>
        <Button primary>Custom Primary Button</Button>
      </div>
    )
  }
}
