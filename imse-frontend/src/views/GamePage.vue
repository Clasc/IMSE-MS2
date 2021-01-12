<template>
  <div class="rent">
    <v-row>
      <v-col>
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          src="https://picsum.photos/200"
          min-height="600"
          min-width="600"
        />
      </v-col>
      <v-col>
        <span class="game-title">{{game.title}}</span>
        <span class="game-genre">{{game.genre}} game</span>
        <span class="game-price">{{game.price}}€ per day</span>
        <v-container v-if="!loggedIn">
          <span class="text">You have to be logged in to rent a game!</span>
        </v-container>
        <v-container v-if="loggedIn && ableToRent">
          <span class="text">Until when do you want to rent this game?</span>
          <v-form v-on:submit.prevent="rentGame" ref="form">
            <v-date-picker
                name="end_date"
                v-model="end_date"
                :rules="end_dateRules"
                title="Rent Until ..."
                label="end_date*"
                :min="nowDate"
              />
            <div class="error-message">{{ errorMessage }}</div>
            <v-btn elevation="2" type="submit">Rent Game</v-btn>
          </v-form>
        </v-container>
        <v-container v-if="loggedIn && ableToExtend">
          <span class="text">Until when do you want to extend your rent?</span>
          <v-form v-on:submit.prevent="extendRent" ref="form">
            <v-date-picker
                name="end_date_ex"
                v-model="end_date_ex"
                :rules="end_date_exRules"
                title="Extend Until ..."
                label="end_date_ex*"
                :min="startDate"
              />
            <div class="error-message">{{ errorMessage }}</div>
            <v-btn elevation="2" type="submit">Extend Rent</v-btn>
          </v-form>
        </v-container>
        <v-snackbar
          :value="snackbarRent"
          absolute
          color="success"
          outlined
          elevation="24"
        >
          <p>Your rent was successful!</p>
          <p>You will be charged {{price}}€.</p>
          <p>You will be redirected to the games page!</p>
        </v-snackbar>
        <v-snackbar
          :value="snackbarExtension"
          absolute
          color="success"
          outlined
          elevation="24"
        >
          <p>Your extension was successful!</p>
          <p>You will be charged {{price}}€.</p>
          <p>You will be redirected to the games page!</p>
        </v-snackbar>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { API_URL } from "@/Api_Url";
import { Rent } from "../Dtos/Rent";
import store from "@/store";
import axios, { AxiosError } from "axios";
import Vue from "vue";
import Vuetify from "vuetify";

export default Vue.extend({
  name: "Game",
  data () {
    return {
      game: {title: "", game_id: -1, price: 0},
      ableToRent: false,
      ableToExtend: false,
      snackbarRent: false,
      snackbarExtension: false,
      price: 0,
      nowDate: new Date().toISOString().slice(0,10),
      startDate: new Date().toISOString().slice(0,10),

      end_date: "",
      end_dateRules: [(end_date: string) => !!end_date],
      end_date_ex: "",
      end_date_exRules: [(end_date_ex: string) => !!end_date_ex],
      error: ""
    }
  },
  methods: {
    rentGame() {
      let isValid = (this.$refs.form as any).validate();

      if (!isValid) {
        return;
      }

      let rent = <Rent>{
        extended: false,
        start_date: new Date().toISOString().slice(0,10),
        expiration_date: this.end_date,
        username: this.$store.getters.getUsername,
        game_id: this.game.game_id
      };

      axios
        .post(
          `${API_URL}/rentGame`,
          JSON.stringify(rent),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((value: {
          data: { success: boolean; error: string; };
          }) => {
            if (value.data.success) {
              console.log("rented!");
              let now = new Date();
              now.setDate(now.getDate() - 1);
              let end = new Date(rent.expiration_date);
              let daysToRent = (end.getTime() - now.getTime()) / (1000 * 3600 * 24);
              this.price = Math.ceil(daysToRent) * this.game.price;
              this.ableToExtend = true;
              this.ableToRent = false;

              let newStartDate = new Date(rent.expiration_date);
              newStartDate.setDate(newStartDate.getDate() + 1);
              this.startDate = newStartDate.toISOString().slice(0,10);

              this.snackbarRent = true;
              setTimeout(() => this.$router.push("/games"), 4000);
            }
            this.error = value.data.error;
          }
        )
        .catch((err: AxiosError) => {
          this.error = err.response?.data.error;
          console.error("error in backend when renting game!");
        });
    },

    extendRent() {
      let isValid = (this.$refs.form as any).validate();

      if (!isValid) {
        return;
      }

      let rent = <Rent>{
        extended: true,
        start_date: new Date().toISOString().slice(0,10),
        expiration_date: this.end_date_ex,
        username: this.$store.getters.getUsername,
        game_id: this.game.game_id
      };

      axios
        .post(
          `${API_URL}/extendRent`,
          JSON.stringify(rent),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((value: {
          data: { success: boolean; error: string; };
          }) => {
            if (value.data.success) {
              console.log("extended!");
              let now = new Date(this.startDate);
              now.setDate(now.getDate() - 1);
              let end = new Date(rent.expiration_date);
              let daysToRent = (end.getTime() - now.getTime()) / (1000 * 3600 * 24);
              this.price = Math.ceil(daysToRent) * this.game.price;

              let newStartDate = new Date(rent.expiration_date);
              newStartDate.setDate(newStartDate.getDate() + 1);
              this.startDate = newStartDate.toISOString().slice(0,10);
              this.end_date_ex = "";

              this.snackbarExtension = true;
              setTimeout(() => this.$router.push("/games"), 4000);
            }
            this.error = value.data.error;
          }
        )
        .catch((err: AxiosError) => {
          this.error = err.response?.data.error;
          console.error("error in backend when extending game!");
        });
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  mounted () {
    axios
      .post(
        `${API_URL}/getExpirationDate`,
        JSON.stringify({ username: this.$store.getters.getUsername, game_id: this.$route.params.id }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then( response => {
        if (!response.data.date) {
          this.startDate = this.nowDate;
          return;
        }
        let newStartDate = new Date(response.data.date);
        newStartDate.setDate(newStartDate.getDate() + 1);
        this.startDate = newStartDate.toISOString().slice(0,10);
      })
      .catch((err: AxiosError) => {
        console.error(err);
        console.error("error in backend when getting expiration date!");
      });

    axios
      .get(`${API_URL}/games/` + this.$route.params.id)
      .then( response => {
        this.game = response.data.game;
      })
      .catch((err: AxiosError) => {
        console.error("error in backend when getting game!");
      });

    axios
      .post(
        `${API_URL}/ableToRent`,
        JSON.stringify({ username: this.$store.getters.getUsername, game_id: this.$route.params.id }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then( response => {
        this.ableToRent = response.data.ableToRent;
        this.ableToExtend = response.data.ableToExtend;
      })
      .catch((err: AxiosError) => {
        console.error("error in backend when checking if game already rented!");
        this.ableToRent = false;
        this.ableToExtend = false;
      });
  }
});
</script>

<style lang="css" scoped>
.error-list li {
  color: red;
  list-style-type: none;
}

.game-title {
  display: block;
  text-align: center;
  font-weight: bold;
  font-size: 60px;
}

.game-price {
  display: block;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}

.game-genre {
  display: block;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}

.text {
  display: block;
  text-align: center;
  font-size: 20px;
  margin-top: 100px;
}
</style>>