<template>
  <div class="BigBox">
    <div class="smaller animate__animated animate__fadeIn">
      <van-swipe class="my-swipe" :autoplay="2000" indicator-color="#04be02">
        <van-swipe-item v-for="(item, index) in images" :key="index">
          <img :src="require('@/assets/' + item)" />
        </van-swipe-item>
      </van-swipe>
      <ul>
        <li v-for="(item, index) in navList" :key="index" @click="Jump(item)">
          <img v-lazy="require('@/assets/home/' + item.imgSrc)" />
          <p>{{ item.text }}</p>
        </li>
      </ul>
      <ol>
        <li>
          <div class="left">
            <div class="img">
              <img src="@/assets/home/share1.jpg" />
            </div>
            <p class="first">永久大人男女式通勤车</p>
            <p class="second grey">永久男女通用|FOREVER</p>
            <p>
              <span class="orange">
                ￥ <span class="size">548</span> 券后价
              </span>
              <span class="grey">18人付款</span>
            </p>
          </div>
          <div class="right">
            <div class="img">
              <img src="@/assets/home/share2.jpg" />
            </div>
            <p class="first">兔子共享儿童自行车</p>
            <p class="second Orangeyellow">"好用到起飞的带娃神奇"</p>
            <p>
              <span class="orange">
                ￥ <span class="size">128.6</span> 券后价
              </span>
              <span class="grey">10人付款</span>
            </p>
          </div>
        </li>
        <li>
          <div class="left">
            <div class="img">
              <img src="@/assets/home/share3.jpg" />
            </div>
            <p class="first">便携共享自行车折叠通用</p>
            <p>
              <span class="orange"> ￥ <span class="size">73</span> </span>
              <span class="grey"> 3人付款</span>
            </p>
          </div>
          <div class="right">
            <div class="img">
              <img src="@/assets/home/share4.jpg" />
            </div>
            <p class="first">青桔单车骑行卡季卡</p>
            <p class="second grey">店铺已被30.0万人圈粉</p>
            <p>
              <span class="orange">
                ￥ <span class="size">33.9</span> 券后价
              </span>
              <span class="grey">100+人付款</span>
            </p>
          </div>
        </li>
      </ol>
      <div class="wait" v-show="flag">功能未开放</div>
      <my-loading :showflag="loading"></my-loading>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem, Lazyload } from "vant";
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
export default {
  data() {
    return {
      flag:false,
      loading:false,
      images: ["banner1.jpg", "banner2.jpg", "banner3.jpg"],
      navList: [
        {
          path: "/renting/offline",
          imgSrc: "offline.png",
          text: "车位认租",
        },
        {
          path: "/trade",
          imgSrc: "trade.png",
          text: "OTC交易",
        },
        {
          path: "/apply",
          imgSrc: "apply.png",
          text: "实名认证",
        },
        {
          path: "/pcsend",
          imgSrc: "pcsend.png",
          text: "PC发送",
        },
        {
          imgSrc: "Loot.png",
          text: "夺宝商城",
        },
        {
          imgSrc: "Chess.png",
          text: "棋牌游戏",
        },
        {
          imgSrc: "fishing.png",
          text: "捕鱼",
        },
        {
          imgSrc: "FOMO3D.png",
          text: "FOMO3D",
        },
      ],
    };
  },
  methods: {
    Jump(item) {
      if ("path" in item) {
        this.$router.push(item.path);
      }else{
        this.flag = true;
        setTimeout(()=>this.flag = false,500)
      }
    },
  },
  mounted(){
    this.loading = true;
    setTimeout(()=>this.loading = false,1500)
  }
};
</script>

<style lang="scss" scoped>
.BigBox {
  min-height: 100%;
  background-color: #f3f3f3;
  position: relative;
  .smaller {
    height: 100%;
    position: relative;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 10px 0;
      background-color: #fff;
      li {
        width: 25%;
        height: 85px;
        padding: 10px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        img {
          width: 60px;
          height: 40px;
        }
        p {
          margin-top: 10px;
          font-size: 14px;
          color: #3878ff;
        }
      }
    }
    ol {
      padding: 20px 10px 0px;
      box-sizing: border-box;
      overflow: auto;
      li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        .left,
        .right {
          width: 46%;
          padding: 10px;
          box-sizing: border-box;
          background-color: #fff;
          border-radius: 10px;
          .img {
            height: 150px;
            img {
              width: 100%;
              height: 100%;
              display: block;
              border-radius: 10px;
            }
          }
          .first {
            font-size: 16px;
            margin: 5px 0;
          }
          .second {
            font-size: 12px;
            margin-bottom: 5px;
          }
          .grey {
            font-size: 12px;
            color: #b6b6b6;
          }
          .orange {
            font-size: 12px;
            color: #f65301;
            .size {
              font-size: 18px;
            }
          }
          .Orangeyellow {
            color: #cd935a;
          }
        }
      }
    }
    .wait {

      top: 50%;
      left: 50%;
      width: 150px;
      height: 50px;
      position: fixed;
      color: #fff;
      text-align: center;
      border-radius: 10px;
      letter-spacing: 5px;
      line-height: 50px;
      transform: translate(-50%, -50%);
      background-color: rgba(#000000, 0.5);
    }
  }
}
</style>