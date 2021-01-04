import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
console.log(process.env.API_URL);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
