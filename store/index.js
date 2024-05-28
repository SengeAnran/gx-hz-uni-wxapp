import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user"; // 用户
import getters from "./getters";

Vue.use(Vuex); //vue的插件机制

const store = new Vuex.Store({
  state: {},
  modules: {
    user,
  },
  getters: {
    ...getters,
  }
});

export default store;
