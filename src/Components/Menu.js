import React, {Component} from "react"
import { Link } from 'react-router-dom';

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuExpanded: false
    }
  }

  clickedMenu() {
    this.setState((prevState) => {
      return {
        menuExpanded: !prevState.menuExpanded
      }
    })
  }


  render() {
    return (
      <div className="hidV posAbs" style={{"right": 0}}>
        <input type="checkbox" className="menu-btn" id="menu-btn" onChange={() => this.clickedMenu()} checked={this.state.menuExpanded ? "checked" : ""} />
        <label htmlFor="menu-btn" className="menu-icon"><span className="navicon"></span></label>
        <ul className="menu">
          <li>
            <Link onClick={() => this.clickedMenu()} to="/">Home</Link>
          </li>
          <li>
            <Link onClick={() => this.clickedMenu()} to="/ShowWeather">Weather</Link>
          </li>
          <li>
            <Link onClick={() => this.clickedMenu()} to="/PictureSlider">Picture Slider</Link>
          </li>
          <li>
            <Link onClick={() => this.clickedMenu()} to="/DummyComponent">Dummy Component</Link>
          </li>
          <li>
            <Link onClick={() => this.clickedMenu()} to="/ProductPage">Shopify</Link>
          </li>
          <li>
            <Link onClick={() => this.clickedMenu()} to="/MediaSearch">Media Search</Link>
          </li>
          <li>
            <Link onClick={() => this.clickedMenu()} to="/ToDoList">To-Do List</Link>
          </li>
          <li>
            <Link onClick={() => this.clickedMenu()} to="/CanvasTest">Canvas</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Menu
