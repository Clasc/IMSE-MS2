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
        </v-container>
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
      nowDate: new Date().toISOString().slice(0,10),
      price: 0,

      end_date: "",
      end_dateRules: [(end_date: string) => !!end_date],
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
              let end = new Date(rent.expiration_date);
              let daysToRent = (end.getTime() - now.getTime()) / (1000 * 3600 * 24);
              alert("rented game for " + Math.ceil(daysToRent * this.game.price) + "€!");
              this.ableToExtend = true;
              this.ableToRent = false;
            }
            this.error = value.data.error;
          }
        )
        .catch((err: AxiosError) => {
          this.error = err.response?.data.error;
          console.error("error in backend when renting game!");
        });
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  mounted () {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    this.nowDate = date.toISOString().slice(0,10);

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