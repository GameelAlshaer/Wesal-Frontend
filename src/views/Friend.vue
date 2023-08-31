<template>
  <v-app  style="direction: rtl">
    <v-main class="font">
    <Navbar />
    <Sidebar />

      <v-container v-if="!error2 && !error">
        <v-row align="center" justify="center" class="my-3 p-5 shadow rounded-3 bg">
          <v-col>
          <v-card style=" background-color: #e9bba1" color="grey">
              <v-card-text style="background-color: #e9bba1; ">
                <div style="font-size: 30px ;font-weight: custom-font; ">
                  قائمة المعجب بهم
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <FriendList v-for="friend in friends" :key="friend.id" :id="friend.id"
            :name="friend.name" :age="friend.age" :user2_id="friend.user_2" :image="friend.user2_image" />
          </v-row>
      </v-container>
      <v-app v-if="error || error2">
        <EmptyPage v-if="error2" :msg="this.msg" :flag="flag" :buttMess="buttMess" :red="red"
          style="margin: 50px !important" />
        <ErrorPage style="margin: 50px !important" v-if="error" />
      </v-app>
    </v-main>
</v-app>
</template>

<script>
import FriendList from "@/components/FriendList.vue";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import ErrorPage from "@/components/ErrorPage.vue";
import EmptyPage from "@/components/EmptyPage.vue";

import axios from "axios";

export default {
  name: "Friend",
  components: {
    Navbar,
    Sidebar,
    FriendList,
    ErrorPage,
    EmptyPage,
  },
  data() {
    return {
      friends: [],
      error: false,
      error2: false,
      msg: null,
      red: null,
      buttMess: null,
      flag: false,
    };
  },
  mounted() {
    // GET request using axios with set headers
    const AuthStr = "Bearer ".concat(localStorage.getItem("usertoken"));
    axios
      .get("http://127.0.0.1:8000/api/getAllFriends", {
        headers: { Authorization: AuthStr },
      })
      .then((response) => {
        this.error = false;
        if (response.data.length === 0) {
          this.error2 = true;
          this.msg = "لا يوجد اي اشخاص قمت بإضافاتهم الي قائمة المعجبين";
        } else {
          this.error2 = false;
          this.friends = response.data;
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          if (error.response.data.message === "Email is not verified") {
            this.msg =
              "يجب ان تقوم بتفعيل اميلك اولا من خلال التحقق من بريدك الإلكتروني";
            this.error2 = true;
          } else if (
            error.response.data.message === "Not all the questions are answered"
          ) {
            this.error2 = true;
            this.msg = "يرجي الإجابة علي كل الأسئلة اولا";
            this.flag = true;
            this.buttMess = "صفحة الاسألة";
            this.red = "questions";
          } else {
            this.error = true;
          }
        }
      });
  },
};
</script>

<style scoped>
.bg {
  background-color: rgba(255, 255, 255, 0.9) !important;
  z-index: 2;
}
.v-main {
  background-image: url(../assets/bb.jpg);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.font {
  font-family: 'Changa', sans-serif;
  /* You can also specify font-weight and other styles here */
}
</style>
