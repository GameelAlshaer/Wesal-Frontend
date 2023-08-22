<template>
  <div data-app>
    <div id="app" style="direction: rtl">
      <Navbar />
      <Sidebar />

      <v-main>
        <v-container v-if="!error2 && !error">
          <v-tabs style="min-width: 200px !important" v-if="!error">
            <v-tab @click="
              all = true;
            sent = true;
            req = true;
            accept = false;
            reject = false;
            callMounted();
            flag_all = true;
            ">كل الطلبات</v-tab>
            <v-tab @click="
              all = true;
            sent = true;
            req = false;
            accept = false;
            reject = false;
            callMounted();
            flag_all = true;
            ">المرسلة</v-tab>
            <v-tab @click="
              all = true;
            sent = false;
            req = true;
            accept = false;
            reject = false;
            callMounted();
            flag_all = true;
            ">المرسلة لي</v-tab>
            <v-tab @click="
              sent = false;
            req = false;
            accept = true;
            reject = false;
            callMounted();
            flag_all = false;
            ">الطلبات المقبولة</v-tab>
            <v-tab @click="
              sent = false;
            req = false;
            accept = false;
            reject = true;
            callMounted();
            flag_all = false;
            ">
              الطلبات المرفوضة</v-tab>
          </v-tabs>
          <div v-if="!error">
            <br />
            <br />
          </div>
          <div v-if="all && sent">
            <h1 id="head" v-if="!error && this.counter !== 0" class="subheader">
              الطلبات الذي ارسلتها
            </h1>
            <RequestsList v-for="request in requests.requests_sent" :id="request.id" :key="request.id" :age="request.age"
              :req_id="request.req_id" :status="request.status" :image="request.image" :name="request.name"
              :count="decCount" />
          </div>
          <div v-if="all && req">
            <h1 v-if="!error && this.counter_dec !== 0" class="subheader" style="margin-top: 50px">
              الطلبات الذي ارسلت إليك
            </h1>

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
        </v-container>

        <EmptyPage v-if="error2 || error3" :msg="this.msg" :flag="flag" :buttMess="buttMess" :red="red"
          style="margin: 50px 200px 50px 200px !important" />
        <v-app v-if="error">
          <ErrorPage style="margin: 50px !important" v-if="error" />
        </v-app>
      </v-main>
    </div>
  </div>
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
.linkStyle {
  background: rgba(0, 0, 0, 0.75) !important;
  padding: 10px 0 20px 0;
  border: 1px solid #111;
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.75);
}

.subheader {
  text-align: center;
  font-size: 40px;
  margin: 30px;
  color: #fe6265 !important;
}

.v-progress-circular {
  margin: 1rem;
}
</style>

