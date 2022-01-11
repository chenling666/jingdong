<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" />
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="请输入用户名"
        v-model="data.username"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        placeholder="请输入密码"
        v-model="data.password"
      />
    </div>
    <div class="wrapper__login-btn" @click="handleLogin">登录</div>
    <div class="wrapper__register-link" @click="handleRegisterClick">立即注册</div>
  </div>
  <Toast v-if="toastData.isShowToast" :message="toastData.toastMessage"/>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
// import axios from 'axios'
import { post } from '../../utils/request'
import Toast, { toastEffect } from '../../components/Toast.vue'


export default {
  name: 'Login',
  components: { Toast },
  setup() {
    const data = reactive({
      username: '',
      password: ''
    })
    const router = new useRouter()
    const { toastData, showToast } = toastEffect()
    const handleLogin = async () => {
      try {
        const result = await post('111/api/user/login', {
          username: data.username,
          lastName: data.password
        })
        // console.log(result)
        if(result?.errno === 0) {
          localStorage.isLogin = true
          router.push({ name: 'Home' })
        } else {
          // alert('登陆失败')
          showToast('登陆失败')
        }
      } catch (e) {
        // alert('请求失败')
          showToast('请求失败')
      }
      /* try {
          const result = await axios.post('https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api/user/login', {
          username: data.username,
          lastName: data.password
        })
        console.log(result)
        if(result?.data?.errno === 0) {
          localStorage.isLogin = true
          router.push({ name: 'Home' })
        } else {
          alert('登陆失败')
        }
      } catch (e) {
        alert('请求失败')
      } */
      /* axios.post('https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api/user/login', {
        username: data.username,
        lastName: data.password
      }).then(() => {
        // alert('登陆成功')
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      }).catch(() => {
        alert('登陆失败')
      }) */
    }
    const handleRegisterClick = () => {
      router.push({ name: 'Register' })
    }
    return { handleLogin, handleRegisterClick, data, toastData }
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