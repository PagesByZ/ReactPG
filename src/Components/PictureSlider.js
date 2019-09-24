import React, {Component} from "react"

import ShowRelatedMessages from "./ShowRelatedMessages"
import slideImg1 from "../TheImages/sliderImages/vast_ocean.jpg"
import slideImg2 from "../TheImages/sliderImages/rose_vanilla.jpg"
import slideImg3 from "../TheImages/sliderImages/orchid.jpg"
import slideImg4 from "../TheImages/sliderImages/jellyfish.jpg"

class PictureSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      timer: true,
      numOfSlides: 4,
      whichSlideActive: 0,
      slideData: {
        slide1: {
        	"img-src": slideImg1,
          "text-val": "The vastness of the ocean",
          "text-align": "left"
        },
        slide2: {
        	"img-src": slideImg2,
          "text-val": "Rose with its beauty",
          "text-align": "left"
        },
        slide3: {
        	"img-src": slideImg3,
          "text-val": "The awesome smell of Orchid",
          "text-align": "right"
        },
        slide4: {
        	"img-src": slideImg4,
          "text-val": "Jellyfish wiggling its way in the water",
          "text-align": "right"
        }
      }
    }
    this.setSlideActive = this.setSlideActive.bind(this)
  }
  componentDidMount() {
    console.log("mounted" + this.props.text)
    /*this.setState({
      loading: true
    })*/

    setTimeout(
      function() {
        this.setState({loading: false});
      }
      .bind(this),
      2000
    )
  }

  setSlideActive(event) {
    var getID = event.target.id
    console.log(getID)
    var iNum = getID.split("_")[1]
    iNum = --iNum
    this.setState({
      whichSlideActive: parseInt(iNum)
    })
  }

  setValues() {

  }

  generateSlides() {
    /*if (this.props.slideDataCustom === null) {
      this.state.slideData = {
        slide1: {
        	"img-src": "/sliderImages/vast_ocean.jpg",
          "text-val": "The vastness of the ocean"
        },
        slide2: {
        	"img-src": "/sliderImages/rose_vanilla.jpg",
          "text-val": "Rose with its beauty"
        },
        slide3: {
        	"img-src": "/sliderImages/orchid.jpg",
          "text-val": "The awesome smell of Orchid"
        },
        slide4: {
        	"img-src": "/sliderImages/jellyfish.jpg",
          "text-val": "Jellyfish wiggling its way in the water"
        }
      }
    }
    else {
      this.state.slideData = this.props.slideData
    }
    var count = 1
    var slideHTML = []
    var slideData = this.props.isCustom ? this.props.slideData : this.state.slideData
    var slideCount = Object.keys(slideData).length
    for (var property1 in slideData) {
      slideHTML.push(
        <li key={count} id={"li_count_" + count}>
          <div className={"posRel hidO slideStyle " + (count === 1 ? "displayDiv" : "")} style={{
              backgroundImage: 'url(' + slideData[property1]["img-src"] + ')',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
            }}>
              <span>
                  {slideData[property1]["text-val"]}
              </span>
          </div>
          <input type="radio" id={"slide_" + count} value={"slide_" + count} onChange={(e) => this.setSlideActive(e)} name="slide" />
          <label htmlFor={"slide_" + count}></label>
          <span>{this.state.whichSlideActive}</span>
        </li>
      )
      count++
    }

    return slideHTML*/
  }

  returnSlideImg(num) {
    let slideArr = ["slide1", "slide2", "slide3", "slide4"]
    let returnImgSrc = ""
    if (this.props.slideData !== undefined && this.props.slideData !== null) {
      if (this.props.slideData[slideArr[num]]["img-src"] !== undefined && this.props.slideData[slideArr[num]]["img-src"] !== null) {
        returnImgSrc = this.props.slideData[slideArr[num]]["img-src"]
      }
      else {
        returnImgSrc = this.state.slideData[slideArr[num]]["img-src"]
      }
    }
    else {
      returnImgSrc = this.state.slideData[slideArr[num]]["img-src"]
    }

    return returnImgSrc
  }

  returnSlideTxt(num) {
    let slideArr = ["slide1", "slide2", "slide3", "slide4"]
    let returnImgTxt = ""
    if (this.props.slideData !== undefined && this.props.slideData !== null) {
      if (this.props.slideData[slideArr[num]]["text-val"] !== undefined && this.props.slideData[slideArr[num]]["text-val"] !== null) {
        returnImgTxt = this.props.slideData[slideArr[num]]["text-val"]
      }
      else {
        returnImgTxt = this.state.slideData[slideArr[num]]["text-val"]
      }
    }
    else {
      returnImgTxt = this.state.slideData[slideArr[num]]["text-val"]
    }

    return returnImgTxt
  }

  render() {
    return (

      <div>
        <div className="hidO content content_attr">
        {
          this.state.loading ? <ShowRelatedMessages theMessage="Loading Picture Slider..." type="loading" /> :
          <ul className="slider">
            <li>
                <input type="radio" id="slide_1" onChange={(e) => this.setSlideActive(e)} name="slide" checked={this.state.whichSlideActive === 0 ? "checked" : ""} />
                <label htmlFor="slide_1"></label>
                <div className={"posRel hidO slideStyle " + (this.state.whichSlideActive === 0 ? "displayDiv" : "")} style={{
                    backgroundImage: 'url(' + this.returnSlideImg(0) + ')',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                  }}>
                    <span>
                        {this.returnSlideTxt(0)}
                    </span>
                </div>
            </li>
            <li>
                <input type="radio" id="slide_2" onChange={(e) => this.setSlideActive(e)} name="slide" checked={this.state.whichSlideActive === 1 ? "checked" : ""} />
                <label htmlFor="slide_2"></label>
                <div className={"posRel hidO slideStyle " + (this.state.whichSlideActive === 1 ? "displayDiv" : "")} style={{
                    backgroundImage: 'url(' + this.returnSlideImg(1) + ')',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                  }}>
                    <span>
                        {this.returnSlideTxt(1)}
                    </span>
                </div>
            </li>
            <li>
                <input type="radio" id="slide_3" onChange={(e) => this.setSlideActive(e)} name="slide" checked={this.state.whichSlideActive === 2 ? "checked" : ""} />
                <label htmlFor="slide_3"></label>
                <div className={"posRel hidO slideStyle " + (this.state.whichSlideActive === 2 ? "displayDiv" : "")} style={{
                    backgroundImage: 'url(' + this.returnSlideImg(2) + ')',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                  }}>
                    <span>
                        {this.returnSlideTxt(2)}
                    </span>
                </div>
            </li>
            <li>
                <input type="radio" id="slide_4" onChange={(e) => this.setSlideActive(e)} name="slide" checked={this.state.whichSlideActive === 3 ? "checked" : ""} />
                <label htmlFor="slide_4"></label>
                <div className={"posRel hidO slideStyle " + (this.state.whichSlideActive === 3 ? "displayDiv" : "")} style={{
                    backgroundImage: 'url(' + this.returnSlideImg(3) + ')',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                  }}>
                    <span>
                        {this.returnSlideTxt(3)}
                    </span>
                </div>
            </li>
          </ul>
        }
        </div>
      </div>
    )
  }
}

export default PictureSlider
