// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'

import {AjaxPlugin} from 'vux'

import vuex from 'vuex'


Vue.use(AjaxPlugin)


Vue.use(vuex)
import CryptoJS from 'crypto-js'
// des加密
var data = [{id: 1}, {id: 2}]

// Encrypt
var ciphertext = CryptoJS.DES.encrypt(JSON.stringify(data), 'secret key 123');
console.log(ciphertext);

// Decrypt
var bytes  = CryptoJS.DES.decrypt(ciphertext.toString(), 'secret key 123');
var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

console.log(decryptedData);



// 300ms延迟
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
import router from './router'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
