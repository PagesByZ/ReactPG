import React, {Component} from "react"

import productData from "../productData"
import ShoppingCart from "./ShoppingCart"
import ShowToast from "./ShowToast"

import waveTop from "../TheImages/wTop.png"
import waveMid from "../TheImages/wMid.png"
import waveBot from "../TheImages/wBot.png"
import sCartImg from "../TheImages/sCart.png"

class ProductPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cartAddedCount: 0,
      openModal: false,
      promoVal: "",
      itemInCart: [],
      deletedItem: "",
      isDiscounted: false,
      promoCode: {
        "SMR20": 20,
        "FAL10": 10,
        "MMU25": 25,
        "MCHUA": 65
      },
      promoPercent: 0,
      promoUsed: "",
      cartTotal: 0,
      showMsgs: {
        "itemadded": "The following item has been added to cart",
        "promonotfound": "The promo code you entered is not in the system",
        "itemdeleted": "The following item has been deleted from the cart"
      },
      actionPerformed: null
    }
    this.cartAdd = this.cartAdd.bind(this)
    this.manageCartModal = this.manageCartModal.bind(this)
    this.applyPromotion = this.applyPromotion.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }
  cartAdd(e) {
    let itemN = e.target.name !== null ? e.target.name.toString().split('_')[1] : null
    this.setState((prevState) => {
      return {
        cartAddedCount: prevState.cartAddedCount + 1,
        itemInCart: [...prevState.itemInCart, itemN]
      }
    })
  }

  generateProductList(pd) {
    var prodList = []
    var prodDLen = pd.productData.length
    for (var t = 0; t < prodDLen; t++) {
      var isOnSale = pd.productData[t].sale
      prodList.push(
        <section className="posRel sCustom">
          {isOnSale ?
             <div className="sRibbon"><span>SALE</span></div>
             :
             null
          }
          <div className="prodImageHolder hidO">
            <img id={"plItem" + t} src={pd.productData[t].photo} alt={pd.productData[t].brand + pd.productData[t].name} />
          </div>
          <h2>{pd.productData[t].brand}</h2>
          <p>{pd.productData[t].name}</p>
          <aside>
            <ul>
              <li>Price: <span className={isOnSale ? "onSale" : ""}>{this.formatPrice(pd.productData[t].price)}</span> {isOnSale ? <span className="salePrice">{this.formatPrice(pd.productData[t].salePrice)}</span> : null}</li>
              <li><span>In Stock</span></li>
            </ul>
            <button className="addToCart" name={"item_" + pd.productData[t].id} onClick={(e) => this.cartAdd(e)}>Add to Cart</button>
          </aside>
        </section>
      )
    }
    return prodList
  }

  manageCartModal(e) {
    console.log("Called from Shopping Cart Component")
    this.setState((prevState) => {
      return {
        openModal: !prevState.openModal
      }
    })
  }

  applyPromotion() {
    let promoV = this.state.promoVal
    let promoCode = this.state.promoCode
    let promoP = 0
    if (promoV.toString() !== "" && promoV.toUpperCase() in promoCode) {
      promoP = promoCode[promoV]
      this.setState({
        isDiscounted: true,
        promoPercent: parseInt(promoP),
        promoUsed: promoV,
        promoVal: ""
      })
    }
  }

  updateText(e) {
    this.setState({
      promoVal: e.target.value
    })
  }

  formatPrice(num) {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return (
      formatter.format(num)
    )
  }

  getMappedObj(ob) {
    var mappedObj = ob.reduce(function(obj, b) {
      obj[b] = ++obj[b] || 1;
      return obj;
    }, {});
    let mappedItems = Object.entries(mappedObj);

    return (
      mappedItems
    )
  }

  deleteItem(e, key, p, pd) {
    var iicLen = p.length
    var delItem = ""
    var iiC = p
    for (var i = iicLen - 1; i >= 0; i--) {
      if (iiC[i] === key) {
        iiC.splice(i, 1);
        // break;       //<-- Uncomment  if only the first term has to be removed
      }
    }
    delItem = pd.productData.filter( obj => obj.id === parseInt(key))[0]
    this.setState({
      itemInCart: iiC,
      cartAddedCount: iiC.length,
      deletedItem: delItem,
      actionPerformed: "yes"
    })
  }

  generateCartItem(pd) {
    var itemArr = []
    let iIC = this.state.itemInCart
    let mappedItems = this.getMappedObj(iIC)
    mappedItems.map(item => {
     let key = item[0];
     let value = item[1];
     let currItem = pd.productData.filter(obj => {
       return obj.id === parseInt(key, 10)
     })
     let photo = currItem[0].photo
     let prod = currItem[0].brand + " " + currItem[0].name
     let price = this.formatPrice(currItem[0].price * value)
     let eachPrice = " @ " + this.formatPrice(currItem[0].price) + " ea"

     itemArr.push(
       <div key={"item"+key} className="posRel hidO eachItem">
        <a href className="itemRemove itemReplace" onClick={(e) => this.deleteItem(e, key, iIC, pd)}>Remove</a>
        <div className="posRel hidO itemImg">
          <img src={photo} />
        </div>
        <div className="posRel hidO itemInfo">
          <h3>{prod}</h3>
          <h4><span>Price</span>: {price} {value > 1 ? <span className={"ePrice"}> {eachPrice} </span> : null}</h4>
          <h4><span>Quantity</span>: {value}</h4>
        </div>
       </div>
     )
    });

    return itemArr
  }

  getSubTotal(pd) {
    let iIC = this.state.itemInCart
    let showDiscount = this.state.isDiscounted
    let mappedItems = this.getMappedObj(iIC)
    var subT = 0
    var keyLen = Object.keys(mappedItems).length
    var subTWithTax = 0
    var tax = .0862
    for (var t = 0; t < keyLen; t++) {
        var foundValue = pd.productData.filter(obj => obj.id === parseInt(mappedItems[t][0]))
        var thePrice = foundValue[0].price
        subT += thePrice * mappedItems[t][1]
    }
    var promoP = this.state.promoPercent
    var promoAmount = subT * (promoP / 100)
    var calcTotalPrice =
      this.state.isDiscounted ?
      ((subT - promoAmount) * tax) + (subT - promoAmount)
      :
      (subT * tax) + subT
    return (
      <div className="posRel hidO cartTotal">
        <div className="posRel hidO ccLeft ccLeftFlex">
          <div className="">
            <div className="pcHdr hidO posRel">Promo Code: </div>
          </div>
          <div className="">
            <input className={"txtPromo"} type="text" name="txtPromo" value={this.state.promoVal} onChange={(e) => this.updateText(e)} />
            <button className="mdBtn mdBtnGreen mdBtnRaised mdBtnRaisedRipple applyPromoBtn" onClick={() => this.applyPromotion()}>APPLY</button>
          </div>
          {/*<div>
            <div className="pcHdr hidO posRel">Promo Code: </div>
            <input className={"txtPromo"} type="text" name="txtPromo" value={this.state.promoVal} onChange={(e) => this.updateText(e)} />
          </div>
          <button className="mdBtn mdBtnGreen mdBtnRaised mdBtnRaisedRipple applyPromoBtn" onClick={() => this.applyPromotion()}>APPLY</button>*/}
        </div>
        <div className="posRel hidO ccRight ccRightFlex">
          <div className="posRel hidO">
            <div className="posRel hidO leftTitle">
              Subtotal:
            </div>
            <div className="posRel hidO rightValue">
              {this.formatPrice(subT)}
            </div>
          </div>
          {
            showDiscount ?
            <div className="posRel hidO">
              <div className="posRel hidO leftTitle">
                Discount ({this.state.promoUsed}):
              </div>
              <div className="posRel hidO rightValue">
                {this.state.promoPercent + "%"}
              </div>
            </div> :
            null
          }
          <div className="posRel hidO">
            <div className="posRel hidO leftTitle">
              Tax:
            </div>
            <div className="posRel hidO rightValue">
              8.625%
            </div>
          </div>
          <div className="posRel hidO">
            <div className="posRel hidO leftTitle">
              Total:
            </div>
            <div className="posRel hidO rightValue">
              {this.formatPrice(calcTotalPrice)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    var checkItemsInCart = this.state.itemInCart
    var cIIC = {
      top: "18px"
    }
    var topI = {
      backgroundImage: "url('" + waveTop + "')"
    }
    var midI = {
      backgroundImage: "url('" + waveMid + "')"
    }
    var botI = {
      backgroundImage: "url('" + waveBot + "')"
    }
    return (
      <div className="posRel hidO productPage">
        {this.state.actionPerformed !== null ? <ShowToast actionPerformed={this.state.actionPerformed} /> : null}
        <div className="visO headerTitle">
          <h1 contentEditable>See Something Fly?</h1>
          <h1 className="h1Child" contentEditable>Why Not Buy?</h1>
        </div>
        <div className="waveWrapper waveAnimation">
          <div className="waveWrapperInner bgTop">
            <div className="wave waveTop" style={topI}></div>
          </div>
          <div className="waveWrapperInner bgMiddle">
            <div className="wave waveMiddle" style={midI}></div>
          </div>
          <div className="waveWrapperInner bgBottom">
            <div className="wave waveBottom" style={botI}></div>
          </div>
        </div>
        <ShoppingCart count={this.state.cartAddedCount} iNum={this.state.itemInCart} openM={this.manageCartModal} />
        <div className="plParent hidO posRel">
          <header>
            <h1>Shoes</h1>
          </header>
          <div className="posRel hidO prodDisp">
            {
              this.generateProductList(productData)
            }
          </div>
        </div>
        <div className={"posFix visO modalStyle" + (this.state.openModal ? " modalStyleShow" : "")}>
          <div className="posAbs hidO shopCart">
            <div className="posRel hidO cartTitle">
              <h3 className="cartH">Your Shopify Items</h3>
              <div className={"cartRight posAbs visO" + (checkItemsInCart.length <= 0 ? " cartRightCT" : "")}>
                <span onClick={() => this.manageCartModal()} className={"sGoShopping" + (checkItemsInCart.length > 0 ? " sGoShoppingMarg" : "")}>Continue Shopping</span>
                {checkItemsInCart.length > 0 ? <span><button className="mdBtn mdBtnOrange mdBtnRaised mdBtnRaisedRipple">Checkout</button></span> : null}
              </div>
            </div>
            <div className="posRel hidO cartDetails">
            {
              checkItemsInCart.length > 0 ?
              <div>
                <div className="posRel autO cartItemHolder">
                {
                  this.state.openModal ? this.generateCartItem(productData) : null
                }
                </div>
                {this.getSubTotal(productData)}
              </div> :
              <div className="posRel hidO noItems">
                <div>
                  <h4>Hi, you have no items in your cart!</h4>
                  <img className="cartImgNoItem" src={sCartImg} />
                </div>
              </div>
            }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductPage
