<template>
  <div class="login">
    <h2>Login</h2>
    <v-container>
      <v-form method="POST">
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
        <v-btn sub elevation="2">Login</v-btn>
      </v-form>
    </v-container>
    <p>
      Not registered yet? Sign in here:
      <router-link to="/register">Register</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      usernameRules: [(input: string) => !!input],
      passwordRules: [(input: string) => !!input],
    };
  },
});
</script>
