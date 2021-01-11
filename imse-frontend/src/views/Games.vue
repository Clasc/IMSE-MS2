<template>
  <div class="games">
    <v-row>
      <v-col cols="3" v-for="game in games" :key="game.id">
        <game-card :game="game"></game-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { API_URL } from "@/Api_Url";
import GameCardVue from "@/components/GameCard.vue";
import axios, { AxiosError } from "axios";
import Vue from "vue";
export default Vue.extend({
  name: "Games",
  components: {
    "game-card": GameCardVue,
  },
  data () {
    return {
      games: []
      };
  },
  mounted () {
    axios
      .get(`${API_URL}/games`)
      .then( response => {
        this.games = response.data.games;
      })
      .catch((err: AxiosError) => {
        console.error("error in backend when getting games!");
      });
    }
});
</script>
<style>
</style>