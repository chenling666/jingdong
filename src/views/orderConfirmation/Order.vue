<template>
  <div class="order">
    <div class="order__price">实付金额 <b>&yen;{{ calculation.price }}</b></div>
    <div
      class="order__btn"
      @click="() => handleShowConfirm(true)"
    >提交订单</div>
  </div>
  <div
    class="mask"
    v-if="showConfirm"
    @click="() => handleShowConfirm(false)"
  >
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="() => handleConfirmOrder(true)"
        >取消订单</div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="() => handleConfirmOrder(false)"
        >确认支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '../../effects/cartEffects'
import { post } from '../../utils/request'

// 确认框相关处理逻辑
const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleShowConfirm = (status) => {
    showConfirm.value = status
  }
  return { showConfirm, handleShowConfirm }
}

// 确认或取消订单相关处理逻辑
const useConfirmEffect = (shopId, shopName, productList) => {
  const router = useRouter()
  const store = new useStore()
  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    for(let i in productList.value) {
      const product = productList.value[i]
      if(product.check) {
        products.push({id: parseInt(product._id, 10), num: product.count})
      }
    }
    try {
      const result = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      console.log(result);
      if(result?.errno === 0) {
        store.commit('clearCartData', shopId)
        router.push({name: 'OrderList'})
      }
    } catch(e) {
      console.log('下单失败', e);
    }
  }
  return { handleConfirmOrder }
}

export default {
  name: 'Order',
  setup() {
    const route = useRoute()
    const shopId = parseInt(route.params.id, 10)
    const { calculation, shopName, productList } = useCommonCartEffect(shopId)
    const { showConfirm, handleShowConfirm } = useShowMaskEffect()
    const { handleConfirmOrder } = useConfirmEffect(shopId, shopName, productList)
    return { calculation, showConfirm, handleShowConfirm, handleConfirmOrder }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.order {
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: .49rem;
  line-height: .49rem;
  font-size: .14rem;
  background-color: $btnColor;
  &__price {
    text-indent: .24rem;
    color: $content-fontColor;
  }
  &__btn {
    width: .98rem;
    text-align: center;
    color: $btnColor;
    background-color: #4FB0F9;
  }
}
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.50);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.57rem;
    padding: .24rem 0;
    text-align: center;
    background-color: #fff;
    border-radius: .04rem;
    box-sizing: border-box;
    &__title {
      margin: 0;
      font-size: .18rem;
      line-height: .25rem;
    }
    &__desc {
      margin: 0;
      padding: .08rem 0 .24rem;
      font-size: .14rem;
      line-height: .2rem;
      color: #666;
    }
    &__btns {
      display: flex;
      justify-content: center;
    }
    &__btn {
      width: .8rem;
      height: .32rem;
      line-height: .32rem;
      font-size: .14rem;
      text-align: center;
      border-radius: .16rem;
      &--first {
        margin-right: .12rem;
        color: #0091FF;
        border: .01rem solid #4FB0F9;
      }
      &--last {
        margin-left: .12rem;
        color: #fff;
        background: #4FB0F9;
      }
    }
  }
}
</style>