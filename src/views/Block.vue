<template>
  <v-app id="app" style="direction: rtl">
    <v-main class="font">
    <Navbar />
    <Sidebar />

      <v-container v-if="!error2 && !error">
        <v-row align="center" justify="center" class="my-3 p-5 shadow rounded-3 bg">
          <v-col>
          <v-card style=" background-color: #e9bba1" color="grey">
              <v-card-text style="background-color: #e9bba1; ">
                <div style="font-size: 30px ;font-weight: custom-font; ">
                  قائمة المحظورين
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <BlockList
            style="margin: 20px !important"
            v-for="block in blocks"
            :key="block.id"
            :id="block.id"
            :name="block.name"
            :age="block.age"
            :blocked_id="block.blocked_id"
            :image="block.blocked_image"
          />
        </v-row>
      </v-container>
      <div v-if="error || error2">
        <EmptyPage
          v-if="error2"
          :msg="this.msg"
          :flag="flag"
          :buttMess="buttMess"
          :red="red"
          style="margin: 50px !important"
        />
        <ErrorPage style="margin: 50px !important" v-if="error" />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import BlockList from "@/components/BlockList.vue";
import ErrorPage from "@/components/ErrorPage.vue";
import Navbar from "@/components/Navbar.vue";
import EmptyPage from "@/components/EmptyPage.vue";
import Sidebar from "@/components/Sidebar.vue";
import axios from "axios";

export default {
  name: "Block",
  components: {
    Navbar,
    Sidebar,
    BlockList,
    ErrorPage,
    EmptyPage,
  },
  data() {
    return {
      blocks: [],
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
      .get("http://127.0.0.1:8000/api/getAllBlocks", {
        headers: { Authorization: AuthStr },
      })
      .then((response) => {
        this.error = false;
        if (response.data.length === 0) {
          this.error2 = true;
          this.msg = "لا يوجد اي اشخاص قمت بحظرهم";
        } else {
          this.error2 = false;
          this.blocks = response.data;
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
.v-main {
  background-image: url(../assets/bb.jpg);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.bg {
  background-color: rgba(255, 255, 255, 0.9) !important;
  z-index: 2;
}
.font {
  font-family: 'Changa', sans-serif;
  /* You can also specify font-weight and other styles here */
}
</style>
