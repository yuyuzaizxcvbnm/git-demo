<template>
  <div class="login">
    <div class="logo animate__animated animate__fadeIn"></div>
    <div class="weui-cells animate__animated animate__bounceIn">
      <div class="inputBox">
        <div class="img">
          <img src="@/assets/username.png" />
        </div>
        <input type="text" v-model="username" placeholder="请输入用户名" />
        <div
          class="clear"
          v-show="username.length"
          @click="del('username')"
        ></div>
      </div>
      <div class="inputBox">
        <div class="img">
          <img src="@/assets/password.png" />
        </div>
        <input type="password" v-model="password" placeholder="请输入密码" />
        <div
          class="clear"
          v-show="password.length"
          @click="del('password')"
        ></div>
      </div>
      <div class="inputBox">
        <div class="img">
          <img src="@/assets/code.png" />
        </div>
        <input type="text" v-model="Code" placeholder="图片验证码" />
        <div class="code" @click="chandleCode">
          <img :src="CodeSrc" />
        </div>
        <div class="clear" v-show="Code.length" @click="del('Code')"></div>
      </div>
    </div>
    <div class="info animate__animated animate__bounceIn" @click="useLogin">
      登录
    </div>
    <div class="forget animate__animated animate__bounceIn">忘记密码？</div>
    <div class="questions animate__animated animate__bounceIn">
      <span class="blues">注册账号</span>
      |
      <span class="blues">遇到问题</span>
    </div>
    <my-loading :showflag="flag"></my-loading>
  </div>
</template>

<script>
import urlList from "@/common/url";
import Vue from "vue";
import { Toast, Field } from "vant";

Vue.use(Toast);
Vue.use(Field);
export default {
  data() {
    return {
      username: "",
      password: "",
      Code: "",
      CodeSrc: "",
      flag: false,
    };
  },
  created() {
    this.chandleCode();
  },
  mounted(){
    let authCode = sessionStorage.getItem('authCode');
    let username = this.$Decrypt(sessionStorage.getItem('nickName'));
    let password = this.$Decrypt(sessionStorage.getItem('password'));
    if(authCode == '1'){
      this.username = username;
      this.password = password;
    }
  },
  methods: {
    chandleCode() {
      this.flag = true;
      this.$http.get(urlList.code + Math.random()).then((res) => {
        if (res.status == 200) {
          setTimeout(() => {
            this.flag = false;
          }, 500);
          this.CodeSrc = res.request.responseURL;
        }
      });
    },
    async useLogin() {
      if (this.username == "") {
        return Toast.fail("账号不能为空");
      }
      if (this.password == "") {
        return Toast.fail("密码不能为空");
      }
      if (this.Code == "") {
        return Toast.fail("验证码不能为空");
      }
      // 实现登录：请求后端接口
      const params = new URLSearchParams();
      params.append("nickName", this.username);
      params.append("password", this.password);
      params.append("authCode", this.Code);
      document.cookie = "JSESSIONID=AD05B24560B5AD247D7841591EF25D96";
      const res = await this.$http.post(urlList.login, params, {
        withCredentials: true, //`withCredentials` 表示跨域请求时是否需要使用凭证
      });
      if (res.data.code == 0) {
        this.flag = true;
        setTimeout(() => {
          this.flag = false;
          Toast.success(res.data.msg);
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem('nickName',this.$Encrypt(this.username));
          sessionStorage.setItem('password',this.$Encrypt(this.password));
          sessionStorage.setItem('authCode',1);
          // 获取登录成功后要跳转的路由。
          let redirect = this.$route.query.redirects || "/";
          this.$router.push({
            path: redirect,
          });
        }, 500);
      } else {
        this.flag = true;
        setTimeout(() => {
          this.flag = false;
          Toast.fail(res.data.msg);
          sessionStorage.removeItem('nickName');
          sessionStorage.removeItem('password');
          sessionStorage.setItem('authCode',0);
        }, 500);
      }
    },
    del(value) {
      if (value == "username") {
        this.username = "";
      } else if (value == "password") {
        this.password = "";
      } else {
        this.Code = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  background-color: #f3f3f3;
  position: relative;
  overflow: hidden;
  .logo {
    width: 75px;
    height: 75px;
    margin: 15% auto;
    border-radius: 6px;
    background: url("http://www.szyzit.com:8080/static/img/logo.8df8cad.png")
      no-repeat 0 0/100% 100%;
  }
  .weui-cells {
    width: 90%;
    margin: 0 auto 20px;
    padding: 0 15px;
    background-color: #fff;
    box-sizing: border-box;
    .inputBox {
      height: 29px;
      display: flex;
      padding: 10px 0px;
      position: relative;
      align-items: center;
      border-bottom: 1px solid #f1f1f1;

      .img {
        width: 24px;
        height: 24px;
        margin-right: 25px;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      input {
        flex: 1;
        height: 100%;
        height: 25px;
        font-size: 17px;
        &::-webkit-input-placeholder {
          color: #afcff5;
        }
      }
      // 解决chrome填充表单蓝色背景
      input:-webkit-autofill {
        box-shadow: 0 0 0px 1000px white inset;
        -webkit-text-fill-color: #333;
      }
      .clear {
        top: 50%;
        right: 5px;
        width: 20px;
        height: 20px;
        transform: translateY(-50%);
        position: absolute;
        border-radius: 50%;
        background-color: #b2b2b2;
        &::before,
        &::after {
          content: "";
          top: 50%;
          left: 50%;
          width: 12px;
          height: 1px;
          position: absolute;
          background-color: #fff;
          transform: translate(-50%, -50%) rotate(-45deg);
        }
        &::after {
          transform: translate(-50%, -50%) rotate(45deg);
        }
      }

      &:last-of-type {
        border-bottom: none;
      }
      &:last-of-type .clear {
        right: 70px;
      }
    }
  }
  .info {
    width: 90%;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    margin: 0 auto 40px;
    justify-content: center;
    background-color: #3878ff;
    letter-spacing: 10px;
  }
  .forget {
    width: 90%;
    margin: 0 auto;
    color: #5d88e4;
    text-align: right;
  }
  .blues {
    color: #5d88e4;
  }
  .questions {
    width: 90%;
    margin: 45% auto 0;
    text-align: center;
    color: #d3d9e1;
  }
}
</style>