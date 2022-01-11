<template>
  <div class="content">
    <div class="category">
      <!-- <div class="category__item category__item--active">全部商品</div>
      <div class="category__item">秒杀</div>
      <div class="category__item">新鲜水果</div>
      <div class="category__item">休闲食品</div>
      <div class="category__item">时令蔬菜</div>
      <div class="category__item">肉蛋家禽</div> -->
      <div
        v-for="item in categoryList"
        :key="item.tab"
        class="category__item"
        :class="{'category__item--active': currentTab == item.tab ? true : false}"
        @click="() => handleTabClick(item.tab)"
      >{{ item.title }}</div>
    </div>
    <div class="product">
      <div
        class="product__item"
        v-for="item in contentList"
        :key="item._id"
      >
      <!-- <div class="product__item"> -->
        <img class="product__item__img" :src="item.imgUrl" alt="">
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <div class="product__item__sales">月售{{item.sales}}件</div>
          <div class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{item.price}}
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </div>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus iconfont"
            @click="() => { changeItemInfoToCart(shopId, item._id, item, -1, shopName) }"
          >&#xe677;</span>
          {{getProductCartCount(shopId, item._id)}}
          <span
            class="product__number__plus iconfont"
            @click="() => { changeItemInfoToCart(shopId, item._id, item, 1, shopName) }"
          >&#xe845;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { get } from '../../utils/request'
import { useCommonCartEffect } from '../../effects/cartEffects'
import { useStore } from 'vuex'

/* export default {
  name: 'Content',
  setup() {
    // 分类信息展示与切换处理逻辑
    const categoryList = [{
      title: '全部商品',
      tab: 'all'
    }, {
      title: '秒杀',
      tab: 'seckill'
    }, {
      title: '新鲜水果',
      tab: 'fruit'
    }]
    const data = reactive({
      currentTab: categoryList[0].tab,
      contentList: []
    })
    
    // 对应分类商品展示
    const route = new useRoute()
    const getProductData = async (tab) => {
      // const result = await get('/api/shop/1/products', {tab})
      const result = await get(`/api/shop/${route.params.id}/products`, {tab})
      if (result?.errno === 0 && result?.data?.length) {
        data.contentList = result.data
      }
    }

    // 点击分类切换对应展示商品
    const handleChangeTabClick = (tab) => {
      data.currentTab = tab
      getProductData(tab)
    }

    getProductData('all')
    const { currentTab, contentList } = toRefs(data)
    return { categoryList, currentTab, contentList, handleChangeTabClick }
  }
} */

// 不变的可以抽离出来
const categoryList = [
  {title: '全部商品', tab: 'all'},
  {title: '秒杀', tab: 'seckill'},
  {title: '新鲜水果', tab: 'fruit'}
]

// Tab 切换相关处理逻辑
const useTabEffect = () => {
  const currentTab = ref(categoryList[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 内容列表展示相关处理逻辑
const useContentListEffect = (currentTab, shopId) => {
  const content = reactive({contentList: []})

  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {tab: currentTab.value})
    if (result?.errno === 0 && result?.data?.length) {
      content.contentList = result.data
    }
  }

  // 使用监听，getContentData()依赖的东西发生变化就会重新执行
  watchEffect(() => { getContentData() })

  const { contentList } = toRefs(content)
  return { contentList }
}

// 购物车相关逻辑
const useCartEffect = () => {
  const store = new useStore()
  const { cartList, changeItemToCart } = useCommonCartEffect()

  // 添加商铺名称
  const changeShopNameToCart = (shopId, shopName) => {
    store.commit('changeShopNameToCart', { shopId, shopName })
  }
  // 删减商品
  const changeItemInfoToCart = (shopId, productId, productInfo, num, shopName) => {
    changeItemToCart(shopId, productId, productInfo, num)
    changeShopNameToCart(shopId, shopName)
  }
  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  return { changeItemInfoToCart, getProductCartCount }
}

export default {
  name: 'Content',
  props: ['shopName'],
  setup() {
    const route = new useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { contentList } = useContentListEffect(currentTab, shopId)
    const { changeItemInfoToCart, getProductCartCount } = useCartEffect()
    
    return { categoryList, currentTab, contentList, shopId, handleTabClick, changeItemInfoToCart, getProductCartCount }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.content {
  display: flex;
  position: absolute;
  top: 1.54rem;
  bottom: .49rem;
  left: 0;
  right: 0;
}
.category {
  overflow-y: auto;
  width: .76rem;
  font-size: .14rem;
  color: $content-fontColor;
  text-align: center;
  background: $bgColor;
  &__item {
    line-height: .4rem;
     &--active {
      background: $btnColor;
    }
  }
}
.product {
  overflow-y: auto;
  flex: 1;
  padding: 0 .18rem 0 .16rem;
  &__item {
    position: relative;
    display: flex;
    padding: .12rem 0;
    border-bottom: .01rem solid $content-bgColor;
    &__img {
      display: block;
      width: .68rem;
      height: .68rem;
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
    &__sales {
      margin: .06rem 0;
      font-size: .12rem;
      line-height: .16rem;
      color: $content-fontColor;
    }
    &__price {
      margin: 0;
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
      right: 0;/* 
      &__minus, &__plus {
        display: inline-block;
        box-sizing: border-box;
        width: .2rem;
        height: .2rem;
        line-height: .16rem;
        font-size: .2rem;
        text-align: center;
        border-radius: 50%;
      } */
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
</style>