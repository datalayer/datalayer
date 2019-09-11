import * as React from '../../node_modules/@types/react';

export interface IProps {
}

export interface IState {
}

// JupyterLab Extension with Social Features for Data Scientists.
export class Social extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
  }

  render() {
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        padding: '10px'
        }}>
        <div className="ms-slideDownIn20" style={{ height: "100vh" }}>
          <div className="ms-font-su">Social</div>
        </div>
      </div>
    );
  }

}
