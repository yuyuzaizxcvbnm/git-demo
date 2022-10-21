<template>
  <div class="home">
    <div class="Context">
      <router-view></router-view>
    </div>
    <ul>
      <li>
        <router-link to="/home">
          <span class="iconfont icon-fangzi size" v-if="path == 'home'"></span>
          <img src="@/assets/home.png" v-else/>
          <p>首页</p>
        </router-link>
      </li>
      <li>
        <router-link to="/trade">
          <span class="iconfont icon-fangwu size" v-if="path == 'trade'"></span>
          <img src="@/assets/trade.png" v-else/>
          <p>交易</p>
        </router-link>
      </li>
      <li>
        <router-link to="/my">
          <span class="iconfont icon-yonghu size" v-if="path == 'my'"></span>
          <img src="@/assets/my.png" v-else/>
          <p>我的</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path:''
    };
  },
  mounted() {
    this.path = location.hash.substring(2);
  },
  updated() {
    this.path = location.hash.substring(2);
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  position: relative;
  background-color: #f3f3f3;
  .Context {
    height: calc(100% - 50px);
    overflow-y: auto;
  }
  .size{
    font-size: 22px;
    margin-bottom: 2px;
  }
  ul {
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    display: flex;
    height: 50px;
    position: absolute;
    background-color: #f7f7fa;
    border-top: 1px solid #e2e2e5;
    li {
      flex: 1;
      height: 100%;
      a {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        color: #999;
        img {
          widows: 27px;
          height: 27px;
        }
      }
    }
  }
}

</style>