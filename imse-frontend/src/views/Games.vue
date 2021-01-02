<template>
  <div class="games">
    <v-row>
      <v-col cols="3" v-for="a in 40" :key="a">
        <game-card></game-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import GameCardVue from "@/components/GameCard.vue";
import Vue from "vue";
export default Vue.extend({
  name: "Games",
  components: {
    "game-card": GameCardVue,
  },
});
</script>
<style>
</style>