<template>
  <v-app>
    <v-main >
      <div >
        <Navbar />
        <Sidebar />
        <v-app v-if="notoken === true">
          <ErrorPage style="margin: 50px !important" v-if="notoken" />
        </v-app>
        <v-app v-if="notverified === true">
          <NotVerified style="margin: 50px !important" v-if="notverified" />
        </v-app>
        <v-app v-if="checkquestions === true">
          <GoToQuestions style="margin: 50px !important" v-if="checkquestions" />
        </v-app>
        <div v-if="noerror">
          <div v-if="VIP === 0">
            <SlidingCards v-if="noerror" />
          </div>

          <PreferencesList v-if="noerror" />
        </div>
      </div>
      <!-- <Footer /> -->

    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
// import Footer from "@/components/footer.vue";
import GoToQuestions from "@/components/GoToQuestions.vue";
import Sidebar from "@/components/Sidebar.vue";
import PreferencesList from "@/components/PreferencesList.vue";
import SlidingCards from "@/components/SlidingCards.vue";
import NotVerified from "@/components/NotVerified.vue";
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
    NotVerified,
    GoToQuestions,
    // Footer,
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
</style>