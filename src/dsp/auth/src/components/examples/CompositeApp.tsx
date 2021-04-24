import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import appNameRedux from '../../state/examples/appName';
import { counterActions } from '../../state/examples/counter';
import { AUTH_SCOPE, APP_NAME_SCOPE, COUNTER_SCOPE } from '../../state/injectableStore';

const CompositeApp = () => {
  const dispatch = useDispatch();
  const [appName, setAppName] = useState('Nice name...');
  const authState = useSelector(state => (state as any)[AUTH_SCOPE]);
  const appNameState = useSelector(state => (state as any)[APP_NAME_SCOPE]);
  const counterState = useSelector(state => (state as any)[COUNTER_SCOPE]);
  return (
    <div style={{ marginTop: '10px' }}>
      <h2>User: {authState && JSON.stringify(authState.user)}</h2>
      <h2>Counter value: {counterState && counterState.counter}</h2>
      <button
        onClick={() => dispatch(counterActions.increment.started(undefined))}
      >
        Increment Counter (1 second delay)
      </button>
      <button
        onClick={() => dispatch(counterActions.decrement.started(undefined))}
      >
        Decrement Counter (0.2 second delay)
      </button>
      <h2>
        App Remote Name from the Redux Remote Store fetched by the RemoteApp: {appNameState && appNameState.appName}
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
          Dispatch App new name from the RemoteApp
        </button>
      </div>
    </div>
  );
}

export default CompositeApp;
