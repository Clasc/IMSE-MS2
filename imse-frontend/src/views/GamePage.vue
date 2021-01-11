<template>
  <div>
    <h2>{{game.title}}</h2>
    <v-banner></v-banner>
    <p>{{ $route.params.id }}</p>
  </div>
</template>

<script lang="ts">
import { API_URL } from "@/Api_Url";
import axios, { AxiosError } from "axios";
import Vue from "vue";
export default Vue.extend({
  name: "Game",
  data () {
    return {game: {title: ""}}
  },
  mounted () {
    axios
      .get(`${API_URL}/games/` + this.$route.params.id)
      .then( response => {
        this.game = response.data.game;
      })
      .catch((err: AxiosError) => {
        console.error("error in backend when getting game!");
      });
  }
});
</script>

<style>
</style>