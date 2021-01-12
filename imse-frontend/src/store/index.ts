import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    username: "",
  },
  mutations: {
    setToken(state, token: string) {
      state.token = token;
    },

    setUsername(state, username: string) {
      state.username = username;
    },

    logout(state) {
      state.token = "";
      state.username = "";
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token && !!state.username;
    },
    getUsername(state) {
      return state.username;
    }
  }
})
