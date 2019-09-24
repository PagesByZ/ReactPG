import shoe1 from "./TheImages/productImages/shoe_01.png"
import shoe2 from "./TheImages/productImages/shoe_02.png"
import shoe3 from "./TheImages/productImages/shoe_03.png"
import shoe4 from "./TheImages/productImages/shoe_04.png"
import shoe5 from "./TheImages/productImages/shoe_05.png"


const productData = [
  {
    "id": 0,
    "brand": "Nike",
    "name": "Air Max 270 React Bauhaus",
    "photo": shoe1,
    "price": 139.99,
    "sale": true,
    "salePrice": 119.99
  },
  {
    "id": 1,
    "brand": "New Balance",
    "name": "FuelCore Reveal",
    "photo": shoe2,
    "price": 85,
    "sale": false,
    "salePrice": null
  },
  {
    "id": 2,
    "brand": "LL Bean",
    "name": "Men's Rugged Ridge Hiking Shoes, Waterproof",
    "photo": shoe3,
    "price": 150,
    "sale": true,
    "salePrice": 144.99
  },
  {
    "id": 3,
    "brand": "Saucony",
    "name": "Men's Azura Neo Tokyo",
    "photo": shoe4,
    "price": 64.99,
    "sale": false,
    "salePrice": null
  },
  {
    "id": 4,
    "brand": "Air Jordan",
    "name": "Air Jordan 11 'SpaceJam'",
    "photo": shoe5,
    "price": 295,
    "sale": false,
    "salePrice": null
  }
]

export default {
  productData,
}
