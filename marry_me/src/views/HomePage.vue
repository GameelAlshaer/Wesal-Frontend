<template>
  <v-app>
    <v-main>
      <div class="hp">
        <Navbar />
        <Sidebar />

        <v-app v-if="notoken == true">
          <ErrorPage style="margin: 50px !important" v-if="notoken" />
        </v-app>
        <v-app v-if="notverified == true">
          <div class="text-center" style="margin: 50px !important">
            <v-alert
              text
              prominent
              type="error"
              icon="mdi-cloud-alert"
              style="direction: rtl"
            >
              من فضلك قم باعادة التسجيل الدخول و التحقق من حسابك
            </v-alert>
            <v-btn depressed color="primary" @click="redirect()">
              نسجيل الدخول
            </v-btn>
          </div>
        </v-app>
        <v-app v-if="checkquestions == true">
          <div class="text-center" style="margin: 50px !important">
            <v-alert
              text
              prominent
              type="error"
              icon="mdi-cloud-alert"
              style="direction: rtl"
            >
              من فضلك قم باجابة جميع اسئلتك قبل التصفح
            </v-alert>
            <v-btn depressed color="primary" @click="quizpage()">
              الذهاب للاسئلة
            </v-btn>
          </div>
        </v-app>
        <div v-if="noerror">
          <div v-if="VIP === 0">
            <SlidingCards v-if="noerror" />
          </div>

          <PreferencesList v-if="noerror" />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import PreferencesList from "@/components/PreferencesList.vue";
import SlidingCards from "@/components/SlidingCards.vue";
import axios from "axios";
import ErrorPage from "@/components/ErrorPage.vue";
export default {
  name: "HomePage",
  components: {
    Navbar,
    Sidebar,
    PreferencesList,
    SlidingCards,
    ErrorPage,
  },
  data() {
    return {
      VIP: "",
      noerror: false,
      checkquestions: false,
      notverified: false,
      notoken: false,
      vip: false,
      free: false,
      age: false,
      certified: false,
      bancounts: false,
    };
  },
  methods: {
    redirect() {
      this.$router.push({ name: "Login" });
    },
    quizpage() {
      this.$router.push({ name: "questions" });
    },
  },
  mounted() {
    if (!localStorage.getItem("usertoken")) {
      this.notoken = true;
      return;
    }
    const token = "Bearer ".concat(localStorage.getItem("usertoken"));
    /// const token ='Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjUyNjY3MSwiZXhwIjoxNjMyOTM3MDcyLCJuYmYiOjE2MzI1MjY2NzIsImp0aSI6ImdhVVJYa0hLT0ZTMnZncTQiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.nsz9eFgELtk7uU-IKF_X8RIxkXusIrcjF22bWuhq7l4");///
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/profile",
      headers: { Authorization: token },
    })
      .then((response) => {
        this.noerror = true;
        this.VIP = response.data.VIP;
      })
      .catch((error) => {
        if (
          error.response.data.message === "Not all the questions are answered"
        ) {
          this.checkquestions = true;
        }
        if (error.response.data.message === "Email is not verified") {
          this.notverified = true;
        }
        return "error occoured";
      });
  },
};
</script>

<style scoped>
.hp {
  background-color: white;
}
</style>