import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import routerHistory from './history/History'
import Routes from './routes/Routes'
import ReduxToastr from 'react-redux-toastr'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { DatalayerStore } from './store/DatalayerStore'
import ConfigApi from './api/config/ConfigApi'
// import GoogleApi from './api/google/GoogleApi'
// import MicrosoftApi from './api/microsoft/MicrosoftApi'
import TwitterApi from './api/twitter/TwitterApi'
import LibraryApi from './api/library/LibraryApi'
import KuberApi from './api/kuber/KuberApi'
import IamApi from './api/iam/IamApi'
import { loadDatalayerTheme } from './theme/DatalayerThemes'

let preloader = document.getElementById('preloader')
if (preloader != null) {
  preloader.style.display = 'none'
}

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <div>
      <Provider store={ DatalayerStore.datalayerStore }>
        <div>
          <ConfigApi/>
          <IamApi/>
          <KuberApi/>
{/*
          <GoogleApi/>
          <MicrosoftApi/>
*/}
          <TwitterApi/>
          <LibraryApi/>
          <ConnectedRouter history = { routerHistory }>
            <Routes />
          </ConnectedRouter>
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
          />
        </div>
      </Provider>
    </div>
    ,
    document.getElementById('root') as HTMLElement
    )
})

loadDatalayerTheme()

serviceWorker.unregister()
