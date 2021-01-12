<template>
  <div class="home">
    <h2>Welcome to IMSE</h2>
    <h3>
      IMSE Stands for "<span class="leading">I</span>nternet
      <span class="leading">M</span>ultimedia
      <span class="leading">S</span>treaming of
      <span class="leading">E</span>ntertaining Things".
    </h3>
    <p>
      This basically means, that this is a game renting service. If you want to
      get started renting games you have to be signed in!
    </p>
  </div>
</template>

<script lang="ts">
export default {
  name: "Home",
};
</script>

<style scoped>
span.leading {
  font-weight: 900;
  color: #42b983;
}
</style>
