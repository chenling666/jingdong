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
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        placeholder="确认密码"
        v-model="isPassword"
      />
    </div>
    <div class="wrapper__register-btn" @click="handlerRegister">注册</div>
    <div class="wrapper__login-link" @click="handleClick">已有账号去登陆</div>
    <Toast v-if="isShow" :message="toastMessage"/>
  </div>
</template>

<script>
import { post } from '../../utils/request'
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import Toast, { toastEffect } from '../../components/Toast.vue'


// 处理注册逻辑
const registerEffect = (showToast) => {
  const data = reactive({
    username: '',
    password: '',
    isPassword: ''
  })

  // const router = new useRouter()
  const handlerRegister = async () => {
    if(data.username == '' || data.password == '') {
      showToast('用户名、密码不能为空')
    }else if(data.isPassword != data.password) {
      showToast('两次密码输入不一致！')
    } else {
      try {
        const result = await post('/api/user/register', {
          username: data.username,
          password: data.password
        })
        if(result?.errno === 0) {
          showToast('注册成功')
          // router.push({ name: 'Login' })
        } else {
          showToast('注册失败')
        }
      } catch(e) {
        showToast('请求失败')
      }
    }
    
  }
  const { username, password, isPassword } = toRefs(data)
  return { username, password, isPassword, handlerRegister }
}

// 处理登录逻辑
const loginEffect = () => {
  const router = new useRouter()
  const handleClick = () => {
    router.push({ name: 'Login' })
  }
  return { handleClick }
}

export default {
  name: 'Register',
  components: { Toast },
  // 流程处理
  setup() {
    const { isShow, toastMessage, showToast } = toastEffect()
    const { username, password, isPassword, handlerRegister } = registerEffect(showToast)
    const { handleClick } = loginEffect()
    return { 
      isShow, toastMessage, username, password, isPassword,
      handlerRegister, handleClick }
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
     }
   }
   &__register-btn {
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
   &__login-link {
     text-align: center;
     font-size: .14rem;
     line-height: .2rem;
     color: $content-notice-fontColor;
   }
 }
 </style>