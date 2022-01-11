<template>
  <div class="wrapper">
    <Top />
    <ProductList />
    <Order />
  </div>
</template>

<script>
import Top from './Top.vue'
import ProductList from './ProductList.vue'
import Order from './Order.vue'

export default {
  name: 'OrderConfirmation',
  components: { Top, ProductList, Order }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f8f8f8;
  overflow-y: scroll;
}
</style>