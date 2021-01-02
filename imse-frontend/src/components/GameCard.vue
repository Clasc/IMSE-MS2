<template>
  <v-card width="200">
    <v-img
      lazy-src="https://picsum.photos/id/11/10/6"
      src="https://picsum.photos/200"
      min-height="200"
      min-width="200"
    />
    <span class="game-title">Title</span>
    <span class="game-price">3.44€</span>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
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
