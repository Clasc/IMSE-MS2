<template>
  <div class="imse-app">
    <v-app>
      <v-navigation app>
        <!-- -->
        <div id="nav">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/login">Login</router-link>
          <router-link to="/helloworld">Vuetify</router-link>
        </div>
      </v-navigation>
      <v-main>
        <v-container>
          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
      </v-main>
      <v-footer app> Here is the footer of IMSE </v-footer>
    </v-app>
  </div>
</template>

<style>
.imse-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0px 5px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
