import * as React from '../../node_modules/@types/react';
import { Provider } from '../../node_modules/react-redux/lib'
import { DatalayerStore } from './node_modules/@datalayer/datalayer/lib/store/DatalayerStore'
import ReservationsStatus from './node_modules/@datalayer/datalayer/lib/reservations/ReservationsStatus'
import Reservations from './node_modules/@datalayer/datalayer/lib/reservations/Reservations'

export interface IProps {
}

export interface IState {
}

// JupyterLab Extension to manage K8S clusters
export class Cluster extends React.Component<IProps, IState> {

  state = {
  };

  public constructor(props: IProps) {
    super(props)
  }

  public render() {
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        padding: '10px'
        }}>
        <div className="ms-slideDownIn20" style={{ height: "100vh" }}>
          <div className="ms-font-su">Reservations</div>
          <Provider store={ DatalayerStore.notebookStore }>
            <div>
              <Reservations/>
              <ReservationsStatus/>
            </div>
          </Provider>
        </div>
      </div>
    );
  }

}
