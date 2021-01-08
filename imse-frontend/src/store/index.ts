import { API_URL } from '@/Api_Url';
import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
  },
  mutations: {
    setToken(state, token: string) {
      state.token = token;
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    async isLoggedIn(state) {
      return (await axios.post(`${API_URL}/logged_in`, JSON.stringify({ token: state.token }))).data.loggedIn;
    }
  }
})
