<template>
  <div id="app">
    <v-app>
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
      <div class="all" v-if="noerror">
        <div class="page">
          <h4 class="hp" align="center">{{ this.msgtoshow }}</h4>
          <v-card class="card" v-for="(user, index) in users" :key="index">
            <v-list class="list-style" three-line>
              <template class="back">
                <v-list-item style="max-width: 1300px">
                  <v-list-item-avatar
                    style="width: 80px; height: 70px; border-radius: 50%"
                  >
                    <v-img v-if="!user.image" v-bind:src="img"></v-img>
                    <v-img
                      v-else-if="user.image.includes('http')"
                      v-bind:src="user.image"
                    ></v-img>
                    <v-img
                      v-else-if="!user.image.includes('http')"
                      v-bind:src="`http://127.0.0.1:8000${user.image}`"
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content class="shift">
                    <v-list-item-title class="textt"
                      >الأسم : {{ user.name }}</v-list-item-title
                    >
                    <v-list-item-title class="textt"
                      >العمر : {{ parseInt(user.age) }}</v-list-item-title
                    >
                  </v-list-item-content>
                  <v-btn class="btn" @click="gotouserinfo(user)">
                    المزيد
                  </v-btn>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </div>
      </div>
    </v-app>
  </div>
</template>    
<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import img from "../assets/UserDefaultAvatar.png";
import ErrorPage from "@/components/ErrorPage.vue";
import axios from "axios";
import { VListItem, VListItemTitle } from "vuetify/lib";
export default {
  name: "SearchResult",
  components: {
    Sidebar,
    Navbar,
    ErrorPage,
    "v-list-item": VListItem,
    "v-list-item-title": VListItemTitle,
  },
  props: {
    searchname: null,
    me_vip: null,

    all: null,
    vip: null,
    free: null,
    age: null,
    agenum: null,
    cert: null,
    ban: null,
    bancount: null,
  },
  data() {
    return {
      users: [],
      msgtoshow: "",
      img: img,
      noerror: false,
      checkquestions: false,
      notverified: false,
      notoken: false,
    };
  },
  watch: {
    "$route.params.searchname"() {
      this.gotosearch();
    },
  },

  methods: {
    redirect() {
      this.$router.push({ name: "Login" });
    },
    gotouserinfo(user) {
      let i = user.id;
      this.$router.push({ name: "Userinfo", params: { id: i } });
    },
    gotosearch() {
      if (this.searchname == "") {
        this.msgtoshow = "المستخدمين المرجحين لك";
      } else {
        this.msgtoshow = "الناتج عن بحثك";
      }

      if (!localStorage.getItem("usertoken")) {
        this.notoken = true;
        return;
      }
      const token = "Bearer ".concat(localStorage.getItem("usertoken"));
      if (this.me_vip == 1) {
        if (this.all == true) {
          axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/filter",
            headers: { Authorization: token },
            data: { name: this.searchname },
          })
            .then((response) => {
              this.users = response.data;
              if (response.data.length === 0)
                this.msgtoshow = "لا يوجد مستخدمين";
              this.noerror = true;
            })
            .catch((error) => {
              if (
                error.response.data.message ===
                "Not all the questions are answered"
              ) {
                this.checkquestions = true;
              }
              if (error.response.data.message === "Email is not verified") {
                this.notverified = true;
              }
              return "error occoured";
            });
        } else if (
          this.vip == true &&
          this.age == false &&
          this.certified == false &&
          this.ban == false
        ) {
          axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/filter",
            headers: { Authorization: token },
            data: { name: this.searchname, vip: 1 },
          })
            .then((response) => {
              this.users = response.data;
              if (response.data.length === 0)
                this.msgtoshow = "لا يوجد مستخدمين";
              this.noerror = true;
            })
            .catch((error) => {
              if (
                error.response.data.message ===
                "Not all the questions are answered"
              ) {
                this.checkquestions = true;
              }
              if (error.response.data.message === "Email is not verified") {
                this.notverified = true;
              }
              return "error occoured";
            });
        } else if (
          this.cert == true &&
          this.vip == false &&
          this.age == false &&
          this.ban == false
        ) {
          axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/filter",
            headers: { Authorization: token },
            data: { name: this.searchname, certified: 1 },
          })
            .then((response) => {
              this.users = response.data;
              if (response.data.length === 0)
                this.msgtoshow = "لا يوجد مستخدمين";
              this.noerror = true;
            })
            .catch((error) => {
              if (
                error.response.data.message ===
                "Not all the questions are answered"
              ) {
                this.checkquestions = true;
              }
              if (error.response.data.message === "Email is not verified") {
                this.notverified = true;
              }
              return "error occoured";
            });
        } else if (
          this.age == true &&
          this.vip == false &&
          this.cert == false &&
          this.ban == false
        ) {
          axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/filter",
            headers: { Authorization: token },
            data: { name: this.searchname, age: this.agenum },
          })
            .then((response) => {
              this.users = response.data;
              if (response.data.length === 0)
                this.msgtoshow = "لا يوجد مستخدمين";
              this.noerror = true;
            })
            .catch((error) => {
              if (
                error.response.data.message ===
                "Not all the questions are answered"
              ) {
                this.checkquestions = true;
              }
              if (error.response.data.message === "Email is not verified") {
                this.notverified = true;
              }
              return "error occoured";
            });
        } else if (
          this.age == false &&
          this.vip == false &&
          this.cert == false &&
          this.ban == true
        ) {
          axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/filter",
            headers: { Authorization: token },
            data: { name: this.searchname, ban_count: this.bancount },
          })
            .then((response) => {
              this.users = response.data;
              if (response.data.length === 0)
                this.msgtoshow = "لا يوجد مستخدمين";
              this.noerror = true;
            })
            .catch((error) => {
              if (
                error.response.data.message ===
                "Not all the questions are answered"
              ) {
                this.checkquestions = true;
              }
              if (error.response.data.message === "Email is not verified") {
                this.notverified = true;
              }
              return "error occoured";
            });
        } else if (
          this.age == true &&
          this.vip == false &&
          this.cert == true &&
          this.ban == true
        ) {
          axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/filter",
            headers: { Authorization: token },
            data: {
              name: this.searchname,
              age: this.agenum,
              certified: 1,
              ban_count: this.bancount,
            },
          })
            .then((response) => {
              this.users = response.data;
              if (response.data.length === 0)
                this.msgtoshow = "لا يوجد مستخدمين";
              this.noerror = true;
            })
            .catch((error) => {
              if (
                error.response.data.message ===
                "Not all the questions are answered"
              ) {
                this.checkquestions = true;
              }
              if (error.response.data.message === "Email is not verified") {
                this.notverified = true;
              }
              return "error occoured";
            });
        } else if (
          this.age == true &&
          this.vip == true &&
          this.cert == true &&
          this.ban == true
        ) {
          axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/filter",
            headers: { Authorization: token },
            data: {
              name: this.searchname,
              vip: 1,
              age: this.agenum,
              certified: 1,
              ban_count: this.bancount,
            },
          })
            .then((response) => {
              this.users = response.data;
              if (response.data.length === 0)
                this.msgtoshow = "لا يوجد مستخدمين";
              this.noerror = true;
            })
            .catch((error) => {
              if (
                error.response.data.message ===
                "Not all the questions are answered"
              ) {
                this.checkquestions = true;
              }
              if (error.response.data.message === "Email is not verified") {
                this.notverified = true;
              }
              return "error occoured";
            });
        } else if (
          this.age == false &&
          this.vip == true &&
          this.cert == true &&
          this.ban == false
        ) {
          axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/filter",
            headers: { Authorization: token },
            data: { name: this.searchname, vip: 1, certified: 1 },
          })
            .then((response) => {
              this.users = response.data;
              if (response.data.length === 0)
                this.msgtoshow = "لا يوجد مستخدمين";
              this.noerror = true;
            })
            .catch((error) => {
              if (
                error.response.data.message ===
                "Not all the questions are answered"
              ) {
                this.checkquestions = true;
              }
              if (error.response.data.message === "Email is not verified") {
                this.notverified = true;
              }
              return "error occoured";
            });
        } else if (
          this.age == true &&
          this.vip == false &&
          this.cert == true &&
          this.ban == false
        ) {
          axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/filter",
            headers: { Authorization: token },
            data: { name: this.searchname, age: this.agenum, certified: 1 },
          })
            .then((response) => {
              this.users = response.data;
              if (response.data.length === 0)
                this.msgtoshow = "لا يوجد مستخدمين";
              this.noerror = true;
            })
            .catch((error) => {
              if (
                error.response.data.message ===
                "Not all the questions are answered"
              ) {
                this.checkquestions = true;
              }
              if (error.response.data.message === "Email is not verified") {
                this.notverified = true;
              }
              return "error occoured";
            });
        } else if (
          this.age == false &&
          this.vip == false &&
          this.cert == true &&
          this.ban == true
        ) {
          axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/filter",
            headers: { Authorization: token },
            data: {
              name: this.searchname,
              ban_count: this.bancount,
              certified: 1,
            },
          })
            .then((response) => {
              this.users = response.data;
              if (response.data.length === 0)
                this.msgtoshow = "لا يوجد مستخدمين";
              this.noerror = true;
            })
            .catch((error) => {
              if (
                error.response.data.message ===
                "Not all the questions are answered"
              ) {
                this.checkquestions = true;
              }
              if (error.response.data.message === "Email is not verified") {
                this.notverified = true;
              }
              return "error occoured";
            });
        } else if (
          this.age == true &&
          this.vip == false &&
          this.cert == false &&
          this.ban == false
        ) {
          axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/filter",
            headers: { Authorization: token },
            data: { name: this.searchname, age: this.agenum },
          })
            .then((response) => {
              this.users = response.data;
              if (response.data.length === 0)
                this.msgtoshow = "لا يوجد مستخدمين";
              this.noerror = true;
            })
            .catch((error) => {
              if (
                error.response.data.message ===
                "Not all the questions are answered"
              ) {
                this.checkquestions = true;
              }
              if (error.response.data.message === "Email is not verified") {
                this.notverified = true;
              }
              return "error occoured";
            });
        } else {
          axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/filter",
            headers: { Authorization: token },
            data: { name: this.searchname },
          })
            .then((response) => {
              this.users = response.data;
              if (response.data.length === 0)
                this.msgtoshow = "لا يوجد مستخدمين";
              this.noerror = true;
            })
            .catch((error) => {
              if (
                error.response.data.message ===
                "Not all the questions are answered"
              ) {
                this.checkquestions = true;
              }
              if (error.response.data.message === "Email is not verified") {
                this.notverified = true;
              }
              return "error occoured";
            });
        }
      } else {
        axios({
          method: "post",
          url: "http://127.0.0.1:8000/api/filter",
          headers: { Authorization: token },
          data: { name: this.searchname },
        })
          .then((response) => {
            this.users = response.data;
            if (response.data.length === 0) this.msgtoshow = "لا يوجد مستخدمين";
            this.noerror = true;
          })
          .catch((error) => {
            if (
              error.response.data.message ===
              "Not all the questions are answered"
            ) {
              this.checkquestions = true;
            }
            if (error.response.data.message === "Email is not verified") {
              this.notverified = true;
            }
            return "error occoured";
          });
      }
    },
  },
  mounted() {
    if (!localStorage.getItem("usertoken")) {
      this.notoken = true;
      return;
    }

    if (this.searchname == "") {
      this.msgtoshow = "المستخدمين المرجحين لك";
    } else {
      this.msgtoshow = "الناتج عن بحثك";
    }
    if (!localStorage.getItem("usertoken")) {
      this.error = true;
      return;
    }
    const token = "Bearer ".concat(localStorage.getItem("usertoken"));
    if (this.VIP == 1) {
      if (
        this.banusers == null &&
        this.vipusers == null &&
        this.freeusers == null &&
        this.certusers == null &&
        this.ageusers == null
      ) {
        axios({
          method: "post",
          url: "http://127.0.0.1:8000/api/filter",
          headers: { Authorization: token },
          data: { name: this.searchname },
        })
          .then((response) => {
            this.users = response.data;
            if (response.data.length === 0) this.msgtoshow = "لا يوجد مستخدمين";
            this.noerror = true;
          })
          .catch((error) => {
            ///this.error = true;///

            if (
              error.response.data.message ===
              "Not all the questions are answered"
            ) {
              this.checkquestions = true;
            }
            if (error.response.data.message === "Email is not verified") {
              this.notverified = true;
            }
            return "error occoured";
          });
      } else {
        if (this.banusers != null) {
          axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/filter",
            headers: { Authorization: token },
            data: { name: this.searchname, ban_count: this.bancount },
          })
            .then((response) => {
              this.users = response.data;
              if (response.data.length === 0)
                this.msgtoshow = "لا يوجد مستخدمين";
              this.noerror = true;
            })
            .catch((error) => {
              if (
                error.response.data.message ===
                "Not all the questions are answered"
              ) {
                this.checkquestions = true;
              }
              if (error.response.data.message === "Email is not verified") {
                this.notverified = true;
              }
              return "error occoured";
            });
        } else if (this.freeusers == true) {
          axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/filter",
            headers: { Authorization: token },
            data: { name: this.searchname, vip: 0 },
          })
            .then((response) => {
              this.users = response.data;
              if (response.data.length === 0)
                this.msgtoshow = "لا يوجد مستخدمين";
              this.noerror = true;
            })
            .catch((error) => {
              if (
                error.response.data.message ===
                "Not all the questions are answered"
              ) {
                this.checkquestions = true;
              }
              if (error.response.data.message === "Email is not verified") {
                this.notverified = true;
              }
              return "error occoured";
            });
        } else if (this.vipusers == true) {
          axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/filter",
            headers: { Authorization: token },
            data: { name: this.searchname, vip: 1 },
          })
            .then((response) => {
              this.users = response.data;
              if (response.data.length === 0)
                this.msgtoshow = "لا يوجد مستخدمين";
              this.noerror = true;
            })
            .catch((error) => {
              if (
                error.response.data.message ===
                "Not all the questions are answered"
              ) {
                this.checkquestions = true;
              }
              if (error.response.data.message === "Email is not verified") {
                this.notverified = true;
              }
              return "error occoured";
            });
        } else if (this.certusers == true) {
          axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/filter",
            headers: { Authorization: token },
            data: { name: this.searchname, certified: 1 },
          })
            .then((response) => {
              this.users = response.data;
              if (response.data.length === 0)
                this.msgtoshow = "لا يوجد مستخدمين";
              this.noerror = true;
            })
            .catch((error) => {
              if (
                error.response.data.message ===
                "Not all the questions are answered"
              ) {
                this.checkquestions = true;
              }
              if (error.response.data.message === "Email is not verified") {
                this.notverified = true;
              }
              return "error occoured";
            });
        } else if (this.ageusers != null) {
          axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/filter",
            headers: { Authorization: token },
            data: { name: this.searchname, age: this.age },
          })
            .then((response) => {
              this.users = response.data;
              if (response.data.length === 0)
                this.msgtoshow = "لا يوجد مستخدمين";
              this.noerror = true;
            })
            .catch((error) => {
              if (
                error.response.data.message ===
                "Not all the questions are answered"
              ) {
                this.checkquestions = true;
              }
              if (error.response.data.message === "Email is not verified") {
                this.notverified = true;
              }
              return "error occoured";
            });
        }
      }
    } else {
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/filter",
        headers: { Authorization: token },
        data: { name: this.searchname },
      })
        .then((response) => {
          this.users = response.data;
          if (response.data.length === 0) this.msgtoshow = "لا يوجد مستخدمين";
          this.noerror = true;
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
    }
  },
};
</script>


<style scoped>
.all {
  background-color: white;
}
.page {
  margin-top: 8px;
  background-color: white;
}
.card {
  box-shadow: 5px 5px 5px rgba(255, 98, 101, 1);
  background-color: white;
  margin: 15px;
}
.btn {
  margin-left: auto;
  variant: outline-secondary;
  color: black;
  background-color: grey;
  box-shadow: 0px 6px 0px white;
  border: solid 1px rgba(255, 98, 101, 1);
  border-radius: 30px;
  width: 90px;
}

.shift {
  text-align: right;
  margin-right: 10px;
}
.textt {
  font-weight: bolder;
  font-size: 20px;
  background: white;
  margin-left: 60%;
  direction: rtl;
}
.back {
  background-color: white;
}
.info {
  text-align: right;
  margin: 0 50px 0 20px;
  background: white;
}
</style>