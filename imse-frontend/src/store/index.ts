import { API_URL } from '@/Api_Url';
import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    username: "",
    isAdmin: false,
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
    async isAdmin(context) {
      await axios.post(`${API_URL}/user/is_admin`, { username: context.state.username, token: context.state.token }).then((value) => {
        context.state.isAdmin = value.data.isAdmin;
      }).catch(() => { context.state.isAdmin = false });
    }
  },
  modules: {
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token && !!state.username;
    }
  }
})
