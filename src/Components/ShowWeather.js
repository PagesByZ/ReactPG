import React, {Component} from "react";

import ShowWeatherButtons from "./ShowWeatherButtons"
import ShowRelatedMessages from "./ShowRelatedMessages"

class ShowWeather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      isLoading: false,
      cityResult: {},
      cityResultLen: 0,
      weatherResult: {},
      showComp: false,
      fetchError: false,
      showDetail: false
    }
    this.inputChange = this.inputChange.bind(this)
    this.getWeather = this.getWeather.bind(this)
  }

  inputChange(event) {
    const { type, value, name } = event.target
    this.setState(
      {
        [name]: value,
        showComp: false
      }
    )
  }

  capitalize(str) {
    var array1 = str.split(' ');
    var newarray1 = [];

    for(var x = 0; x < array1.length; x++){
      newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
    }
    return newarray1.join(' ');
  }

  getWeather() {
    this.setState({
      isLoading: true,
      showComp: false
    })
    let getThis = this
    let unencCityName = this.state.inputValue
    let cityName = encodeURI(this.state.inputValue)
    fetch("https://api.opencagedata.com/geocode/v1/json?q=" + cityName + "&key=f904ed8e18154b3f8eb8225db132bb0d")
      .then(function(response) {
        return response.json()
      })
      .then(function(myJson) {
        var newArray = myJson.results.filter(function (el) {
          var cond = el.components.country === "USA"
          ?
          ((el.components._type === "state_district" || el.components._type === "city" || el.components._type === "state" || el.components._type === "neighbourhood")
            ?
            true
            :
            false
           )
          :
          ((el.components._type === "city" || el.components._type === "state")
           &&
           el.components.city === getThis.state.inputValue
           &&
           (el.components.county === undefined || el.components.county === null)
          )

          return cond
        });
        console.table(newArray.length)
        if (newArray.length > 0) {
          newArray = getThis.updateArray(newArray)
        }
        getThis.setState({
          cityResult: newArray,
          cityResultLen: newArray.length
        })
        getThis.setTheState(0)
      })
      .catch(function() {
        console.log("error")
        getThis.setTheState(1)
      })
  }

  updateArray(nA) {
    var flags = [], output = [], l = nA.length, i
    for(i = 0; i < l; i++) {
        if( flags[nA[i].formatted]) continue
        flags[nA[i].formatted] = true
        output.push(nA[i])
    }

    return output
  }

  setTheState(val) {
    this.setState({
        showComp: true,
        isLoading: false
    })
    if (val === "1") {
      this.setState({ fetchError: true })
    }
  }

  componentWillUnmount() {
    console.log("unmounted SW")
  }

  componentDidMount() {
    console.log("mounted SW")
  }

  render() {
    document.body.classList.add('plainGrayBG');
    return (
      <div className="posRel visO productPage">
        <div className="plParentNoMarg visO posRel">
          <div className="locationSearchForm">
            <div className="input-field second-wrap">
              <input
                id="search"
                type="text"
                name="inputValue"
                placeholder="Enter Location Name"
                onChange={this.inputChange}
                value={this.capitalize(this.state.inputValue)} />
            </div>
            <div className="input-field third-wrap">
              <button className="btn-search" type="button" onClick={() => this.getWeather()}>
                <svg className="svg-inline--fa fa-search fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                </svg>
              </button>
            </div>
          </div>
          {this.state.isLoading
            ?
            <ShowRelatedMessages theMessage="Searching for Locations..." type="loading" />
            :
            null
           }
           {
             this.state.showComp
             ?
              this.state.cityResultLen > 0
              ?
              <ShowWeatherButtons textValue={this.capitalize(this.state.inputValue)} displayDetail={this.state.showDetail} countEntry={this.state.cityResultLen} cityResult={this.state.cityResult} />
              :
              <ShowRelatedMessages theMessage="No Result Returned" type="noresult" />
             :
              null
           }
        </div>
      </div>
      /*<div className="hidO content content_attr content_shadow">
        <div className="visO posRel height100">
          <div className="locationSearchForm">
            <div className="input-field second-wrap">
              <input
                id="search"
                type="text"
                name="inputValue"
                placeholder="Enter Location Name"
                onChange={this.InputChange}
                value={this.Capitalize(this.state.inputValue)} />
            </div>
            <div className="input-field third-wrap">
              <button className="btn-search" type="button" onClick={() => this.GetWeather()}>
                <svg className="svg-inline--fa fa-search fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                </svg>
              </button>
            </div>
          </div>
          {this.state.isLoading
            ?
            <ShowRelatedMessages theMessage="Searching for Locations..." type="loading" />
            :
            null
           }
           {
             this.state.showComp
             ?
              this.state.cityResultLen > 0
              ?
              <ShowWeatherButtons textValue={this.Capitalize(this.state.inputValue)} displayDetail={this.state.showDetail} countEntry={this.state.cityResultLen} cityResult={this.state.cityResult} />
              :
              <ShowRelatedMessages theMessage="No Result Returned" type="noresult" />
             :
              null
           }
        </div>
      </div>*/
    )
  }
}

export default ShowWeather
