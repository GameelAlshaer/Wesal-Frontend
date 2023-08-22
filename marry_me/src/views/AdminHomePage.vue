<template>
  <v-app>
    <v-main id="content">
      <AdminNavbar />
      
      <v-row style="margin-top: 2rem">
        <div>
          <v-card class="carddd">
            <v-card-text>
              <div>عدد الإبلاغات</div>
              <div class="numbers">{{ this.numberOfReports }} <br /></div>
            </v-card-text>
            <v-card-actions> </v-card-actions>
          </v-card>

          <v-card class="carddd">
            <v-card-text>
              <div style="">عدد المحادثات</div>
              <div class="numbers">{{ this.numberOfChats }} <br /></div>
            </v-card-text>
            <v-card-actions> </v-card-actions>
          </v-card>
          <br />
          <v-card class="carddd">
            <v-card-text>
              <div>عدد المستخدمين المحظورين</div>
              <div class="numbers">{{ this.numberOfBlocks }}<br /></div>
            </v-card-text>
            <v-card-actions> </v-card-actions>
          </v-card>

          <v-card class="carddd">
            <v-card-text>
              <div>عدد المستخدمين المتصلين</div>
              <div class="numbers">{{ this.numberOfOnlineUsers }}<br /></div>
            </v-card-text>
            <v-card-actions> </v-card-actions>
          </v-card>
          <br />
          <v-card class="carddd">
            <v-card-text>
              <div>عدد المستخدمين ممنوعين من الدخول</div>
              <div class="numbers">{{ this.numberOfbannedUsers }}<br /></div>
            </v-card-text>
            <v-card-actions> </v-card-actions>
          </v-card>

          <v-card class="carddd">
            <v-card-text>
              <div>عدد المستخدمين الذين طلبوا بدء محادثة</div>
              <div class="numbers">{{ this.numberOfRequests }}<br /></div>
            </v-card-text>
            <v-card-actions> </v-card-actions>
          </v-card>
          <br />
          <v-card class="carddd">
            <v-card-text>
              <div>عدد المستخدمين الذين أحبوا المستخدمين الآخرين</div>
              <div class="numbers">{{ this.numberOffav }}<br /></div>
            </v-card-text>
            <v-card-actions> </v-card-actions>
          </v-card>
        </div>

        <div>
          <v-card
            style="margin-right: 2rem; background-color: #ffaaab"
            color="grey"
            dark
            max-width="700"
          >
            <v-card-text
              style="
                margin-top: -21rem;
                margin-left: 21rem;
                margin-right: 0rem;
                background-color: #ffaaab;
                height: 200px;
              "
            >
              <div style="margin-top: 4rem" class="text-h4 font-weight-thin">
                إحصائيات عن المستخدمين
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar.vue";
export default {
  components: {
    AdminNavbar,
  },
  data() {
    return {
      numberOffav: "",
      numberOfRequests: "",
      numberOfbannedUsers: "",
      numberOfOnlineUsers: "",
      numberOfBlocks: "",
      numberOfReports: "",
      numberOfChats: "",
    };
  },

  mounted() {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/getNumOfOnlineUsers",
      headers: {
        Authorization: `${"Bearer"} ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((response) => {
        this.numberOfOnlineUsers = response.data.body;
      })
      .catch((error) => {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      });
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/getNumOfChats",
      headers: {
        Authorization: `${"Bearer"} ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((response) => {
        this.numberOfChats = response.data.body;
      })
      .catch((error) => {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      });
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/getNumOfRequests",
      headers: {
        Authorization: `${"Bearer"} ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((response) => {
        this.numberOfRequests = response.data.body;
      })
      .catch((error) => {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      });
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/getNumOfReports",
      headers: {
        Authorization: `${"Bearer"} ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((response) => {
        this.numberOfReports = response.data.body;
      })
      .catch((error) => {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      });
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/getNumOfBannedUsers",
      headers: {
        Authorization: `${"Bearer"} ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((response) => {
        this.numberOfbannedUsers = response.data.body;
      })
      .catch((error) => {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      });
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/getNumOfBlocks",
      headers: {
        Authorization: `${"Bearer"} ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((response) => {
        this.numberOfBlocks = response.data.body;
      })
      .catch((error) => {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      });
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/getNumOfFavs",
      headers: {
        Authorization: `${"Bearer"} ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((response) => {
        this.numberOffav = response.data.body;
      })
      .catch((error) => {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      });
  },
  methods: {},
};
</script>

<style lang="scss">
.carddd {
  display: inline-block;
  width: 200px;
  height: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
}
.numbers {
  margin-top: 10px;
  font-weight: bold;
  font-family: "Arial";
  font-size: 2rem;
}
div.carddd.v-card.v-sheet.theme--light {
  margin-left: -39rem;
  margin-right: 12rem;
}
div.mx-auto.text-center.v-card.v-sheet.theme--dark.green {
  margin-top: -19rem;
}
</style>
