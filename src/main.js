import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import 'animate.css';
import 'vant/lib/index.css';
import '@/reset/reset.less'
import "@/font/iconfont.css" //引入字体图标
import axios from 'axios'
import vueAxios from 'vue-axios'
Vue.use(vueAxios, axios);
Vue.config.productionTip = false;
import Vant from 'vant';
Vue.use(Vant);

import MyLoading from "@/components/MyLoading.vue"
Vue.component('MyLoading', MyLoading);

const CryptoJS = require('crypto-js');  //引用AES源码js
const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量
//加密方法
Vue.prototype.$Encrypt = function Encrypt(word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}
//解密方法
Vue.prototype.$Decrypt = function Decrypt(word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
