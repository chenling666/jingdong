<template>
  <div class="wrap">
    <div class="search">
      <div class="search__back iconfont" @click="handleclickBack">&#xe697;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe7da;</span>
        <input class="search__content__input" placeholder="请输入商品名称搜索" />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-if="item.imgUrl" />
    <Content :shopName="item.name" />
    <Cart />
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'
import Content from './Content.vue'
import Cart from './Cart.vue'

// 点击回退逻辑
const useBackEffect = () => {
  const router = new useRouter()
  const handleclickBack = () => {
    router.back()
  }
  return  handleclickBack 
}

// 获取当前店铺信息
const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getShopData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getShopData }
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },

  setup() {
    // 流程调用
    const handleclickBack = useBackEffect()
    const { item, getShopData } = useShopInfoEffect()
    getShopData()

    return { item, handleclickBack } 
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.wrap {
  padding: 0 .18rem;
}
.search {
  display: flex;
  margin: .16rem 0 .04rem;
  line-height: .32rem;
  &__back {
    width: .3rem;
    font-size: .24rem;
    color: #B6B6B6;
  }
  &__content {
    display: flex;
    flex: 1;
    background: $bgColor;
    border-radius: .16rem;
    &__icon {
      margin: 0 .12rem 0 .16rem;
      font-size: .16rem;
      color: #B7B7B7;
    }
    &__input {
      flex: 1;
      padding-right: .2rem;
      font-size: .14rem;
      color: $content-fontColor ;
      border: none;
      background: none;
      outline: none;
    }
  }
}
</style>