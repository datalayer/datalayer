import * as React from 'react'
import { connect } from 'react-redux'
import { css } from 'office-ui-fabric-react/lib/Utilities'
import history from './../../history/History'
import { mapStateToPropsAuth, mapDispatchToPropsAuth } from '../../actions/AuthActions'
import { DatalayerStore } from '../../store/DatalayerStore'
import { IConfig } from '../../api/config/ConfigApi'
import LibraryApi from '../../api/library/LibraryApi'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from '../../actions/ConfigActions'
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack'
import { Text } from 'office-ui-fabric-react/lib/Text'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox'
import { getId } from 'office-ui-fabric-react/lib/Utilities'
import { getTheme, FontWeights } from 'office-ui-fabric-react/lib/Styling'
import { TextField, ITextFieldProps } from 'office-ui-fabric-react/lib/TextField'
import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button'
import { Callout } from 'office-ui-fabric-react/lib/Callout'
import './../../styles/Styles.scss'

const stackTokens: IStackTokens = { childrenGap: 20 }

@connect(mapStateToPropsAuth, mapDispatchToPropsAuth)
@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
export default class SearchBoxDla extends React.Component<any, any> {
  private config: IConfig = DatalayerStore.state().config
  private readonly libraryApi: LibraryApi
  private descriptionId: string = getId('description')
  private iconButtonId: string = getId('iconButton')

  state = {
    isCalloutVisible: false,
    q: ''
  }

  public constructor(props) {
    super(props)
    if (props.q) {
      this.state.q = props.q
    }
  }

  public render() {
    const {q} = this.state
    return (
      <div className="ms-Grid" style={{width: '100%', paddingTop: 10}}>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm8 ms-md8 ms-lg8">
            <Stack tokens={stackTokens}>
              <SearchBox
//              label="Custom label rendering" 
//              onRenderLabel={this.onRenderLabel} 
//              description="Search papers in the library" 
//              onRenderDescription={this.onRenderDescription}
                value={q}
                onChanged={(q) => {
                  this.setState({q: q})
                }}
                onSearch={ (q) => { this.setState({q: q}); history.push('/search/' + q); } }
                underlined={false}
                disableAnimation={true}
                placeholder="Search free notebooks"
                styles = {{
//                  fieldGroup: { borderRadius: 2 },
                  root: { 
                    borderRadius: 4,
                    height: 50,
                  },
                }}
                />
            </Stack>
          </div>
          <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4" style={{paddingTop: 8}}>
{/*
            <a href="#" 
              className={ css("button", "primaryButton") }
              onClick={(e) => {
                e.preventDefault()
                if (this.props.onSearch) {
                  this.props.onSearch(q)
                }
                history.push('/search/' + q)
              }}>
              Search
            </a>
*/}
          </div>
        </div>
      </div>
    )
  }

  private onRenderDescription = (props: ITextFieldProps): JSX.Element => {
    const theme = getTheme()
    return (
      <>
        <Stack horizontal verticalAlign="center">
          <Text variant="xSmall" styles={{ root: { color: theme.palette.white, fontWeight: FontWeights.regular } }}>
            {props.description}
          </Text>
          <IconButton
            id={this.iconButtonId}
            iconProps={{ iconName: 'Info' }}
            title="Info"
            ariaLabel="Info"
            onClick={this.onIconClick}
            styles={{ root: { marginBottom: -3 } }}
          />
        </Stack>
        {this.state.isCalloutVisible && (
          <Callout
            target={'#' + this.iconButtonId}
            setInitialFocus={true}
            onDismiss={this.onDismiss}
            ariaDescribedBy={this.descriptionId}
            role="alertdialog"
          >
            <Stack tokens={stackTokens} horizontalAlign="start" maxWidth={500} styles={{ root: { padding: 20 } }}>
              <span id={this.descriptionId} style={{paddingBottom: 20}}>
                Datalayer allows you to analyse datasets in teams. You run Python code directly in a JupyterLab notebook on the Datalayer website with zero-setup. You integrate with your Twitter account and publish data notebooks.                
              </span>
              <span style={{fontFamily: "Courier New, Courier, monospace", fontWeight: 'normal', paddingBottom: 20}}>
                |deɪtə leɪə|<br/>
                1. The entrypoint to extract knowledge from datasets.<br/>
                2. An open and collaborative platform to create data papers and turn them into stories on social media.<br/>
              </span>
              <DefaultButton onClick={this.onDismiss}>Got it!</DefaultButton>
            </Stack>
          </Callout>
        )}
      </>
    )
  }

  private onRenderLabel = (props: ITextFieldProps): JSX.Element => {
    return (
      <>
        <Stack horizontal verticalAlign="center">
          <span>{props.label}</span>
          <IconButton
            id={this.iconButtonId}
            iconProps={{ iconName: 'Info' }}
            title="Info"
            ariaLabel="Info"
            onClick={this.onIconClick}
            styles={{ root: { marginBottom: -3 } }}
          />
        </Stack>
        {this.state.isCalloutVisible && (
          <Callout
            target={'#' + this.iconButtonId}
            setInitialFocus={true}
            onDismiss={this.onDismiss}
            ariaDescribedBy={this.descriptionId}
            role="alertdialog"
          >
            <Stack tokens={stackTokens} horizontalAlign="start" maxWidth={300} styles={{ root: { padding: 20 } }}>
              <span id={this.descriptionId}>The custom label includes an IconButton that displays this Callout on click.</span>
              <DefaultButton onClick={this.onDismiss}>Close</DefaultButton>
            </Stack>
          </Callout>
        )}
      </>
    )
  }

  private onIconClick = (): void => {
    this.setState({ isCalloutVisible: !this.state.isCalloutVisible })
  }

  private onDismiss = (): void => {
    this.setState({ isCalloutVisible: false })
  }

}
