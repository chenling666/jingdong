import { useStore } from 'vuex'
import { computed } from 'vue'

// 购物车相关逻辑
export const useCommonCartEffect = (shopId) => {
  const store = new useStore()
  const cartList = store.state.cartList
  const changeItemToCart = (shopId, productId, productInfo, num) => {
    store.commit('changeItemToCart', {
      shopId, productId, productInfo, num
    })
  }

  // 下方购物车列表
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    const notEmptyProductList = {}
    for(let i in productList) {
      const product = productList[i]
      if(product.count > 0) {
        notEmptyProductList[i] = product
      }
    }
    // return productList
    return notEmptyProductList
  })

  // 商店名称
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })

  // 计算：总件数、总价格，判断是否全选
  const calculation = computed(() => {
    const productList = cartList[shopId]?.productList
    const result = { total: 0, price: 0, allChecked: true }
    if(productList) {
      for(let i in productList) {
        const product = productList[i]
        if(product.check) {
          result.total += product.count
          result.price += (product.count * product.price)
        }
        if(product.count > 0 && !product.check) {
          result.allChecked = false
        }
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })

  return { cartList, productList, shopName, changeItemToCart, calculation }
}