<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <!--<span>{{ this.message }}</span>-->

              <!--  <a href="#">
                <v-img src="@/assets/logo.png" alt="vuetify components logo" contain height="200" />
              </a> -->
              <h3 style="font-size: 20px; margin-top: 2rem">
                للتحقق من بريدك الإلكتروني اضغط هنا
              </h3>
              <v-btn @click="verify" style="
                  margin-top: 3rem;
                  background-color: #bb9276;
                  color: white;
                  border-radius: 5px;
                " type="submit" x-large block>التحقق من البريد الإلكتروني</v-btn>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center" no-gutters>
          <v-col cols="12" sm="6" md="5">
            <v-alert type="success" v-show="this.alert" style="margin-top: 4rem; text-align: center" dark>
              تم التحقق من بريدك الإلكتروني بنجاح
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  name: "verifyemail",
  data: () => ({
    alert: false,
    email: "",
    message: "",
    error: "",
  }),

  methods: {
    verify() {
      const AuthStr = "Bearer ".concat(localStorage.getItem("usertoken"));
      axios({
        method: "get",
        url:
          "http://127.0.0.1:8000/api/verify-email/" +
          this.$route.params.id +
          "/" +
          this.$route.params.hash +
          "?expires=" +
          this.$route.query.expires +
          "&signature=" +
          this.$route.query.signature,
        headers: { Authorization: AuthStr },
      }).then((response) => {
        this.alert = true;

        this.message = response.data.message;

        this.$router.push({ name: "questions" });
      });
    },
  },
};
</script>

<style lang="css" scoped>
div.row.no-gutters.justify-center {
  width: 65rem;
  margin-right: -2rem;
}

div.v-alert.v-sheet.theme--dark.tomato {
  background-color: #ff6265;
  width: 25rem;
}

div.col-sm-6.col-md-5.col-12 {
  margin-right: 7rem;
}
</style>
