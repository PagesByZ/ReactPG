import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link, Switch, withRouter, browserHistory, IndexRoute } from "react-router-dom";

import Menu from "./Menu"
import Landing from "./Landing"
import ShowWeather from "./ShowWeather"
import PictureSlider from "./PictureSlider"
import DummyComponent from "./DummyComponent"
import CompNotFound from "./CompNotFound"
import ProductPage from "./ProductPage"
import MediaSearch from "./MediaSearch"
import ToDoList from "./ToDoList"
import CanvasTest from "./CanvasTest"
import ReactPGImg from "../TheImages/reactpg_menu.png"

class Header extends Component {
  render() {
    return (
      <div>
      <Router basename={'/reactpg'}>
        <div className="headerMain posRel">
          <div className="headerShadow stickyHeader hidV">
            <div className="headerInner hidV posRel">
              <Link className="aLogoBtn" to="/">
                <span>
                  <img className="siteLogo" src={ReactPGImg} />
                  <span className="siteName">ReactPG<sup>TM</sup></span>
                </span>
              </Link>
              <Menu />
            </div>
          </div>
        </div>
        <Switch>
          <Route exact component={withRouter(Landing)} path="/" />
          <Route component={withRouter(ShowWeather)} path="/ShowWeather" />
          <Route component={withRouter(PictureSlider)} path="/PictureSlider" />
          <Route component={DummyComponent} path="/DummyComponent" />
          <Route component={ProductPage} path="/ProductPage" />
          <Route component={MediaSearch} path="/MediaSearch" />
          <Route component={ToDoList} path="/ToDoList" />
          <Route component={CanvasTest} path="/CanvasTest" />
          <Route component={CompNotFound} />
        </Switch>
      </Router>
      </div>
    )
  }
}

export default Header
