<template>
  <div
    class="mask"
    v-if="showCart && calculation.total > 0"
    @click="handleCartShowChange"
  />
  <div class="cart">
    <div class="product" v-if="showCart && calculation.total > 0">
      <div class="product__header">
        <div class="product__header__all iconfont" @click="hanleCheckedAll(calculation.allChecked)">
          <span
            class="product__header__icon"
            v-html="calculation.allChecked ? '&#xe656;' : '&#xe667;'"
          />
          全选
        </div>
        <div
          class="product__header__clear"
          @click="clearCartItems">清空购物车</div>
      </div>
      <div
        v-for="item in productList"
        :key="item._id"
        class="product__item"
      >
        <div
          class="product__item__checked iconfont"
          v-html="item.check ? '&#xe656;' : '&#xe667;'"
          @click="() => handleCartItemChecked(shopId, item._id)"
        />
        <img class="product__item__img" :src="item.imgUrl" alt="">
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <div class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{item.price}}
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </div>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus iconfont"
            @click="() => { changeItemToCart(shopId, item._id, item, -1) }"
          >&#xe677;</span>
          {{ item.count || 0 }}
          <span
            class="product__number__plus iconfont"
            @click="() => { changeItemToCart(shopId, item._id, item, 1) }"
          >&#xe845;</span>
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
          @click="handleCartShowChange"
        >
        <span class="check__icon__tag">{{ calculation.total }}</span>
      </div>
      <div class="check__info">
        总计：
        <span class="check__info__yen">&yen; {{ calculation.price }}</span>
      </div>
      <div class="check_btn" v-if="calculation.total > 0">
        <router-link :to="{path: `/orderConfirmation/${shopId}`}">
          去结算
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'

// 购物车相关处理逻辑
const useCartEffect = (shopId) => {
  const store = useStore()

  const handleCartItemChecked = (shopId, productId) => {
    store.commit('handleCartItemChecked', { shopId, productId })
  }

  const clearCartItems = () => {
    store.commit('clearCartItems', { shopId })
  }

  /* const hanleCheckedAll = (allChecked) => {
    store.commit('hanleCheckedAll', { shopId, allChecked })
  } */
  const hanleCheckedAll = () => {
    store.commit('hanleCheckedAll', { shopId })
  }

  return { handleCartItemChecked, clearCartItems, hanleCheckedAll }
}

const toggleCartEffect = () => {
  // 购物车的显示隐藏
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return {  showCart, handleCartShowChange }
}

export default {
  name: 'Cart',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { handleCartItemChecked, clearCartItems, hanleCheckedAll } = useCartEffect(shopId)
    const { productList, changeItemToCart, calculation } = useCommonCartEffect(shopId)
    const { showCart, handleCartShowChange } = toggleCartEffect()
    return { calculation, shopId, productList, showCart,
     changeItemToCart, handleCartItemChecked, clearCartItems, hanleCheckedAll, handleCartShowChange }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.50);
  z-index: 1;
}
.cart {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
}
.product {
  overflow-y: auto;
  flex: 1;
  background-color: $btnColor;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: .52rem;
    padding: 0 .18rem;
    // line-height: .52rem;
    font-size: .14rem;
    color: #333;
    border-bottom: .01rem solid #F1F1F1;
    &__icon {
      display: inline-block;
      margin-right: .06rem;
      font-size: .2rem;
      color: #0091FF;
      vertical-align: middle;
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .18rem;
    border-bottom: .01rem solid $content-bgColor;
    &__checked {
      margin-right: .16rem;
      line-height: .46rem;
      color: #0091FF;
      font-size: .2rem;
    }
    &__img {
      display: block;
      width: .46rem;
      height: .46rem;
    }
    &__detail {
      overflow: hidden;
      flex: 1;
      padding-left: .16rem;
    }
    &__title {
      margin: 0;
      font-size: .14rem;
      line-height: .2rem;
      color: $content-fontColor;
      @include ellipsis;
    }
    &__price {
      margin: 0.06rem 0 0;
      font-size: .14rem;
      line-height: .2rem;
      color: $highlightColor;
    }
    &__yen {
      font-size: .12rem;
    }
    &__origin {
      margin-left: .06rem;
      font-size: .12rem;
      line-height: .2rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      bottom: .12rem;
      right: 0;
      &__minus {
        position: relative;
        top: .02rem;
        margin-right: .05rem;
        color: $media-fontColor;
      }
      &__plus {
        position: relative;
        top: .02rem;
        margin-left: .05rem;
        color: $btn-bgColor;
      }
    }
  }
}
.check {
  display: flex;
  // align-items: center;
  height: .49rem;
  line-height: .49rem;
  background: $btnColor;
  box-shadow: 0 -.01rem .01rem 0 #F1F1F1;
  &__icon {
    position: relative;
    width: .84rem;
    &__img {
      display: block;
      width: .28rem;
      height: .26rem;
      margin: 0.12rem auto;
    }
    &__tag {
      position: absolute;
      top: 0.04rem;
      left: 0.46rem;
      min-width: .2rem;
      height: .2rem;
      padding: 0 .04rem;
      line-height: .2rem;
      color: $btnColor;
      background: #E93B3B;
      border-radius: .1rem;
      font-size: .12rem;
      text-align: center;
      transform: scale(.5);
      transform-origin: left center;
      box-sizing: border-box;
    }
  }
  &__info {
    font-size: .12rem;
    color: #333;
    &__yen {
      font-size: .18rem;
      color: #E93B3B;
      font-weight: bold;
    }
  }
  &_btn {
    position: absolute;
    right: 0;
    bottom: 0;
    width: .98rem;
    height: .49rem;
    font-size: .14rem;
    background: #4FB0F9;
    text-align: center;
    font-weight: bold;
    a {
      text-decoration: none;
      color: $btnColor;
    }
  }
}
</style>