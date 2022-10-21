<template>
  <div class="MyPage animate__animated animate__fadeIn">
    <header :style="{ height: code == 0 ? '200px' : '120px' }">
      <div class="img">
        <img src="https://s1.ax1x.com/2022/09/19/x9OlIU.jpg" />
      </div>
      <div class="nickName" v-if="code == 0">
        <p>{{ info.nickName }}</p>
        <p>
          {{ info.payPasswordStatus }}
        </p>
      </div>
      <div class="ntg" v-if="code == 0">审核不通过</div>
      <div class="weui" :style="{ top: code == 0 ? '88%' : '80%' }">
        <div class="weui-cells">
          <div class="weui-cell_access">
            <img src="@/assets/wallet.png" />
            <div class="cell-primary">资产</div>
            <div class="cell-fr">
              <van-icon name="arrow" size="20" color="#fff" />
            </div>
          </div>
          <div class="weui-cell_access">
            <img src="@/assets/pig.png" />
            <div class="cell-primary">收益</div>
            <div class="cell-fr">
              <van-icon name="arrow" size="20" color="#fff" />
            </div>
          </div>
        </div>
        <div class="vux-tap-active" style="background-color: #fff">
          <div class="vux-tap">
            <img src="@/assets/vehicle.png" />
            <div class="cell-primary" style="color: #388dff">车位</div>
            <div class="cell-fr" style="color: #c9c9ce">
              <van-icon name="arrow" size="20" color="#fff" />
            </div>
          </div>
          <div class="vux-tap">
            <img src="@/assets/share.png" />
            <div class="cell-primary" style="color: #388dff">我的分享</div>
            <div class="cell-fr" style="color: #c9c9ce">
              <van-icon name="arrow" size="20" color="#fff" />
            </div>
          </div>
          <div class="vux-tap">
            <img src="@/assets/theory.png" />
            <div class="cell-primary" style="color: #388dff">设置</div>
            <div class="cell-fr" style="color: #c9c9ce">
              <van-icon name="arrow" size="20" color="#fff" />
            </div>
          </div>
        </div>
      </div>
    </header>
    <main></main>
    <my-loading :showflag="loading"></my-loading>
    <div class="show_tage" v-show="flag">{{ err }}</div>
  </div>
</template>

<script>
import urlList from "@/common/url";
export default {
  data() {
    return {
      code: 0,
      info: {},
      err: "",
      flag: false,
      loading: false,
    };
  },
  methods: {},
  created() {
    this.$http.post(urlList.detail).then((res) => {
      this.loading = true;
      if (res.data.code == 1) {
        this.err = res.data.msg;
        setTimeout(() => (this.loading = false), 1000);
        setTimeout(() => {
          if (!this.loading) {
            this.flag = true;
            setTimeout(() => (this.flag = false), 1000);
          }
        }, 1000);
      } else {
        this.info = res.data.result;
        setTimeout(() => (this.loading = false), 1000);
        this.info.payPasswordStatus = "v" + this.info.payPasswordStatus;
      }
      this.code = parseInt(res.data.code);
    });
  },
};
</script>

<style lang="scss" scoped>
.MyPage {
  height: 100%;
  position: relative;
  header {
    padding-top: 15px;
    box-sizing: border-box;
    text-align: center;
    background: url("@/assets/xin.jpg") no-repeat 0 0/100% 100%;
    position: relative;
    .img {
      width: 70px;
      height: 70px;
      margin: 0 auto 10px;
      img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
      }
    }
    .nickName {
      height: 30px;
      display: flex;
      margin: 0 auto 10px;
      color: #fff;

      align-items: flex-end;
      justify-content: center;
      p:first-child {
        font-size: 30px;
        margin-right: 15px;
      }
      p:last-child {
        font-style: oblique;
        font-size: 22px;
        color: #f99ace;
      }
    }
    .ntg {
      width: 100px;
      height: 25px;
      display: flex;
      margin: 0 auto;
      color: #fff;
      font-size: 13px;
      padding-right: 10px;
      border-radius: 4px;
      align-items: center;
      justify-content: flex-end;
      box-sizing: border-box;
      border: 1px solid #7af73c;
      background: url("https://s1.ax1x.com/2022/09/20/xCWfzT.png") no-repeat 5px
        50%/15px 15px;
    }
    .weui {
      width: 90%;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
      .weui-cells,
      .vux-tap-active {
        color: #fff;
        padding: 0 15px;
        box-sizing: border-box;
        background-color: #3878ff;
        border-radius: 5px;
        margin-bottom: 15px;
        .weui-cell_access,
        .vux-tap {
          height: 25px;
          display: flex;
          padding: 10px 0;
          align-items: center;
          border-bottom: 1px solid rgba(194, 194, 194,.5);
          &:last-of-type {
            border-bottom: none;
          }

          img {
            width: 20px;
            height: 20px;
            margin-right: 30px;
          }

          .cell-primary {
            flex: 1;
            text-align: left;
          }
          .cell-fr {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .vux-tap {
          border-bottom: 1px solid rgba(194, 194, 194,.3);
        }
      }
    }
  }
  .show_tage {
    left: 50%;
    top: 50%;
    width: 250px;
    height: 50px;
    color: #fff;
    font-size: 13px;
    letter-spacing: 2px;
    line-height: 50px;
    position: absolute;
    text-align: center;
    border-radius: 10px;
    transform: translate(-50%, -50%);
    background-color: rgba(#000000, 0.5);
  }
}
</style>