<template>
  <v-card width="200" v-on:click="openGamePage">
    <v-img
      lazy-src="https://picsum.photos/id/11/10/6"
      src="https://picsum.photos/200"
      min-height="200"
      min-width="200"
    />
    <span class="game-title">{{game.title}}</span>
    <span class="game-price">{{game.price}}€</span>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    game: Object as () => {game_id:number, price:number, title:string}
  },
  methods: {
    openGamePage() {
      this.$router.push("/game/" + this.game.game_id);
    }
  }
});
</script>

<style scoped>
.game-title {
  display: block;
  text-align: center;
  font-weight: bold;
}

.game-price {
  display: block;
  text-align: center;
  font-weight: bold;
}
</style>>
