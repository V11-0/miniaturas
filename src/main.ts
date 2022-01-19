import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

// Plugin for enabling input masks
import VueMask from 'v-mask';
Vue.use(VueMask);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
