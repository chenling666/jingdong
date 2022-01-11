<template>
  <div class="top">
    <div class="top__header">
      <span
        class="iconfont top__header__back"
        @click="handleBackClick">&#xe697;</span>
      确认订单
    </div>
    <div class="top__receiver">
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
      <div class="top__receiver__info">
        <span class="top__receiver__info__name">瑶妹（先生）</span>
        <span class="top__receiver__info__phone">18911024266</span>
      </div>
      <div class="iconfont top__receiver__enter">&#xe697;</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'Top',
  setup() {
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    return { handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.top {
  position: relative;
  height: 1.8rem;
  background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
  background-size: 100% 1.59rem;
  background-repeat: no-repeat;
  &__header {
    position: relative;
    padding-top: .2rem;
    text-align: center;
    font-size: .16rem;
    line-height: .22rem;
    color: $btnColor;
    &__back {
      position: absolute;
      left: .18rem;
      font-size: .22rem;
    }
  }
  &__receiver {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 .18rem;
    padding: .16rem;
    background-color: $btnColor;
    border-radius: .04rem;
    &__title {
      font-size: .16rem;
      line-height: .22rem;
      color: $content-fontColor;
      font-weight: bold;
    }
    &__address {
      font-size: .14rem;
      color: $content-fontColor;
      line-height: .2rem;
      margin: .14rem 0 .06rem 0;
    }
    &__info {
      font-size: .12rem;
      color: $media-fontColor;
      line-height: .17rem;
      &__name {
        margin-right: .06rem;
      }
    }
    &__enter {
      position: absolute;
      top: 50%;
      right: .16rem;
      transform:translateY(-50%) rotate(180deg);
      font-size: .2rem;
      color: $media-fontColor;
    }
  }
}
</style>