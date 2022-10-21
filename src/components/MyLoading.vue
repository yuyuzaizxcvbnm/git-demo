<template>
  <div class="loading" v-show="showflag">
    <van-loading type="spinner" size="24px" text-color="#fff">加载中...</van-loading>
  </div>
</template>

<script>
import Vue from "vue";
import { Loading } from "vant";

Vue.use(Loading);
export default {
  props: ["showflag"],
};
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background-color: rgba(#000000, .5);
}
</style>