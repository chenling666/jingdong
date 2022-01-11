<template>
  <div>
    <div class="wrapper">
      <div class="title">我的订单</div>
      <div class="orders">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="order"
        >
          <div class="order__title">
            {{ item.shopName }}
            <div class="order__status">{{ item.isCanceled ? '已取消' : '已下单' }}</div>
          </div>
          <div class="order__content">
            <div class="order__content__imgs">
              <template
                v-for="(innerItem, innerIndex) in item.products"
                :key="innerIndex"
              >
                <img
                  class="order__content__img"
                  v-if="innerIndex <= 3"
                  :src="innerItem.product.img"
                />
              </template>
            </div>
            <div class="order__content__info">
              <div class="order__content__info__price">&yen;{{ item.totalPrice }}</div>
              <div class="order__content__info__count">共{{ item.totalNum }}件</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Docker :currentIndex="2"/>
  </div>
</template>

<script>
import { get } from '../../utils/request'
import Docker from '../../components/Docker.vue'
import { reactive, toRefs } from '@vue/reactivity'

const useOrderListEffect = () => {
  const data = reactive({list: []})
  const getOrderList = async () => {
    const result = await get('/api/order')
    if(result?.errno === 0 && result?.data?.length > 0) {
      const orderList = result.data
      orderList.forEach(order => {
        const productList = order.products
        let totalPrice = 0
        let totalNum = 0
        productList.forEach(productItem => {
          totalPrice +=  ((productItem?.product?.price * productItem?.orderSales) || 0)
          totalNum += (productItem?.orderSales || 0)
        })
        order.totalPrice = totalPrice
        order.totalNum = totalNum
      });
      data.list = result.data
    }
    console.log(result);
  }
  getOrderList()
  console.log(data.list)
  const { list } = toRefs(data)
  return { list }
}
export default {
  name: 'OrderList',
  components: { Docker },
  setup() {
    const { list } = useOrderListEffect()
    console.log(list);
    return { list }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  background: #f8f8f8;
}
.title {
  padding: .11rem 0;
  color: #333;
  font-size: .16rem;
  line-height: .22rem;
  text-align: center;
  background: #fff;
}
.orders {
  padding: .16rem .18rem;
}
.order {
  padding: .16rem;
  margin-bottom: .16rem;
  background: #fff;
  &__title {
    position: relative;
    font-size: .16rem;
    line-height: .22rem;
    color: #333;
  }
  &__status {
    position: absolute;
    top: 0;
    right: 0;
    font-size: .14rem;
    line-height: .2rem;
    color: #999;
  }
  &__content {
    display: flex;
    justify-content: space-between;
    padding-top: .16rem;
    vertical-align: middle;
    &__imgs {
      display: flex;
    }
    &__img {
      width: .4rem;
      height: .4rem;
      margin-right: .12rem;
    }
    &__info {
      &__price {
        font-size: .14rem;
        line-height: .2rem;
        text-align: right;
        color: #E93B3B
      }
      &__count {
        margin-top: .04rem;
        font-size: .12rem;
        line-height: .14rem;
      }
    }
  }
}
</style>