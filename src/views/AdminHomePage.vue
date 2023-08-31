<template>
  <div id="app">
    <v-app id="content" class="font">
    <AdminNotAuth v-if="notoken"/>
    <v-main class="font">
      <AdminNavbar />
      <div class="container">
        <v-row align="center" justify="center" class="m-5 p-5 shadow rounded-3 bg">
          <div>
            <v-card style=" background-color: #e9bba1" color="grey">
              <v-card-text style="background-color: #e9bba1; ">
                <div style="font-size: 30px ;font-weight: bold;">
                  إحصائيات عن المستخدمين
                </div>
              </v-card-text>
            </v-card>
          </div>
          <v-col cols="4">
            <v-card class="carddd">
              <v-card-text>
                <i class="material-icons" style="font-size: 2.5rem; color: #985d4b;"> report </i>
                <div style="font-size: 1.25rem ; font-weight: bold;color:#502b14; margin-top: 5px;">عدد الإبلاغات</div>
                <div style="font-size: 1.25rem ; font-weight: bold;color:#502b14; margin-top: 5px;" class="numbers">{{ this.numberOfReports }} <br /></div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="carddd">
              <v-card-text>
                <i class="material-icons" style="font-size: 2.5rem; color: #985d4b;"> forum </i>
                <div style="font-size: 1.25rem ; font-weight: bold;color:#502b14; margin-top: 5px;" >عدد المحادثات</div>
                <div style="font-size: 1.25rem ; font-weight: bold;color:#502b14; margin-top: 5px;" class="numbers">{{ this.numberOfChats }} <br /></div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">

            <v-card class="carddd">
              <v-card-text>
                <i class="material-icons" style="font-size: 2.5rem; color: #985d4b;"> block </i>
                <div style="font-size: 1.25rem ; font-weight: bold;color:#502b14; margin-top: 5px;">عدد المستخدمين المحظورين</div>
              <div style="font-size: 1.25rem ; font-weight: bold;color:#502b14; margin-top: 5px;" class="numbers">{{ this.numberOfBlocks }}<br /></div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="4">
            <v-card class="carddd">
              <v-card-text>
                <i class="material-icons" style="font-size: 2.5rem; color: #985d4b;"> wifi </i>
                <div style="font-size: 1.25rem ; font-weight: bold;color:#502b14; margin-top: 5px;">عدد المستخدمين المتصلين</div>
                <div style="font-size: 1.25rem ; font-weight: bold;color:#502b14; margin-top: 5px;" class="numbers">{{ this.numberOfOnlineUsers }}<br /></div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="carddd">
              <v-card-text>
                <i class="material-icons" style="font-size: 2.5rem; color: #985d4b;"> app_blocking </i>
                <div style="font-size: 1.25rem ; font-weight: bold;color:#502b14; margin-top: 5px;" >عدد المستخدمين ممنوعين من الدخول</div>
                <div  style="font-size: 1.25rem ; font-weight: bold;color:#502b14; margin-top: 5px;" class="numbers">{{ this.numberOfbannedUsers }}<br /></div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="carddd">
              <v-card-text>
                <i class="material-icons" style="font-size: 2.5rem; color: #985d4b;"> chat </i>
                <div style="font-size: 1.25rem ; font-weight: bold;color:#502b14; margin-top: 5px;">عدد المستخدمين الذين طلبوا بدء محادثة</div>
                <div style="font-size: 1.25rem ; font-weight: bold;color:#502b14; margin-top: 5px;" class="numbers">{{ this.numberOfRequests }}<br /></div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="carddd">
              <v-card-text>
                <i class="material-icons" style="font-size: 2.5rem; color: #985d4b;"> favorite </i>
                <div style="font-size: 1.1rem ; font-weight: bold;color:#502b14; margin-top: 5px;">عدد المستخدمين الذين أحبوا المستخدمين الآخرين</div>
                <div style="font-size: 1.25rem ; font-weight: bold;color:#502b14; margin-top: 5px;" class="numbers">{{ this.numberOffav }}<br /></div>
              </v-card-text>
            </v-card>
          </v-col>

        </v-row>
      </div>
    </v-main>
  </v-app>
  </div>
</template>
<script>
import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar.vue";
import AdminNotAuth from "@/components/AdminNotAuth.vue";
export default {
  components: {
    AdminNavbar,
    AdminNotAuth,
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

<style scoped>
.v-main{
  background-image: url(../assets/date.jpg);
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
}

.bg{
  background-color:  rgba(255,255,255,0.9) !important;
  z-index: 2;
}

.carddd{
  background-color:  rgba(255,255,255,0.9) !important;
  z-index: 2;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  transition: 0.5s;
}
.font{
  font-family: 'Changa', sans-serif;
}
.carddd:hover{
  transform: scale(1.05);}
</style>
