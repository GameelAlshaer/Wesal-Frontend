<template>
  <div data-app style="direction: rtl">
    <Navbar />
    <Sidebar />
    <v-main>
      <v-container v-if="!error2 && !error">
        <div id="app">
          <FriendList
            style="margin: 20px !important"
            v-for="friend in friends"
            :key="friend.id"
            :id="friend.id"
            :name="friend.name"
            :age="friend.age"
            :user2_id="friend.user_2"
            :image="friend.user2_image"
          />
        </div>
      </v-container>
      <v-app v-if="error || error2">
        <EmptyPage
          v-if="error2"
          :msg="this.msg"
          :flag="flag"
          :buttMess="buttMess"
          :red="red"
          style="margin: 50px !important"
        />
        <ErrorPage style="margin: 50px !important" v-if="error" />
      </v-app>
    </v-main>
  </div>
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
</style>
