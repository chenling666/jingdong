<template>
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :key="index"
      class="docker__item"
      :class="{'docker__item--active': index === currentIndex}"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.iconfont" />
        <div class="docker__title">{{ item.title }}</div>
      </router-link>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Docker',
  props: ['currentIndex'],
  setup() {
    const dockerList = [
      { iconfont: '&#xe7d8;', title: '首页', to: {name: 'Home'} },
      { iconfont: '&#xe634;', title: '购物车', to: {name: 'CartList'} },
      { iconfont: '&#xe605;', title: '订单', to: {name: 'OrderList'} },
      { iconfont: '&#xe60d;', title: '我的', to: {name: 'Home'} },
    ];
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/viriables.scss';
.docker {
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  padding: 0 0.18rem;
  box-sizing: border-box;
  box-shadow: 0 -.01rem .01rem 0 $content-bgColor;
  // border-top: .01rem solid $content-bgColor;
  &__item {
    flex: 1;
    text-align: center;
    a {
      color: $content-fontColor;
      text-decoration: none;
    }
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.18rem;
    }
    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }
  &__title {
    font-size: .2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}

</style>