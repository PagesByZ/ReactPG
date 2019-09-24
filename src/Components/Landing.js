import React, {Component} from "react"

class Landing extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log("mounted LD")
  }

  render() {
    return (
      <div className="landingD hidO content content_attr">
        <span>React Playground</span>
      </div>
    )
  }
}

export default Landing
