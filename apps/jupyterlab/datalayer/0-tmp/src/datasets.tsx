import * as React from '../../node_modules/@types/react';

export interface IProps {
}

export interface IState {
}

export
class Datasets extends React.Component<IProps, IState> {

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
          <div className="ms-font-su">Datasets</div>
          <hr/>
          <div className="ms-font-xl">Sources</div>
          <p>Hive Tables</p>
          <p>HDFS</p>
          <p>S3</p>
          <hr/>
          <div className="ms-font-xl">Actions</div>
          <p>Navigator</p>
          <p>Schema Extraction</p>
          <p>Wrangle</p>
        </div>
      </div>
    );
  }

}
