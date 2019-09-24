import React, {Component} from "react"

import EmptyContent from "./EmptyContent"
import FilledContent from "./FilledContent"

class DummyComponent extends Component {
  render() {
    let html = "<div class='htmlD posRel hidO' style='width:250px;height:250px;'>TEST <b>This Out in Bold</b></div>"
    return (
      <div>
        <div className="hidO content content_cust_attr posRel">
          <EmptyContent htmlContent={html} />
          <FilledContent />
        </div>
      </div>
    )
  }
}

export default DummyComponent
