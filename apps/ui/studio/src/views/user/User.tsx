import * as React from 'react'
import { connect } from 'react-redux'
import * as isEqual from 'lodash.isequal'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from '../../actions/ConfigActions'
import { Persona, PersonaPresence, PersonaSize, IPersonaProps } from 'office-ui-fabric-react/lib/Persona'
import { ActionButton } from 'office-ui-fabric-react/lib/Button'
import { DatalayerStore } from '../../store/DatalayerStore'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import Cards from '../cards/Cards'
import {
  SignalField,
  YouCheckedOutSignal,
  MalwareDetectedSignal,
  BlockedSignal,
  MissingMetadataSignal,
  WarningSignal,
  AwaitingApprovalSignal,
  TrendingSignal,
  SomeoneCheckedOutSignal,
  NewSignal,
  LiveEditSignal,
  MentionSignal,
  CommentsSignal,
  UnseenReplySignal,
  UnseenEditSignal,
  ReadOnlySignal,
  SharedSignal,
  EmailedSignal,
  RecordSignal
} from '@uifabric/experiments/lib/Signals'
import '../../styles/Styles.scss'

@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
export default class User extends React.Component<any, any> {
  state = {
    config: DatalayerStore.state().config
  }

  public constructor(props) {
    super(props)
  }

  public render() {
    return (
      <>
      <div style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: 20,
        }}>
        <div>
          <Persona 
            text="Foo Bar"
            size={PersonaSize.size72}
            presence={PersonaPresence.offline}
            secondaryText="Software Engineer"
            onRenderSecondaryText={this.onRenderSecondaryText}
            tertiaryText="In a meeting"
            styles={{
              primaryText: {
                fontSize: 'x-large',
                fontWeight: 'bold',
              }
            }}
            />
            <div style={{maxWidth: 300}}>
              Twenty-something years old software addict. Likes also sports, movies, books, music and friends.
            </div>
            <div style={{flexDirection: 'row', paddingTop: 20}}>
              <SignalField before={<NewSignal/>}>algo</SignalField>
              <SignalField before={<NewSignal/>} style={{paddingLeft: 10}}>eda</SignalField>
              <SignalField before={<NewSignal/>} style={{paddingLeft: 10}}>math</SignalField>
          </div>
        </div>
        <div>
          <div>
            <ActionButton
                iconProps={{ iconName: 'FollowUser' }}
                allowDisabledFocus={false}
                disabled={true}
              >
                Follow
            </ActionButton>
          </div>
          <div>
            <ActionButton
                iconProps={{ iconName: 'Message' }}
                allowDisabledFocus={false}
                disabled={true}
              >
                Message
            </ActionButton>
          </div>
        </div>
      </div>
      <Cards/>
      </>
    )
  }

  public componentWillReceiveProps(nextProps) {
    const { config } = nextProps
    if (config && ! isEqual(config, this.state.config)) {
      this.setState({config: config})
    }
  }

  private onRenderSecondaryText(props: IPersonaProps): JSX.Element {
    return (
      <div>
        <Icon iconName={'Suitcase'} className={'ms-JobIconExample'} />
        <span style={{paddingLeft: 10}}>{props.secondaryText}</span>
      </div>
    )
  }
  
}
