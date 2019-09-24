import React, {Component} from "react"

class EmptyContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayHTML: ""
    }
  }
  componentDidMount() {
    this.setState({
      displayHTML: this.props.htmlContent
    })
  }
  render() {
    return (
      <div>
        <div className="hidO posAbs" style={{top: "5%"}, {left: "10%"}}>
          <div dangerouslySetInnerHTML={{__html: this.state.displayHTML}} /> {/*SANITIZE before using this in production!!!*/}
        </div>
      </div>
    )
  }
}

export default EmptyContent
