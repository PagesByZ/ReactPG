import React, {Component} from "react"

class ShowToast extends Component {
  constructor(props) {
    super(props)
  }
  runIt() {
    setTimeout(
        function() {
          this.myDiv.setAttribute("class", "");
        }
        .bind(this),
        3000
    )
  }

  componentDidMount() {
    this.myDiv.setAttribute("class", "show");
  }

  render() {
    return (
      <div>
        <div id="snackbar" ref={div => {
            this.myDiv = div
          }}>
        {
          this.props.actionPerformed
        }
        </div>
        {
          this.runIt()
        }
      </div>
    )
  }
}

export default ShowToast
