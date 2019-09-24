import React, {Component} from "react";

import ShowWeatherDetails from "./ShowWeatherDetails"

class ShowWeatherButtons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonCount: 0,
      displayDetail: false,
      latit: null,
      longit: null,
      hideSelf: false,
      locData: null,
      locCustomName: ""
    }
    this.createButtons = this.createButtons.bind(this)
    this.cWD = this.cWD.bind(this)
  }

  showThisWeather = (i, j, k, l) => {
    var r = i
    var f = j
    var g = k
    this.setState((prevState) => {
      return {
        displayDetail: true,
        latit: r,
        longit: f,
        locData: g,
        locCustomName: l,
        hideSelf: true
      }
    })
  }

  someMethod() {
      console.log('bar');
  }

  createButtons = () => {
    let cResult = this.props.cityResult
    let crLen = this.props.cityResult.length
    console.log(cResult)
    var countIt = 0

    var result = [];
    for (let y = 0; y < crLen; y++) {
       var theButtonText
       theButtonText = cResult[y].components.country === "USA"
       ?
          (cResult[y].components._type === "state_district" ?
            this.props.textValue :
            (cResult[y].components._type === "state" ? this.props.textValue : (cResult[y].components.city !== undefined ? cResult[y].components.city : cResult[y].components.town) + ", " + cResult[y].components.state)
          )
          + ", " + cResult[y].components.country
       :
          cResult[y].components.city + ", " + cResult[y].components.country
       result.push(
         /*<a className="component-button" lat={cResult[y].geometry.lat} long={cResult[y].geometry.lng} onClick={this.ShowThisWeather}>
           <span className="component-button-icon"><i className="fa fa-sun-o" aria-hidden="true"></i></span>
           <span className="component-button-text">Show {cResult[y].components.state} Weather</span>
          </a>*/
          <section className="posRel eachLocButton">
            <button
              data-lat={cResult[y].geometry.lat}
              data-lng={cResult[y].geometry.lng}
              onClick={() => this.showThisWeather(cResult[y].geometry.lat, cResult[y].geometry.lng, cResult[y], theButtonText)}
              className="btn-hover color-11">
                {theButtonText} Weather
            </button>
          </section>
       )
    }

    return result
  }

  componentWillUnmount() {
    console.log("unmounted SWB")
    this.setState((prevState) => {
      return {
        buttonCount: 0,
        displayDetail: false,
        latit: null,
        longit: null,
        hideSelf: false,
        locData: null,
        locCustomName: ""
      }
    })
  }

  componentDidMount() {
    console.log("mounted SWB")
  }

  cWD = () => {
    this.setState({
      latit: null,
      longit: null,
      hideSelf: false
    })
  }

  render() {
    return (
      <div className="weatherResult autO posRel">
        <div className={"sResultCount" + (this.state.hideSelf ? " dNone" : "")}>
          <h2>{this.props.countEntry} result{this.props.countEntry > 1 ? "(s)" : null} found</h2>
        </div>
        <div className={"sResult autO prodDisp" + (this.state.hideSelf ? " dNone" : "")}>
          {this.createButtons()}
        </div>

        {this.state.latit !== null && this.state.longit !== null && <ShowWeatherDetails cWD={this.cWD} locCN={this.state.locCustomName} locD={this.state.locData} latit={this.state.latit} longit={this.state.longit} />}
      </div>
    )
  }
}

export default ShowWeatherButtons
