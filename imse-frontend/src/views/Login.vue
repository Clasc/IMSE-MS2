<template>
  <div class="login">
    <h2>Login</h2>
    <div v-if="loggedIn">You Are already logged in!!</div>
    <v-btn type="button" v-on:click="logout">Log out</v-btn>
    <v-container v-if="!loggedIn">
      <v-form v-on:submit.prevent="submitLogin" ref="form">
        <v-row>
          <v-col cols="12">
            <v-text-field
              name="username"
              v-model="username"
              :rules="usernameRules"
              title="Username"
              label="Username*"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              name="password"
              type="password"
              v-model="password"
              :rules="passwordRules"
              title="Password"
              label="Password*"
            />
          </v-col>
        </v-row>
        <div class="error-message">{{ errorMessage }}</div>
        <v-btn elevation="2" type="submit">Login</v-btn>
      </v-form>
    </v-container>
    <p>
      Not registered yet? Sign in here:
      <router-link to="/register">Register</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { API_URL } from "@/Api_Url";
import store from "@/store";
import axios from "axios";
import Vue from "vue";
export default Vue.extend({
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      usernameRules: [(input: string) => !!input],
      passwordRules: [(input: string) => !!input],
    };
  },
  computed: {
    async loggedIn() {
      return await this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout() {
      store.commit("setToken", "");
      store.commit("setUsername", "");
    },

    submitLogin() {
      let isValid = (this.$refs.form as any).validate();

      if (!isValid) {
        return;
      }

      axios
        .post(
          `${API_URL}/login`,
          JSON.stringify({ username: this.username, password: this.password }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(
          (value: {
            data: { success: boolean; error: string; token: string };
          }) => {
            if (value.data.success) {
              alert("logged in as!" + this.username);
              store.commit("setToken", value.data.token);
              store.commit("setUsername", this.username);
            }
            this.errorMessage = value.data.error;
          }
        )
        .catch(() => {
          this.errorMessage =
            "There was an internal server Error. Please try again later";
          console.error("error in backend when registering user!");
        });
    },
  },
});
</script>
