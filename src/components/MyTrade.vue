<template>
  <div class="trade animate__animated animate__fadeIn">
      <div class="title">
        <van-icon name="arrow-left"  class="left" size="25" @click="$router.go(-1)"/>
          交易委托
      </div>
      <main>

      </main>
  </div>
</template>

<script>
export default {
  data()  {
    return {};
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.trade {
  height: 100%;
  position: relative;
  .title{
    height: 46px;
    display: flex;
    color: #fff;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: #3878ff;
    .left{
      top: 50%;
      left: 10px;
      position: absolute;
      transform: translateY(-50%);
    }
  }
  main{
    padding: 10px 10px 0;
    box-sizing: border-box;
  }
}
</style>