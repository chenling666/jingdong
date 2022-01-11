<template>
  <div class="products">
    <div class="products__shop">{{ shopName }}</div>
    <div class="products__wapper">
      <div class="products__list">
        <template
          v-for="item in productList"
          :key="item._id"
        >
          <div class="products__item" v-if="item.check">
            <img class="products__item__img" :src="item.imgUrl" alt="">
            <div class="products__item__detail">
              <h4 class="products__item__title">{{ item.name }}</h4>
              <div class="products__item__price">
                <div class="products__item__single">
                  <span class="products__item__yen">&yen;</span>{{item.price}} × {{item.count}}
                </div>
                <div class="products__item__total">
                  <span class="products__item__yen">&yen;</span>{{(item.price * item.count).toFixed(2)}}
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'
export default {
  name: 'ProductList',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName } = useCommonCartEffect(shopId)
  
    return { shopId, productList, shopName }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.products {
  margin: .16rem .18rem;
  background-color: $btnColor;
  &__shop {
    padding: .16rem;
    font-size: .16rem;
    line-height: .22rem;
    color: $content-fontColor;
    font-weight: bold;
  }
  &__wapper {
    overflow-y: auto;
    position: absolute;
    top: 2.5rem;
    bottom: .6rem;
    left: .18rem;
    right: .18rem;
  }
  &__list {
    padding: 0 .16rem;
    background-color: $btnColor;
  }
  &__item {
    position: relative;
    display: flex;
    padding-bottom: .16rem;
    &__img {
      display: block;
      width: .46rem;
      height: .46rem;
    }
    &__detail {
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
      display: flex;
      justify-content: space-between;
      margin: 0.06rem 0 0;
      font-size: .14rem;
      line-height: .2rem;
      color: $highlightColor;
    }
    &__yen {
      font-size: .12rem;
      margin: 0;
    }
    &__total {
      color: $deep-color;
    }
  }
}
</style>