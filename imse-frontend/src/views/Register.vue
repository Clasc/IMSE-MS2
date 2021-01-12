<template>
  <div class="register">
    <h2>Register</h2>
    <p>
      You need to register for renting Games or subscribing to a game Studio
    </p>
    <v-container>
      <v-form v-on:submit.prevent="submitRegistration" ref="form">
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
          <v-col cols="6">
            <v-col cols="12">
              <v-text-field
                name="firstname"
                v-model="firstname"
                :rules="nameRules"
                title="First name"
                label="First name*"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                name="lastname"
                v-model="lastname"
                :rules="nameRules"
                title="Last name"
                label="Last name*"
              />
            </v-col>
          </v-col>
          <v-col cols="6">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="birthday"
                  label="Birthday date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="birthday"
                :max="new Date().toISOString().substr(0, 10)"
                min="1920-01-01"
                @change="save"
              ></v-date-picker>
            </v-menu>
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
        <v-row>
          <v-col>
            <ul class="error-list">
              <li
                class="error-message-container"
                v-for="(error, idx) in errors"
                :key="idx"
              >
                {{ error }}
              </li>
            </ul>
          </v-col>
        </v-row>
        <v-btn elevation="2" type="submit">Create Account</v-btn>
      </v-form>
    </v-container>
    <v-snackbar
      :value="snackbar"
      absolute
      centered
      color="success"
      outlined
      elevation="24"
    >
      <p>You are successfully registered!</p>
      <p>You will be redirected to the homepage.</p>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { API_URL } from "../Api_Url";
import { User } from "../Dtos/User";
import Vuetify from "vuetify";

export default Vue.extend({
  name: "Login",
  data() {
    return {
      menu: false,
      snackbar: false,
      username: "",
      password: "",
      birthday: "",
      firstname: "",
      lastname: "",
      usernameRules: [(uname: string) => !!uname],
      passwordRules: [(pw: string) => !!pw],
      nameRules: [(name: string) => !!name],
      errors: new Array<string>(),
    };
  },
  watch: {
    menu(val) {
      val &&
        setTimeout(() => ((this.$refs.picker as any).activePicker = "YEAR"));
    },
  },
  methods: {
    save(date: string) {
      (this.$refs.menu as any).save(date);
    },
    submitRegistration() {
      let isValid = (this.$refs.form as any).validate();

      if (!isValid) {
        return;
      }

      let user = <User>{
        username: this.username,
        password: this.password,
        birthday: this.birthday,
        first_name: this.firstname,
        last_name: this.lastname,
      };

      axios
        .post(`${API_URL}/register`, JSON.stringify(user), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((value) => {
          if (value.data.success) {
            console.log("registered!");
            this.snackbar = true;
            setTimeout(() => this.$router.push("/"), 2000);
          }
          this.errors = value.data.errors;
        })
        .catch(() => {
          this.errors.push(
            "There was an internal server Error. Please try again later"
          );
          console.error("error in backend when registering user!");
        });
    },
  },
});
</script>

<style lang="css" scoped>
.error-list li {
  color: red;
  list-style-type: none;
}
</style>