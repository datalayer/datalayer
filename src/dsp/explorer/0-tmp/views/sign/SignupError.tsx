import * as React from 'react'
import { connect } from 'react-redux'
import { ActionButton } from 'office-ui-fabric-react/lib/Button'
import error from './error.svg'
import history from '../../history/History'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from '../../actions/ConfigActions'

@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
export default class SignupSuccess extends React.Component<any, any> {

  public constructor(props) {
    super(props)
  }

  public render() {
    return (
      <div className='ms-fadeIn500 dla-padding20'>
        <div className="ms-font-su">Error...</div>
        <ActionButton
          iconProps={{ 
            iconName: 'Home',
          }}
          disabled={false}
          checked={true}
          onClick={ e => { e.preventDefault(); history.push('/') }}
          >
          Home
        </ActionButton>
        <img src={ error } style={{width: 400}} />
      </div>
    )      
  }

}
