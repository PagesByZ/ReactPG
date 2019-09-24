import React, {Component} from "react"

//import productData from ".../productData"

import ShopCartImg from "../TheImages/sCart.png"

class ShoppingCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemAdded: []
    }
    this.showCart = this.showCart.bind(this)
  }

  showCart() {
    this.props.openM()
  }

  render() {
    console.log(this.props.count)
    console.log(this.props.iNum)
    return (
      <div className="shoppingCart posFix visO">
        {this.props.count > 0 ? <div className="cartCount posAbs visO">{this.props.count}</div> : ""}
        <img className="cartImg" onClick={this.showCart} src={ShopCartImg} />
      </div>
    )
  }
}

export default ShoppingCart
