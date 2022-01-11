<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  props: ['message']
}

export const toastEffect = () => {
  const toastData = reactive({
    isShow: false,
    toastMessage: ''
  })
  const showToast = (message) => {
    toastData.isShow = true
    toastData.toastMessage = message
    setTimeout(() => {
      toastData.isShow = false
      toastData.toastMessage = ''
    }, 3000)
  }
  const { isShow, toastMessage } = toRefs(toastData)
  return { isShow, toastMessage, showToast }
}

</script>

<style lang="scss" scpoed>
@import '../style/viriables.scss';

.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: .1rem;
  color: $btnColor;
  background: rgba(0, 0, 0, .35);
  border-radius: .05rem;
}
</style>