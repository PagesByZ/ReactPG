import React, {Component} from "react"

import ShowRelatedMessages from "./ShowRelatedMessages"
import NoPoster from "../TheImages/NoImage.png"

class MediaSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      mLang: 'en-US',
      mReg: '',
      mPage: '1',
      mYear: '',
      tvLang: 'en-US',
      tvPage: '1',
      tvYear: '',
      isLoading: false,
      mediaType: "Movie",
      mediaTypeOpen: false,
      mediaData: {},
      showOptions: true,
      isError: false,
      resultCount: 0
    }
    this.inputChange = this.inputChange.bind(this)
    this.searchMedia = this.searchMedia.bind(this)
    this.setSelection = this.setSelection.bind(this)
    this.showMediaSelection = this.showMediaSelection.bind(this)
    this.showMediaData = this.showMediaData.bind(this)
  }

  inputChange(event) {
    var { type, value, name } = event.target
    const re = /^[0-9\b]+$/
    if (name === "mYear" || name === "tvYear") {
      if (re.test(value)) {
        value = value
      }
      else {
        value = ''
      }
    }
    this.setState(
      {
        [name]: value,
        showOptions: true
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

  searchMedia() {
    this.setState({
      isLoading: true
    })
    var isThis = this
    var setUrlQ = "https://api.themoviedb.org/3/search/"
    setUrlQ += (this.state.mediaType.toString().indexOf("Show") !== -1 ? "tv" : "movie")
    setUrlQ += "?api_key=22833263034898d4076757139eb76e9b"
    setUrlQ += "&language=" + this.state.mLang
    setUrlQ += "&query=" + this.state.inputValue
    setUrlQ += "&page=" + this.state.mPage
    fetch(setUrlQ)
      .then(response => {
        if (response.ok) {
          console.log("got media detail")
          return response.json();
        } else {
          isThis.setState({
            showOptions: false,
            isLoading: false,
            isError: true
          })
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => this.setState({ mediaData: data}))
      .then(function() {
        isThis.setState({
          showOptions: false,
          isLoading: false,
          isError: false
        })
      })
      .catch(function(e) {
        console.log("error " + e)
        isThis.setState({
          showOptions: false,
          isLoading: false,
          isError: true
        })
      })
  }

  setSelection(e) {
    e.preventDefault()
    this.setState({
      mediaType: e.target.id === "tv" ? "TV Shows" : "Movie"
    })
  }

  showMediaSelection() {
    this.setState((prevState) => {
      return {
        mediaTypeOpen: !prevState.mediaTypeOpen,
        showOptions: true
      }
    })
  }

  isEmpty(obj) {
      for(var key in obj) {
          if(obj.hasOwnProperty(key))
              return false;
      }
      return true;
  }

  viewDetail(ev, key) {
    console.log(ev.target.id)
    console.log(key)
  }

  showMediaData() {
    var retHTML = []
    var mediaObj = this.state.mediaData
    var howManyPages = mediaObj.page
    const keys = Object.keys(mediaObj.results)
    for (const key of keys) {
      var isTVShow = this.state.mediaType.toString().indexOf("Show") !== -1
      if (isTVShow && mediaObj.results[key].first_air_date === "") continue
      retHTML.push(
        <section className="posRel sCustom">
          <div className="mRibbon mRibbonRed"><span>{isTVShow ? mediaObj.results[key].name : mediaObj.results[key].title}</span></div>
          <img src={mediaObj.results[key].poster_path !== null ? "https://image.tmdb.org/t/p/original/" + mediaObj.results[key].poster_path : NoPoster} alt={mediaObj.results[key].title} title={mediaObj.results[key].title} />
          <button id={"res" + key} onClick={(e) => this.viewDetail(e, key)} className="btnMediaDetail">View Details</button>
        </section>
      )
    }
    return (
      retHTML
    )
  }

  returnMediaOptSelect() {
    if (this.state.mediaType.toString().indexOf("Show") !== -1) {
      return (
        <div className={"tvOpt posRel hidO"}>
          <div className="optSelect movieOptL posRel">
            <div className="optSelectHolder">
              <div className="optSelectSection">
                <div className="optSelectTitle">Language</div>
                <input className="inputT" onChange={this.InputChange} value={this.state.tvLang} readOnly="readonly" name="tvLang" type="text" placeholder="" />
              </div>
              <div className="optSelectSection">
                <div className="optSelectTitle">Page</div>
                <input className="inputT" onChange={this.InputChange} value={this.state.tvPage} readOnly="readonly" name="tvPage" type="text" placeholder="1 - 1000" />
              </div>
             </div>
          </div>
          <div className="optSelect movieOptR posRel">
            <div className="optSelectHolder">
              <div className="optSelectSection">
                <div className="optSelectTitle">First Air Date Year</div>
                <input className="inputT" onChange={this.InputChange} value={this.state.tvYear} maxLength="4" name="tvYear" type="text" placeholder="1990, 2019" />
              </div>
             </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className={"movieOpt posRel hidO"}>
          <div className="optSelect movieOptL posRel">
            <div className="optSelectHolder">
              <div className="optSelectSection">
                <div className="optSelectTitle">Language</div>
                <input className="inputT" onChange={this.inputChange} value={this.state.mLang} readOnly="readonly" name="mLang" type="text" placeholder="" />
              </div>
              <div className="optSelectSection">
                <div className="optSelectTitle">Page</div>
                <input className="inputT" onChange={this.inputChange} value={this.state.mPage} readOnly="readonly" name="mPage" type="text" placeholder="1 - 1000" />
              </div>
             </div>
          </div>
          <div className="optSelect movieOptR posRel">
            <div className="optSelectHolder">
            <div className="optSelectSection">
              <div className="optSelectTitle">Year</div>
              <input className="inputT" onChange={this.inputChange} value={this.state.mYear} maxLength="4" name="mYear" type="text" placeholder="1990, 2019" />
            </div>
              <div className="optSelectSection">
                <div className="optSelectTitle">Region</div>
                <input className="inputT" onChange={this.inputChange} value={this.state.mReg} name="mReg" type="text" placeholder="" />
              </div>
             </div>
          </div>
        </div>
      )
    }
  }

  selectText(ev) {
    this.myDiv.select()
  }

  render() {
    var mediaD
    var mediaC

    if (!this.state.isLoading && !this.isEmpty(this.state.mediaData)) {
      mediaD = this.showMediaData()
      mediaC = mediaD.length
    }
    return (
      <div className="posRel visO productPage">
        <div className="plParentNoMarg visO posRel">
        {this.state.isLoading
          ?
          <ShowRelatedMessages theMessage="Searching for Medias..." type="loading" />
          :
          null
         }
          <div className="locationSearchForm">
            <div className="input-field second-wrap flexWrap">
              <div onClick={() => this.showMediaSelection()} className="posRel visO mediaType">
                <span className="mediaTypeSelected">{this.capitalize(this.state.mediaType)}</span>
                <i className={"smallArrow posAbs" + (this.state.mediaTypeOpen ? " smallArrowO" : " smallArrowC")}></i>
                <div className={"mediaSelectOpt posAbs visO" + (this.state.mediaTypeOpen ? " mediaO" : "")}>
                  <ul>
                    <li id="movie" onClick={(e) => this.setSelection(e)}>Movie</li>
                    <li id="tv" onClick={(e) => this.setSelection(e)}>TV Shows</li>
                  </ul>
                </div>
              </div>
              <div className="posRel mediaQ">
                <input
                  id="search"
                  type="text"
                  name="inputValue"
                  placeholder="Enter a Movie/TV Show"
                  onChange={this.inputChange}
                  value={this.capitalize(this.state.inputValue)}
                  onClick={(e) => this.selectText(e)}
                  ref={div => {
                    this.myDiv = div
                  }} />
                  <div className={"mediaOptions posAbs hidO" + (this.state.showOptions ? " mediaOptionsO" : "")}>
                    {
                      this.returnMediaOptSelect()
                    }
                  </div>
              </div>
            </div>
            <div className="input-field third-wrap">
              <button className="btn-search" type="button" onClick={() => this.searchMedia()}>
                <svg className="svg-inline--fa fa-search fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                </svg>
              </button>
            </div>
          </div>
          {this.state.isError
            ?
            <ShowRelatedMessages theMessage="No Result Returned" type="noresult" />
            :
            null
           }
        </div>
        {
          !this.state.isLoading && !this.isEmpty(this.state.mediaData) ?
          <div className="posRel hidO prodDisp">
            <div className={"sResultCount"}>
              <h2>{mediaC} result{mediaC > 1 ? "s" : null} found</h2>
            </div>
            {
              mediaD
            }
          </div> :
          null
        }
      </div>
    )
  }
}

export default MediaSearch
