<template>
  <v-container>
    <v-btn v-on:click="getRentReport">Report about Rents</v-btn>
    <v-btn v-on:click="getSubscriptionReport">Report about Subscriptions</v-btn>
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

    getSubscriptionReport() {},
  },
});
</script>