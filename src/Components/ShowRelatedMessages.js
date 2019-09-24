import React, {Component} from "react"

import LoadingImg from "../TheImages/loading.gif"

class ShowRelatedMessages extends Component {

  constructor(props) {
    super(props)
  }

  checkForType() {
    const {type} = this.props
    if (this.props.type === "loading") {
      return 0
    }
    else if (this.props.type === "noresult") {
      return 1
    }
    else if (this.props.type === "error") {
      return 2
    }

    return -1
  }

  render() {
    const {theMessage} = this.props
    return (
      <div>
        {
          this.checkForType() === 0 ?
          <div className={"show setH posAbs"} style={{top: "140px"}}>
            <div className="loadingDiv"><img className="loadGif" src={LoadingImg} /><br />{this.props.theMessage}</div>
          </div> :
          null
        }
        {
          this.checkForType() === 1 ?
          <div className={"posRel hidO"}>
            {this.props.theMessage}
          </div> :
          null
        }
        {
          this.checkForType() === 2 ?
          <div className={"show setH posAbs"}>
            <div className="loadingDiv"><h1>{this.props.theMessage}, Please try again in a moment!</h1></div>
          </div> :
          null
        }
        {
          this.checkForType() === -1 ?
          <div className={"show setH posAbs"}>
            {this.props.theMessage}
          </div> :
          null
        }
      </div>
    )
  }
}

export default ShowRelatedMessages
