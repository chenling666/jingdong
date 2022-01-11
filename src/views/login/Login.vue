<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" />
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="请输入用户名"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        placeholder="请输入密码"
        v-model="password"
      />
    </div>
    <div class="wrapper__login-btn" @click="handleLogin">登录</div>
    <div class="wrapper__register-link" @click="handleRegisterClick">立即注册</div>
  </div>
  <Toast v-if="isShow" :message="toastMessage"/>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'
import Toast, { toastEffect } from '../../components/Toast.vue'

// 登录相关事件
const loginEffect = (showToast) => {
  const router = new useRouter()
  const data = reactive({
    username: '',
    password: ''
  })
  const handleLogin = async () => {
    if(data.username == '' || data.password == '') {
      showToast('用户名、密码不能为空！')
    } else {
      try {
        const result = await post('/api/user/login', {
          username: data.username,
          lastName: data.password
        })
        if(result?.errno === 0) {
          localStorage.isLogin = true
          router.push({ name: 'Home' })
        } else {
          showToast('登陆失败')
        }
      } catch (e) {
          showToast('请求失败')
      }
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}

// 注册相关事件
const registerEffect = () => {
  const router = new useRouter()
  const handleRegisterClick = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegisterClick }
}

export default {
  name: 'Login',
  components: { Toast },
  // setup() 流程调用处理
  setup() {
    const { isShow, toastMessage, showToast } = toastEffect()
    const { username, password, handleLogin } = loginEffect(showToast)
    const { handleRegisterClick } = registerEffect()
    
    return {
      isShow, toastMessage,
      username, password,
      handleLogin, handleRegisterClick }
  }
}
</script>

 <style lang="scss" scoped>
 @import '../../style/viriables.scss';

 .wrapper {
   position: absolute;
   top: 50%;
   left: 0;
   right: 0;
   transform: translateY(-50%);
  //  text-align: center;
   &__img {
     display: block;
     margin: 0 auto;
     width: .66rem;
     height: .66rem;
     margin-bottom: .4rem;
   }
   &__input {
     margin: 0 auto;
     height: .46rem;
     margin: 0 .4rem .16rem .4rem;
     border: .01rem solid rgba(0,0,0,0.10);
     border-radius: .06rem;
     background: #F9F9F9;
     &__content {
       box-sizing: border-box;
       width: 100%;
       padding-left: .16rem;
       font-size: .16rem;
       line-height: .46rem;
       color: $content-notice-fontColor;
       border: none;
       border-radius: .06rem;
       background: none;
       outline: none;
       /* &::placeholder {
         color: $content-notice-fontColor;
       } */
     }
   }
   &__login-btn {
     height: .48rem;
     margin: .16rem .4rem;
     line-height: .48rem;
     font-size: .16rem;
     text-align: center;
     color: $btnColor;
     background: #0091FF;
     border-radius: .04rem;
     box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
   }
   &__register-link {
     text-align: center;
     font-size: .14rem;
     line-height: .2rem;
     color: $content-notice-fontColor;
   }
 }
 </style>