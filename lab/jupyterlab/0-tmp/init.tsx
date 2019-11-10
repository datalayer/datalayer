import * as React from '../../node_modules/@types/react';
import ReduxToastr from '../../node_modules/react-redux-toastr/lib'
import { Provider } from '../../node_modules/react-redux/lib'
import { ConnectedRouter } from './node_modules/react-router-redux'
import routerHistory from './node_modules/@datalayer/datalayer/lib/history/History'
import { DatalayerStore } from './node_modules/@datalayer/datalayer/lib/store/DatalayerStore'
import ConfigApi from './node_modules/@datalayer/datalayer/lib/api/config/ConfigApi'
import GoogleApi from './node_modules/@datalayer/datalayer/lib/api/google/GoogleApi'
import MicrosoftApi from './node_modules/@datalayer/datalayer/lib/api/microsoft/MicrosoftApi'
import TwitterApi from './node_modules/@datalayer/datalayer/lib/api/twitter/TwitterApi'
import SpitfireApi from './node_modules/@datalayer/datalayer/lib/api/spitfire/SpitfireApi'
import DatalayerApi from './node_modules/@datalayer/datalayer/lib/api/datalayer/DatalayerApi'

export interface IProps {
}

export interface IState {
}

// JupyterLab Extension for Kubernetes Authentication and Authorization in the Cloud (AWS...).
export class Init extends React.Component<IProps, IState> {

  public constructor(props: IProps) {
    super(props)
  }

  public render() {
    return (
        <Provider store={ DatalayerStore.notebookStore }>
          <div>
            <ConfigApi/>
            <SpitfireApi/>
            <DatalayerApi/>
            <GoogleApi/>
            <MicrosoftApi/>
            <TwitterApi/>
            <ConnectedRouter history = { routerHistory } >
            </ConnectedRouter>
            <ReduxToastr
              timeOut={4000}
              newestOnTop={false}
              preventDuplicates={true}
              position="top-right"
              transitionIn="fadeIn"
              transitionOut="fadeOut"
              progressBar={true}
            />
          </div>
        </Provider>
    );
  }

}
