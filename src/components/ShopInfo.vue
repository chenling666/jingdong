<template>
  <div class="shop">
    <img class="shop__img" :src="item.imgUrl" alt="">
    <div class="shop__content" :class="{'shop__content--border': hideBorder ? false : true}">
      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tag">月售{{ item.sales }}</span>
        <span class="shop__content__tag">起送{{ item.expressLimit }}</span>
        <span class="shop__content__tag">基础运费{{ item.expressPrice }}</span>
      </div>
      <p class="shop__content__highlight">{{ item.slogan }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'hideBorder'],
}
</script>

<style lang="scss" scoped>
@import '../style/viriables.scss';
.shop {
  display: flex;
  padding-top: .12rem;
  &__img {
    width: .56rem;
    height: .56rem;
    margin-right: .16rem;
  }
  &__content {
    flex: 1;
    &--border {
      border-bottom: .01rem solid $content-bgColor;
    }
    &__title {
      font-size: .16rem;
      line-height: .22rem;
      color: $content-fontColor;
    }
    &__tags {
      padding: .08rem 0;
    }
    &__tag {
      margin-right: .16rem;
      font-size: .13rem;
      line-height: .18rem;
      color: $content-fontColor;
    }
    &__highlight {
      margin: 0 0 .12rem 0;
      font-size: .13rem;
      line-height: .18rem;
      color: $highlightColor;
    }
  }
}

</style>