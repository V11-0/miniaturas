import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import UserModule from '@/store/modules/UserModule';

const store = new Vuex.Store({
  modules: {
    UserModule
  }
});

export default store;