import React, { lazy, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hostAppNameActions } from './../redux/reduxes/hostAppNameRedux'
import { HOST_APP_NAME_SCOPE } from './../redux/injectableStore'

import appNameRedux from 'dspAuth/appNameRedux';

const RemoteAppWithStore = lazy(() => import('dspAuth/RemoteAppWithStore'));

const APP_NAME_SCOPE = 'APP_NAME';

const HostApp = (props: any) =>  {
  const dispatch = useDispatch();
  const [appName, setAppName] = useState('');
  const appNameState = useSelector(state => (state as any)[APP_NAME_SCOPE]);
  const [hostAppName, setHostAppName] = useState('');
  const hostAppNameState = useSelector(state => (state as any)[HOST_APP_NAME_SCOPE]);
  return <div>
    <RemoteAppWithStore injectableStore={props.injectableStore} />
    <h2>
        App's name from the Redux Remote Store fetched by the Host: {appNameState && appNameState.appName}
    </h2>
    <div>
      <input
        style={{ marginRight: '10px' }}
        type="text"
        onChange={e => {
          setAppName(e.target.value);
        }}
      />
      <button onClick={() => dispatch(appNameRedux.appNameActions.change.started(appName))}>
        Dispatch Remote App new name from the Host
      </button>
    </div>
    <h2>
        App's name from the Redux Host Store fetched by the Host: {hostAppNameState && hostAppNameState.appName}
    </h2>
    <div>
      <input
        style={{ marginRight: '10px' }}
        type="text"
        onChange={e => {
          setHostAppName(e.target.value);
        }}
      />
      <button onClick={() => dispatch(hostAppNameActions.change.started(hostAppName))}>
        Dispatch Host App new name from the Host
      </button>
    </div>
  </div>
}

export default HostApp;
