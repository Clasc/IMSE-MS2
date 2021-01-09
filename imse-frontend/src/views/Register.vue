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
            <v-text-field
              name="firstname"
              v-model="firstname"
              :rules="nameRules"
              title="First name"
              label="First name*"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              name="lastname"
              v-model="lastname"
              :rules="nameRules"
              title="Last name"
              label="Last name*"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-date-picker
              name="birthday"
              v-model="birthday"
              :rules="birthdayRules"
              title="Birthday"
              label="Birthday*"
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
        <v-row>
          <v-col>
            <div class="error-message-container" v-if="errorMessage">
              {{ errorMessage }}
            </div>
          </v-col>
        </v-row>
        <v-btn elevation="2" type="submit">Create Account</v-btn>
      </v-form>
    </v-container>
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
      username: "",
      password: "",
      birthday: "",
      firstname: "",
      lastname: "",
      usernameRules: [(uname: string) => !!uname],
      passwordRules: [(pw: string) => !!pw],
      nameRules: [(name: string) => !!name],
      birthdayRules: [(bday: string) => !!bday],
      errorMessage: "",
    };
  },
  methods: {
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
          }
          this.errorMessage = value.data.error;
        })
        .catch(() => {
          this.errorMessage =
            "There was an internal server Error. Please try again later";
          console.error("error in backend when registering user!");
        });
    },
  },
});
</script>
