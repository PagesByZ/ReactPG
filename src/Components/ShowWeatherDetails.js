import React, {Component} from "react";

import ReturnWeatherIcon from "./ReturnWeatherIcon"
import ShowRelatedMessages from "./ShowRelatedMessages"

class ShowWeatherDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      weatherData: {},
      inputChecked: 1,
      alert_ip: false,
      error: null
    }
    this.setChecked = this.setChecked.bind(this)
    this.changeState = this.changeState.bind(this)
    this.getWeatherDetail = this.getWeatherDetail.bind(this)
  }

  componentWillUnmount() {
    console.log("unmounted SWD")
  }

  componentDidMount() {
    console.log("mounted SWD")
    this.getWeatherDetail()
  }

  setChecked(ev) {
    console.log(ev)
    this.setState({
      inputChecked: parseInt(ev)
    })
  }

  getWeatherDetail() {
    var lati, longi
    lati = this.props.latit
    longi = this.props.longit
    var getThis = this


    fetch("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/68e8069e25f714fd75a135fefaa6f6e6/" + lati + "," + longi)
      .then(response => {
        if (response.ok) {
          console.log("got weather detail")
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => this.setState({ weatherData: data, loading: false }))
      .catch(error => this.setState({ error: error, loading: false }))
  }

  changeState() {
    this.setState((prevState) => {
      return {
        alert_ip: !prevState.alert_ip
      }
    })
  }

  returnAlert(al) {
    return (
      <div className='wrapper'>
        <div className="svgH">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAA21BMVEVHcEymyOhfmtBTkc9OicQA///N5PhpoNRknNHC3PVNgMykx+hlntLR5/lmntRnndO61vB+rttVjsbP5vhlntJlndJtodWfxOjQ5vlNiMy61/FOic6gxOhmndN/rtxwpddJkrZim9EzmcxpntNYls9wpNVhm9F2qNh0p9hsoNRqoNRGi9FontNZlM9zptdVkMtXksyItd+Fst5fm85xpdaJtOCFs95emNG81/BmntNcmNGawOVemM9xpdebwOVjnNJblM5ems682PDf8P7c7v3U6fra7fzd7/3c7f18CS8iAAAAQ3RSTlMA61YlDQH8m6j4Cut+/rGz9doJ/qamzOb+HvQa5YzZ0QeFBYtLyYTQ0Lm5C65Fzicj3N5Zy9veVPVpSOhvy+hxfkn2J+v8rwAAAKFJREFUGNNl0NcOwjAMBVBDKbPsPcvee5a9CuX/v6h2HpCt3qfoSDeJDfDPMUS5AM8m9sacT9wWKzLL4DYxbbR4QpSTJTR7G+XWSlF5rXHrFsl8fm7lNFmkw61Z+KJ9xjrHXBDNGQbEy3mFA4ntnqqPRB2qDfVQXSDMat4vAfQrpHtN6jRLY17FmJCZ/7wLgeWOLngZUg9qyben1HuY8sCTC1LgHLKEBNWjAAAAAElFTkSuQmCC" />
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAA2FBMVEVHcExontNVk8mmyekA//+92fPO5PhpoNRknNFOicRAgL/P5fhdl8241e9jmtBmnNJVkcyCsNy/2/O+2/NknNNVjsZVkMtTj8two9Z0p9dTjsqhxeefxOZqodN1p9djmtFhmtGhxudqn9NaldBJkrZgmc9km9Fel9BtotZxpteBr9ufxOd2qNhGi9FpntOGst1jnM+HtN6HtN5gl8+Itd9fmtJxpddmntNypNZondObwudemM9jnNKbwuZon9NblM7f8P7U6Prb7fzd7/3c7v3c7f3R5vnS5/lnNHctAAAAQHRSTlMAqSHsAfb9m6gNCP5C9H63Htv394QJJyLIzSvq6bXRi4vptVIHUIVMy9Dc6NALs9tQ39pg3lvLacys5W9x5qx+YKUltgAAAJlJREFUGNNl0EUSwkAQBdAmDIHg7hDc3d3l/jeiezbkV/7yVbUSER39ki1Bwocbx7tEjUZE50XUfYjx1bcAg5s36zemQI2pNPB1sEG7LlpuotZSooMcoGrcGR+9DKg1erKaHsSqG1VFl+dbTrSTMigRd9qsJDbswvILvXwaztzJmZ8JTL7ohxTG7tetsvDks37yGoqvAcnpDz+W2huvWmzgSQAAAABJRU5ErkJggg==" />
      	</div>
        <input id='pictures' type='checkbox' onChange={() => this.changeState()} checked={this.state.alert_ip ? "checked" : ""} />
        <label htmlFor='pictures'>
          <p>
            <span>{al[0].title} (<a href={al[0].uri} className={"detailLink"} target="_blank" title="Get More Detail on This Alert">Detail</a>)</span>
          </p>
          <div className='lil_arrow'></div>
          <div className='alert_content'>
            {al[0].regions.toString().split(",").join(", ").trim()}
          </div>
          <span className="spProgress"></span>
        </label>
      </div>
    )
  }

  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  getDateFromLinuxDateTime(val, type) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
    let date = new Date(val * 1000)
    let retVal = null
    if (type === "getDate") {
      retVal = monthNames[date.getMonth()] + " " + ('0' + date.getDate()).slice(-2)
    }
    else if (type === "getHour") {
      retVal = date.getHours()
    }
    else if (type === "weekDay") {
      retVal = date.getDay()
    }
    else if (type === "sTime") {
      retVal = this.formatAMPM(date)
    }
    return retVal
  }

  setWeatherTextItems(al) {
    var setWeather = []
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    var countIt, uptoNum;
    var defaultDate = new Date()
    var defaultHour = defaultDate.getHours()
    countIt = defaultHour > 17 ? 1 : 0
    uptoNum = defaultHour > 17 ? 6 : 5
    for (; countIt < uptoNum; countIt++) {
      var getDate = this.getDateFromLinuxDateTime(al.data[countIt].time.toString(), "getDate")
      var getHour = this.getDateFromLinuxDateTime(al.data[countIt].time.toString(), "getHour")
      var weekDay = this.getDateFromLinuxDateTime(al.data[countIt].time.toString(), "weekDay")
      var currDate = new Date()
      var getFDeg = this.returnFDegree()
      var humidity = Math.floor(al.data[countIt].humidity * 100)
      var precipProb = Math.floor(al.data[countIt].precipProbability * 100)
      var srTime = this.getDateFromLinuxDateTime(al.data[countIt].sunriseTime.toString(), "sTime")
      var ssTime = this.getDateFromLinuxDateTime(al.data[countIt].sunsetTime.toString(), "sTime")

      setWeather.push(
        <div key={countIt} className={"dayEach posRel visO"}>
            <div className='dayEachSub dayEachSubCustom'>
              <div className="dayEachDetail">
                <div className="weatherTop visO">
                  <div className="sRibbon">
                    <span>
                      {countIt === 0 ? "Today" : dayOfWeek[weekDay]} {getDate}
                    </span>
                  </div>
                  <div className="weather5DaySummary posAbs hidO">
                    <div className="theSummary hidO posAbs">{al.data[countIt].summary}</div>
                    <svg className="weatherWave" enableBackground="new 0 0 300 100" height="100px" id="Layer_1" preserveAspectRatio="none" version="1.1" viewBox="0 0 300 100" width="300px" x="0px" xmlSpace="preserve" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" y="0px">
                      <path className="wwLayer wwLayer1" d="M30.913,43.944c0,0,42.911-34.464,87.51-14.191c77.31,35.14,113.304-1.952,146.638-4.729
                c48.654-4.056,69.94,16.218,69.94,16.218v54.396H30.913V43.944z" fill="#FFFFFF" opacity="0.6"></path>
                      <path className="wwLayer wwLayer2" d="M-35.667,44.628c0,0,42.91-34.463,87.51-14.191c77.31,35.141,113.304-1.952,146.639-4.729
                c48.653-4.055,69.939,16.218,69.939,16.218v54.396H-35.667V44.628z" fill="#FFFFFF" opacity="0.6"></path>
                      <path className="wwLayer wwLayer3" d="M43.415,98.342c0,0,48.283-68.927,109.133-68.927c65.886,0,97.983,67.914,97.983,67.914v3.716
                H42.401L43.415,98.342z" fill="#FFFFFF" opacity="0.7"></path>
                      <path className="wwLayer wwLayer4" d="M-34.667,62.998c0,0,56-45.667,120.316-27.839C167.484,57.842,197,41.332,232.286,30.428
                c53.07-16.399,104.047,36.903,104.047,36.903l1.333,36.667l-372-2.954L-34.667,62.998z" fill="#FFFFFF"></path>
                    </svg>
                  </div>
                  <div className="weatherIcon">
                    {
                      <ReturnWeatherIcon svgFill="#FFFFFF" iH="105px" iW="105px" icon={al.data[countIt].icon} iconTitle={al.data[countIt].icon.replace(/-/g, " ")} />
                    }
                  </div>
                  <h3 className="weatherTemp">{al.data[countIt].temperatureHigh.toString().split(".")[0]}{getFDeg} / {al.data[countIt].temperatureLow.toString().split(".")[0]}{getFDeg}</h3>
               </div>
                <div className="posRel hidO weatherDet">
                  <div className="posRel hidO weatherDetLeft">
                    UV Index:
                  </div>
                  <div className="posRel hidO weatherDetRight">
                    {al.data[countIt].uvIndex}
                  </div>
                </div>
                <div className="posRel hidO weatherDet">
                  <div className="posRel hidO weatherDetLeft">
                    Humidity:
                  </div>
                  <div className="posRel hidO weatherDetRight">
                    {humidity}%
                  </div>
                </div>
                <div className="posRel hidO weatherDet">
                  <div className="posRel hidO weatherDetLeft">
                    Chance of Precipitation:
                  </div>
                  <div className="posRel hidO weatherDetRight">
                    {precipProb}%
                  </div>
                </div>
                <div className="posRel hidO weatherDet">
                  <div className="posRel hidO weatherDetLeft">
                    Sunrise:
                  </div>
                  <div className="posRel hidO weatherDetRight">
                    {srTime}
                  </div>
                </div>
                <div className="posRel hidO weatherDet">
                  <div className="posRel hidO weatherDetLeft">
                    Sunset:
                  </div>
                  <div className="posRel hidO weatherDetRight">
                    {ssTime}
                  </div>
                </div>
              </div>
            </div>
        </div>
      )
    }

    return setWeather
  }

  return5DayWeather(al) {
    /*const items = this.setWeatherTextItems(al)
    const inBreakItems = []
    let breakBlock = []
    let newBreak = false
    items.forEach((textItem, index) => {
      if(!newBreak) {
        breakBlock.push(textItem)
        if(index + 1 === items.length) {
          inBreakItems.push(breakBlock)
        }
      } else {
        inBreakItems.push(breakBlock)
        breakBlock = []
        breakBlock.push(textItem)
        if(index + 1 === items.length) {
          inBreakItems.push(breakBlock)
        }
      }
      if(index % 2) newBreak = true
      else newBreak = false
    })

    return inBreakItems.map(twoTextWeatherItems => (
      <div className="breakTwo">
        { twoTextWeatherItems }
      </div>
    ))*/
    return (
      this.setWeatherTextItems(al)
    )
  }

  returnTabsAndContent() {
    return (
      <div style={{height: "100%"}}>
        <div className={"dayWeather posRel hidO height100"}>
          <div className={"posRel hidO weatherTabs" + (this.state.weatherData.alerts ? " weatherTabsWithAlert" : "")}>
            <input id="tab1" type="radio" name="tabs" onChange={() => this.setChecked("1")} checked={this.state.inputChecked === 1 ? "checked" : ""} />
            <label htmlFor="tab1" style={{margin: "0 0 0 1%"}}>Location Details</label>

            <input id="tab2" type="radio" name="tabs" onChange={() => this.setChecked("2")} checked={this.state.inputChecked === 2 ? "checked" : ""} />
            <label htmlFor="tab2">Current Weather</label>

            <input id="tab3" type="radio" name="tabs" onChange={() => this.setChecked("3")} checked={this.state.inputChecked === 3 ? "checked" : ""} />
            <label htmlFor="tab3">5 Days Weather</label>

            <div onClick={() => this.props.cWD()} className="weekWeatherClose posAbs">
              <span className="xClose colorPurp edgePoint"></span>
              <div class="bsrText visO posRel">Back to Search Result</div>
            </div>
            {this.returnContent(1)}
            {this.returnContent(2)}
            {this.returnContent(3)}
          </div>
        </div>
      </div>
    )
  }

  returnCurrentWeather(al) {
    return (
        <div className={"currentWeather posRel hidO"}>
          <div className={"cwLeft posRel hidO"}>
            <div className={"cwIcon posRel hidO"}>
              <ReturnWeatherIcon svgFill="#61cb62" iH="150px" iW="150px" icon={al.icon} iconTitle={al.icon.replace(/-/g, " ")} />
            </div>
            <div className={"cwStatus posRel hidO"}>
              {al.summary}
            </div>
          </div>
          <div className={"cwRight posRel hidO"}>
              <div><h2 className="h2WeatherLabel">Temperature</h2>: {al.temperature !== null ? al.temperature.toString().split('.')[0] : null} {this.returnFDegree()}</div>
              <div><h2 className="h2WeatherLabel">UV Index</h2>: {al.uvIndex}</div>
              <div><h2 className="h2WeatherLabel">Humidity</h2>: {al.humidity !== null ? Math.floor(al.humidity * 100) + "%" : null}</div>
          </div>
        </div>
    )
  }

  returnFDegree() {
    return (
      <span>&#8457;</span>
    )
  }

  returnLocationDetail(al) {
    return (
      <h1>{this.props.locCN}</h1>
    )
  }

  returnContent(val) {
    var whatToDisplay = null
    if (val === 1) {
      if (this.props.locD) {
        whatToDisplay = this.returnLocationDetail(this.props.locD)
      }
    }
    else if (val === 2) {
      if(this.state.weatherData.currently) {
        whatToDisplay = this.returnCurrentWeather(this.state.weatherData.currently)
      }
    }
    else if (val === 3) {
      if (this.state.weatherData.daily) {
        whatToDisplay = this.return5DayWeather(this.state.weatherData.daily)
      }
    }

    return (
        <div className={"posRel autO" + (this.state.weatherData.alerts ? " weatherContentWithAlert" : " weatherContent")} id={"content"+ val}>
        {
          whatToDisplay
        }
        </div>
    )
  }

  render() {
    const {loading, error} = this.state
    var t;
    if (loading && error !== null) {
      return (
        <div style={{position: "relative"}}>
          <ShowRelatedMessages theMessage="Loading Weather Result(s)..." type="loading" />
        </div>
      )
    }
    else if (!loading && error !== null) {
      return (
        <ShowRelatedMessages theMessage={this.state.error.message} type="error" />
      )
    }
    else {
      return (
        <div className={"show setH posRel"}>
            {
              this.state.weatherData.alerts ?
              this.returnAlert(this.state.weatherData.alerts) :
              null
            }
            <div className={"posRel mainContentDefaults" + (this.state.weatherData.alerts ? " mainContentWithAlert" : " mainContent")}>
              {
                console.log(this.state.weatherData)
              }
              {
                console.log(this.props.locData)
              }
              {
                this.returnTabsAndContent()
              }
            </div>
        </div>
      )
    }
  }
}

export default ShowWeatherDetails
