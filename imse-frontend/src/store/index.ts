import { API_URL } from '@/Api_Url';
import axios from 'axios';
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
  },
  actions: {
  },
  modules: {
  },
  getters: {
    async isLoggedIn(state) {
      try {
        return (await axios.post(`${API_URL}/logged_in`, { username: state.username, token: state.token })).data.loggedIn;
      }
      catch (err) {
        return false;
      }
    }
  }
})
