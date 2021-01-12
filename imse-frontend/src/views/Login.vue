<template>
  <div class="login">
    <h2>Login</h2>
    <v-container v-if="loggedIn">
      You are already logged in!!
      <v-btn type="button" v-on:click="logout">Log out</v-btn>
    </v-container>
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
      <p>
        Not registered yet? Sign in here:
        <router-link to="/register">Register</router-link>
      </p>
    </v-container>
    <v-snackbar
      :value="snackbar"
      absolute
      centered
      color="success"
      outlined
      elevation="24"
    >
      <p>Logged in as {{this.username}}!</p>
      <p>You will be redirected to the homepage.</p>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { API_URL } from "@/Api_Url";
import store from "@/store";
import axios, { AxiosError } from "axios";
import Vue from "vue";
export default Vue.extend({
  name: "Login",
  data() {
    return {
      username: "",
      snackbar: false,
      password: "",
      errorMessage: "",
      usernameRules: [(input: string) => !!input],
      passwordRules: [(input: string) => !!input],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout() {
      store.commit("logout");
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
              console.log("logged in");
              this.snackbar = true;
              store.commit("setToken", value.data.token);
              store.commit("setUsername", this.username);
              setTimeout(() => this.$router.push("/"), 2000);
            }
            this.errorMessage = value.data.error;
          }
        )
        .catch((err: AxiosError) => {
          this.errorMessage = err.response?.data.error;
          console.error("error in backend when logging in!");
        });
    },
  },
});
</script>
