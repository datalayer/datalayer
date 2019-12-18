import * as React from 'react'
import { connect } from 'react-redux'

export default class Page404 extends React.Component<any, any> {
  public render() {
    console.log("Error 404 for location " + location.pathname, location)
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="clearfix">
              <h1 className="float-left display-3 mr-2">404</h1>
              <h4 className="pt-1">Oops! You're lost....</h4>
              <p className="text-muted">The page you are looking for has not been found.</p>
            </div>
{/*
            <div className="input-prepend input-group">
              <span className="input-group-addon"><i className="fa fa-search"></i></span>
              <input className="form-control" size={16} type="text" placeholder="What are you looking for?" />
              <span className="input-group-btn">
                <button className="btn btn-info" type="button">Search</button>
              </span>
            </div>
*/}
          </div>
        </div>
      </div>
    )
  }
}
