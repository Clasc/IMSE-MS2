<template>
  <div class="login">
    <h2>Login</h2>
    <form method="POST">
      <label for="login-username-field">Username*</label>
      <input
        name="username"
        v-model="username"
        required
        title="Username"
        id="login-username-field"
      />
      <label for="login-password-field">Password*</label>
      <input
        name="password"
        v-model="password"
        required
        title="Password"
        id="login-password-field"
      />
      <button type="submit" />
    </form>

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
    };
  },
});
</script>
