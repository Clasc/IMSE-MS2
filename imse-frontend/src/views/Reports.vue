<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn v-on:click="getRentReport">Report about Rents</v-btn>
      </v-col>
      <v-col>
        <v-btn v-on:click="getSubscriptionReport">Report about Subscriptions</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { API_URL } from "@/Api_Url";
import axios from "axios";
import Vue from "vue";
export default Vue.extend({
  name: "reports",
  methods: {
    async getRentReport() {
      await axios.post(`${API_URL}/report/rent`, {
        username: this.$store.state.username,
        token: this.$store.state.token,
      });
    },

    async getSubscriptionReport() {
      await axios.post(`${API_URL}/report/subscription`, {
        username: this.$store.state.username,
        token: this.$store.state.token,
      });
    },
  },
});
</script>