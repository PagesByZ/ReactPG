import React, {Component} from "react"
import { BrowserRouter as Router, Route, Link, Switch, withRouter, browserHistory, IndexRoute } from "react-router-dom";

import Landing from "./Landing"

class CompNotFound extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <div className={"bg_404 hidO"}>
        <div className="ltop"></div>
        <div className="lbot"></div>
        <div className="rtop"></div>
        <div className="rbot"></div>
        <div className="container">
            <div id="lside"></div>
            <div id="rside"></div>
            <div id="lwing"></div>
            <div id="rwing"></div>
        </div>
        <div className="sun"></div>
        <div className="wind">
            <div id="lw1"></div>
            <div id="lw2"></div>
            <div id="lw3"></div>
            <div id="rw1"></div>
            <div id="rw2"></div>
            <div id="rw3"></div>
            <div id="rw4"></div>
        </div>
        <div className="msg_404">
          OOPS! Looks like the page you are looking for has left Earth!!!
          <Router>
            <Link className="aLogoBtn aLBCustom" to="/">Click Here to go back home</Link>
          </Router>
          <Switch>
            <Route exact component={withRouter(Landing)} path="/" />
          </Switch>
        </div>

      </div>
    )
  }
}

export default CompNotFound
