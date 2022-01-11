<template>
  <div>
    <div class="position">
        <div class="iconfont iconfont__position">&#xe619;</div>
        北京理工大学国防科技园2号楼10层
        <div class="iconfont iconfont__bell">&#xe613;</div>
      </div>
      <div class="search">
        <span class="iconfont iconfont__search">&#xe7da;</span>
        <span>山姆会员商店优惠商品</span>
      </div>
      <div class="banner">
        <img
        class="banner__img"
        src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="">
      </div>
      <div class="icons">
        <div
          class="icon__item"
          v-for="item in iconList"
          :key="item.desc"
        >
          <img class="icon__item__img" :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`" alt="">
          <p class="icon__item__desc">{{ item.desc }}</p>
        </div>
      </div>
      <div class="gap"></div>
  </div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup() {
    const iconList = [
      {
        imgName: '超市',
        desc: '超市便利'
      },
      {
        imgName: '菜市场',
        desc: '菜市场'
      },
      {
        imgName: '水果店',
        desc: '水果店'
      },
      {
        imgName: '鲜花',
        desc: '鲜花绿植'
      },
      {
        imgName: '医药健康',
        desc: '医药健康'
      },
      {
        imgName: '家居',
        desc: '家居时尚'
      },
      {
        imgName: '蛋糕',
        desc: '烘焙蛋糕'
      },
      {
        imgName: '签到',
        desc: '签到'
      },
      {
        imgName: '大牌免运',
        desc: '大牌免运'
      },
      {
        imgName: '红包',
        desc: '红包套餐'
      }
    ]
    return { iconList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.position {
  // display: flex;
  // align-items: center;
  position: relative;
  font-size: .16rem;
  line-height: .22rem;
  color: $content-fontColor;
  padding: .16rem .187rem .16rem .24rem;
  @include ellipsis;
  .iconfont {
    font-size: .19rem;
    position: absolute;
    top: .16rem;
    &__position {
      left: 0;
    }
    &__bell {
      right: 0;
    }
  }
}
.search{
  margin-bottom: .12rem;
  font-size: .14rem;
  line-height: .32rem;
  color: #B7B7B7;
  border-radius: .16rem;
  background: $bgColor;
  .iconfont__search {
    padding: 0 .12rem 0 .16rem;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  padding-top: .16rem;
  .icon__item {
    flex: 20%;
    text-align: center;
    vertical-align: bottom;
    &__img {
      display: block;
      margin: 0 auto;
      width: .4rem;
      height: .4rem;
    }
    &__desc {
      font-size: .12rem;
      line-height: .17rem;
      margin: .06rem 0 .16rem 0;
      color: $content-fontColor;
    }
  }
}
.gap {
  height: .1rem;
  background-color: $content-bgColor;
  margin: 0 -0.18rem;
}
</style>