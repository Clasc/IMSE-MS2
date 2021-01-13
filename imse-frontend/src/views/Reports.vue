<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-date-picker
          name="start_date"
          v-model="start_date"
          :rules="start_date_Rules"
          title="From"
          label="start_date*"
        />
      </v-col>
      <v-col cols="6">
        <v-date-picker
          name="end_date"
          v-model="end_date"
          :rules="end_date_Rules"
          title="Until"
          label="end_date*"
          :min="start_date"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-btn v-on:click="getRentReport">Report about Rents</v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn v-on:click="getStudioReport">Report about Studios</v-btn>
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
  data() {
    return {
      start_date: new Date().toISOString().slice(0, 10),
      end_date: new Date().toISOString().slice(0, 10),

      start_date_Rules: [(startDate: string) => !!startDate],
      end_date_Rules: [(endDate: string) => !!endDate],
    };
  },
  methods: {
    async getRentReport() {
      let response = await axios.post(`${API_URL}/report/rent`, {
        username: this.$store.state.username,
        token: this.$store.state.token,
        start_date: this.start_date,
        end_date: this.end_date,
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.csv");
      document.body.appendChild(link);
      link.click();
    },

    async getStudioReport() {
      let response = await axios.post(`${API_URL}/report/studio`, {
        username: this.$store.state.username,
        token: this.$store.state.token,
        start_date: this.start_date,
        end_date: this.end_date,
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.csv");
      document.body.appendChild(link);
      link.click();
    },
  },
});
</script>