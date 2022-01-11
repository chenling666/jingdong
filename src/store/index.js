import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocaCartList = () => {
  // { shopId: {shopName:'', productList:{ productId: {} }}}
  try {
    return JSON.parse(localStorage.cartList)
  } catch(e) {
    return {}
  }
}


export default createStore({
  // state: { cartList: { shopId: { shopName: '', productList: { productId: {} } } } }
  /* state: {
    cartList: {
      // shopId: {
      //   shopName: '',
      //   productList: {
      //      productId: {
      //        _id: '1',
      //        name: '番茄250g/份',
      //        imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
      //        sales: 10,
      //        price: 33.6,
      //        oldPrice: 39.6,
      //        count: 2
      //      }
      //   }
      // }
    }
  }, */
// export default Vuex.createStore({
  state: {
    cartList: getLocaCartList()
    // cartList: {}
  },
  mutations: {
    changeItemToCart(state, payload) {
      const { shopId, productId, productInfo } = payload
      let shopInfo = state.cartList[shopId] || { shopName: '', productList: {} }
      let product = shopInfo.productList[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      product.count += payload.num
      if(payload.num > 0) {
        product.check = true
      }
      if (product.count < 0) {
        product.count = 0
      }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    // 修改购物车商铺名称
    changeShopNameToCart(state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList.shopInfo = shopInfo
      setLocalCartList(state)
    },
    handleCartItemChecked(state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    clearCartItems(state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    hanleCheckedAll(state, payload) {
      // const { shopId, allChecked } = payload
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if(products) {
        for(let i in products) {
          const product = products[i]
          /* if(!allChecked) {
            product.check = true
          } else {
            product.check = false
          } */
          product.check = true
        }
      }
      setLocalCartList(state)
    },
    clearCartData(state, shopId) {
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    }
  }
})
