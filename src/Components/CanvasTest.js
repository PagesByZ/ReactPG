import React, {Component} from "react"

class CanvasTest extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="posRel hidO productPage">
                 <div id="completeSection" style={{minHeight: "419px"}} aria-hidden="false">
                    <canvas className="rays_canvas"></canvas>
                </div>
            </div>
        )
    }
}

export default CanvasTest