import React, {Component} from "react";

import ShowWeather from "./ShowWeather"
import Landing from "./Landing"

class Content extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Landing />
     </div>
    )
  }
}

export default Content
