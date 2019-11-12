import * as React from 'react'
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

export default class Loading extends React.Component<any, any> {

  public constructor(props) {
    super(props)
  }

  public render() {
    return (
      <div>
        <Spinner size={SpinnerSize.large} label="Loading..." />
      </div>
    )
  }

}
