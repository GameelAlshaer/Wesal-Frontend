<template>
  <v-app id="app" style="direction: rtl">
    <v-main class="font">

      <Navbar />
      <Sidebar />

      <v-container v-if="!error2 && !error">

        <v-row align="center" justify="center" class="my-3 p-5 shadow rounded-3 bg">
          <v-tabs class="" style="min-width: 200px !important ;color: #df7656 !important;" v-if="!error">
            <v-tab style="color: #df7656!important; border-color: #df7656; "
              @click="all = true; sent = true; req = true; accept = false; reject = false; callMounted(); flag_all = true;">
              كل الطلبات
            </v-tab>
            <v-tab style="color: #df7656!important; "
              @click="all = true; sent = true; req = false; accept = false; reject = false; callMounted(); flag_all = true;">
              المرسلة
            </v-tab>
            <v-tab style="color: #df7656!important; "
              @click="all = true; sent = false; req = true; accept = false; reject = false; callMounted(); flag_all = true;">
              المرسلة لي
            </v-tab>
            <v-tab style="color: #df7656!important; "
             @click="sent = false; req = false; accept = true; reject = false; callMounted(); flag_all = false;">
              الطلبات المقبولة
            </v-tab>
            <v-tab style="color: #df7656!important; "
             @click="sent = false; req = false; accept = false; reject = true; callMounted(); flag_all = false;">
              الطلبات المرفوضة
            </v-tab>
          </v-tabs>
          <div v-if="!error">

          </div>
          <div v-if="all && sent">
            <h2 id="head" v-if="!error && this.counter !== 0" class="subheader mt-5">
              الطلبات الذي ارسلتها
            </h2>
            <RequestsList v-for="request in requests.requests_sent" :id="request.id" :key="request.id" :age="request.age"
              :req_id="request.req_id" :status="request.status" :image="request.image" :name="request.name"
              :count="decCount" />
          </div>
          <div v-if="all && req">
            <h2 v-if="!error && this.counter_dec !== 0" class="subheader mt-5">
              الطلبات الذي ارسلت إليك
            </h2>

            <RecRequest v-for="request in requests.requests_received" :id="request.id" :sender_id="request.sender_id"
              :status="request.status" :key="request.id" :age="request.age" :image="request.image" :name="request.name"
              :count="reqCount" />
          </div>
          <div v-if="accept">
            <AcceptedRequests v-for="request in requests.requests_received" :id="request.id"
              :sender_id="request.sender_id" :status="request.status" :key="request.id" :age="request.age"
              :image="request.image" :name="request.name" :count="reqCount" />
          </div>
            <div v-if="reject">
              
              <RejectedRequests v-for="request in requests.requests_received" :id="request.id"
                :sender_id="request.sender_id" :status="request.status" :key="request.id" :age="request.age"
                :image="request.image" :name="request.name" :count="reqCount" />
            </div>
        </v-row>
      </v-container>

      <EmptyPage v-if="error2 || error3" :msg="this.msg" :flag="flag" :buttMess="buttMess" :red="red"
        style="margin: 50px 200px 50px 200px !important" />
      <v-app v-if="error">
        <ErrorPage style="margin: 50px !important" v-if="error" />
      </v-app>
    </v-main>
  </v-app>
</template>

<script>
import RequestsList from "@/components/RequestsList.vue";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import RecRequest from "@/components/RecRequest.vue";
import ErrorPage from "@/components/ErrorPage.vue";
import EmptyPage from "@/components/EmptyPage.vue";
import AcceptedRequests from "@/components/AcceptedRequests.vue";
import RejectedRequests from "@/components/RejectedRequests.vue";

import axios from "axios";

export default {
  name: "Request",
  components: {
    Navbar,
    Sidebar,
    RequestsList,
    ErrorPage,
    RecRequest,
    EmptyPage,
    AcceptedRequests,
    RejectedRequests,
  },
  data() {
    return {
      error3: false,
      all: true,
      sent: true,
      req: true,
      accept: false,
      reject: false,
      requests: [],
      error: false,
      flag_all: true,
      counter: 0,
      counter_dec: 0,
      error2: false,
      msg: null,
      red: null,
      buttMess: null,
      flag: false,
    };
  },
  mounted() {
    this.callMounted();
  },
  methods: {
    decCount() {
      //    if(this.counter!==0){
      this.counter--;
      //  }
    },
    reqCount() {
      //   if(this.counter_dec!==0){
      this.counter_dec--;
      //   }
    },
    callMounted() {
      const AuthStr = "Bearer ".concat(localStorage.getItem("usertoken"));
      axios
        .get("http://127.0.0.1:8000/api/getAllRequests", {
          headers: { Authorization: AuthStr },
        })
        .then((response) => {
          // If request is good...
          let l = response.data.requests_received.filter(
            (item) => item.status !== 1 && item.status !== 2
          ).length;
          let r = response.data.requests_received.filter(
            (item) => item.status === 2
          ).length;
          let a = response.data.requests_received.filter(
            (item) => item.status === 1
          ).length;
          this.error = false;
          if (
            response.data.requests_sent.length === 0 &&
            this.all &&
            this.sent
          ) {
            this.error3 = true;
            this.msg = " لا يوجد اي طلبات ارسلتها";
          } else if (l === 0 && this.all && this.req) {
            this.error3 = true;
            this.msg = " لا يوجد اي طلبات ارسلت إليك";
          } else if (a === 0 && this.accept) {
            this.error3 = true;
            this.msg = " لا يوجد اي طلبات قبلتها";
          } else if (r === 0 && this.reject) {
            this.error3 = true;
            this.msg = " لا يوجد اي طلبات رفضتها";
          } else {
            this.error3 = false;
            this.error2 = false;
            this.requests = response.data;
          }

          let filteredItem = response.data.requests_received.filter(
            (item) => item.status !== 1 && item.status !== 2
          );

          this.counter_dec = filteredItem.length;
          this.counter = response.data.requests_sent.length;
        })
        .catch((error) => {
          if (error.response.status === 403) {
            if (error.response.data.message === "Email is not verified") {
              this.msg =
                "يجب ان تقوم بتفعيل اميلك اولا من خلال التحقق من بريدك الإلكتروني";
              this.error2 = true;
            } else if (
              error.response.data.message ===
              "Not all the questions are answered"
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
  },
};
</script>

<style scoped>
.v-tabs{
  color:   unset !important;
}
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
}</style>

