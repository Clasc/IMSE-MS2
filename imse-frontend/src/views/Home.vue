<template>
  <div class="home">Welcome to IMSE!</div>
  <h3>
    IMSE Stands for "<span class="leading">I</span>nternet
    <span class="leading">M</span>ultimedia
    <span class="leading">S</span>treaming of
    <span class="leading">E</span>ntertaining things".
  </h3>
  <p>
    This basically means, that this is a Game Renting service. If you want to
    get started renting games you have to be signed in!
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
});
</script>

<style scoped>
span.leading {
  font-weight: 900;
  color: #42b983;
}
</style>
