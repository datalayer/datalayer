import * as React from 'react'
import { connect } from 'react-redux'

export default class Page500 extends React.Component<any, any> {
  public render() {
    console.log("Error 500 for your request", location)
    return (
/*
      <div className="container" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url(/img/space/sunrise-from-space.jpg)", height: "100vh", with: "100vw"}}>
*/
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="clearfix">
              <h1 className="float-left display-3 mr-2">500</h1>
              <h4 className="pt-1">Houston, we have a problem!</h4>
              <p className="text-muted">Your request can not be served.</p>
            </div>
            <div className="input-prepend input-group">
              <span className="input-group-addon"><i className="fa fa-search"></i></span>
              <input className="form-control" size={16} type="text" placeholder="What are you looking for?" />
              <span className="input-group-btn">
                <button className="btn btn-info" type="button">Search</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
