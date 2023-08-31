<template>
  <div id="app" class="font">
    <v-app v-if="notoken == true">
      <ErrorPage style="margin: 50px !important" v-if="notoken" />
    </v-app>
    <v-app v-if="notverified == true">
      <div class="text-center" style="margin: 50px !important">
        <v-alert text prominent type="error" icon="mdi-cloud-alert" style="direction: rtl">
          من فضلك قم باعادة التسجيل الدخول و التحقق من حسابك
        </v-alert>
        <v-btn depressed color="primary" @click="redirect()">
          نسجيل الدخول
        </v-btn>
      </div>
    </v-app>
    <v-app v-if="checkquestions == true">
      <div class="text-center" style="margin: 50px !important">
        <v-alert text prominent type="error" icon="mdi-cloud-alert" style="direction: rtl">
          من فضلك قم باجابة جميع اسئلتك قبل التصفح
        </v-alert>
        <v-btn depressed color="primary" @click="quizpage()">
          الذهاب للاسئلة
        </v-btn>
      </div>
    </v-app>

    <v-app id="content" class="font">
      <v-main>
        <Navbar />
        <Sidebar />
        <v-container>
          <v-row align="center" justify="center" class="my-5 mx-1 p-5 shadow rounded-3 bg">
            <div v-if="!notoken">
              <div v-if="noerror">
                <v-col>
                  <v-card style=" background-color: #e9bba1" color="grey">
                    <v-card-text style="background-color: #e9bba1; ">
                      <div style="font-size: 30px ;font-weight: custom-font; ">
                        بيانات المستخدم
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col>

                  <div class="page">
                    <v-row>
                      <v-col cols="5" class="">
                        <div style="width: 200px;height: 200px;border-radius: 50%;">
                <v-img id="img" :src="useravatar" class="w-100 ">
              </v-img>
              </div>
                      </v-col>

                      <v-col col="5">

                        <div>
                          <v-list>
                            <h6 class="" align="center" style="font-weight: bolder">
                            البيانات الشخصية
                        </h6>
                            <v-list-item-title style="font-size: 20px">
                              الاسم :
                              <v-list-item-subtitle style="font-size: 15px; display: inline">
                                {{ Name }}
                              </v-list-item-subtitle>
                            </v-list-item-title>
                          </v-list>
                        </div>
                        <v-list>
                          <v-list-item-title style="font-size: 20px">رقم التليفون :
                            <v-list-item-subtitle style="font-size: 15px; display: inline">
                              {{ PhoneNumber }}
                            </v-list-item-subtitle>
                          </v-list-item-title>
                        </v-list>
                        <v-list>
                          <v-list-item-title style="font-size: 20px">تاريخ الميلاد :
                            <v-list-item-subtitle style="font-size: 15px; display: inline">
                              {{ BirthDay }}
                            </v-list-item-subtitle>
                          </v-list-item-title>
                        </v-list>
                        <v-list>
                          <v-list-item-title style="font-size: 20px">البريد:
                            <v-list-item-subtitle style="font-size: 15px; display: inline">
                              {{ Email }}
                            </v-list-item-subtitle>
                          </v-list-item-title>
                        </v-list>
                        <v-list>
                          <v-list-item-title style="font-size: 20px">
                            النوع :
                            <v-list-item-subtitle style="font-size: 15px; display: inline">
                              {{ Gender }}
                            </v-list-item-subtitle>
                          </v-list-item-title>
                        </v-list>
                        <v-list>
                          <v-list-item-title style="font-size: 20px">
                            عدد مرات الابلاغ :
                            <v-list-item-subtitle style="font-size: 15px; display: inline">
                              {{ NumberOfReports }}
                            </v-list-item-subtitle>
                          </v-list-item-title>
                        </v-list>
                        <v-list>
                          <v-list-item-title style="font-size: 20px">
                            عدد مرات الحظر :
                            <v-list-item-subtitle style="font-size: 15px; display: inline">
                              {{ NumberOfBans }}
                            </v-list-item-subtitle>
                          </v-list-item-title>
                        </v-list>
                        <v-list>
                          <v-list-item-title style="font-size: 20px" v-if="vip === 1">
                            المستخدم
                            <v-list-item-subtitle style="font-size: 15px; display: inline" v-if="vip === 1">
                              VIP
                            </v-list-item-subtitle>
                          </v-list-item-title>
                        </v-list>
                        <v-list>
                          <v-list-item-title style="font-size: 20px">
                            المستخدم
                            <v-list-item-subtitle style="font-size: 15px; display: inline" v-if="Certified === 1">
                              مصرح حسابه
                            </v-list-item-subtitle>
                            <v-list-item-subtitle style="font-size: 15px; display: inline" v-else>
                              ليس مصرح حسابه
                            </v-list-item-subtitle>
                            <v-icon v-if="Certified" style="font-size: 20px; display: inline"
                              color="#FF6265">mdi-check-circle
                            </v-icon>
                          </v-list-item-title>
                        </v-list>
                      </v-col>

                      <v-col>
                        <h6 class="font-italic mt-3" align="center" style="font-weight: bolder">
                          اسئلة عن المستخدم
                        </h6>
                        <div class="list" v-for="(data, index) in info" :key="index">
                          <div v-if="data[1][0].hidden == 0">
                            <v-list>
                              <v-list-item-title style="font-size: 20px">
                                السؤال :
                                <v-list-item-subtitle style="font-size: 15px; display: inline">
                                  :{{ data[0][0].question }}
                                </v-list-item-subtitle>
                              </v-list-item-title>
                            </v-list>
                            <v-list>
                              <v-list-item-title style="font-size: 20px">
                                اجابة المستخدم :
                                <v-list-item-subtitle style="font-size: 15px; display: inline">:{{ data[2][0].answer
                                }}</v-list-item-subtitle>
                              </v-list-item-title>
                            </v-list>
                          </div>
                        </div>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col>
                        <v-alert v-if="donerchat" type="success" color="green" align="center" dismissible
                          @click="rerchat()">
                          {{ msg }}
                        </v-alert>
                        <v-alert v-if="donefav" type="success" color="green" dismissible @click="refav()">
                          {{ msg }}
                        </v-alert>

                        <v-alert v-if="doneschat" type="success" color="green" dismissible @click="reschat()">
                          <v-row align="center">
                            <v-col> هل انت متاكد من بدء المحادثة؟ </v-col>
                            <v-col class="shrink">
                              <v-btn color="darkgreen" @click="gochat()">بدء المحادثة</v-btn>
                            </v-col>
                          </v-row>
                        </v-alert>
                        <v-alert v-if="errorrchat" type="warning" color="#FF6265" align="center" dismissible
                          @click="rerchat()">
                          {{ msg }}
                        </v-alert>
                        <v-alert v-if="errorfav" type="warning" color="#FF6265" dismissible @click="refav()">
                          {{ msg }}
                        </v-alert>
                        <v-alert v-if="errorschat" type="warning" color="#FF6265" dismissible @click="reschat()">
                          {{ msg }}
                        </v-alert>
                      </v-col>
                      <v-col>
                        <div class="b">
                          <button v-if="me_vip === 1" class="btns-logo" title="بدء المحادثة" @click="startchat(ID)">
                            <font-awesome-icon style="
                          color: #fe6265;
                          font-size: 50px;
                          margin-left: 4px;
                        " :icon="startChat" />
                          </button>
                          <button v-else class="btns-logo" title="ارسال طلب المحادثة" @click="requestchat(ID)">
                            <font-awesome-icon style="
                          color: #fe6265;
                          font-size: 50px;
                          margin-left: 4px;
                        " :icon="startChat" />
                          </button>
                          <button class="btns-logo" title="اضافة الي المفضلين" @click="addtofavs(ID)">
                            <font-awesome-icon style="
                          color: #fe6265;
                          font-size: 50px;
                          margin-left: 4px;
                        " :icon="fav" />
                          </button>
                        </div>
                      </v-col>
                    </v-row>

                  </div>
                </v-col>

              </div>


            </div>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar.vue";

import Sidebar from "@/components/Sidebar.vue";
import img from "../assets/UserDefaultAvatar.png";
import ErrorPage from "@/components/ErrorPage.vue";
import { faHeart, faComment, faBan } from "@fortawesome/free-solid-svg-icons";
export default {
  name: "Userinfo",
  components: {
    Navbar,
    Sidebar,
    ErrorPage,
  },
  data() {
    return {
      noerror: false,
      checkquestions: false,
      notverified: false,
      notoken: false,
      avatarurl: null,
      userId: this.$route.params.id,
      url: img,
      file: "",
      ID: null,
      Name: "",
      Email: "",
      PhoneNumber: "",
      BirthDay: "",
      Gender: "",
      NumberOfReports: "",
      NumberOfBans: "",
      Certified: "",
      vip: "",
      CurrentlyBanned: "",
      currentID: "",
      me_vip: "",
      info: [],
      donefav: false,
      donerchat: false,
      doneschat: false,
      errorrchat: false,
      errorfav: false,
      errorschat: false,
      msg: "",
    };
  },
  computed: {
    fav() {
      return faHeart;
    },
    startChat() {
      return faComment;
    },
    block() {
      return faBan;
    },
    useravatar() {
      if (!this.avatarurl) return this.url;
      if (!this.avatarurl.includes("http"))
        return `http://127.0.0.1:8000${this.avatarurl}`;

      return this.avatarurl;
    },
  },

  methods: {
    redirect() {
      this.$router.push({ name: "Login" });
    },
    quizpage() {
      this.$router.push({ name: "questions" });
    },
    refav() {
      this.donefav = false;
      this.errorfav = false;
      this.msg = "";
    },
    rerchat() {
      this.donerchat = false;
      this.errorrchat = false;
      this.msg = "";
    },
    gochat() {
      this.doneschat = false;
      this.errorschat = false;
      this.msg = "";
      this.$router.push({ name: "Chat" });
    },
    reschat() {
      this.doneschat = false;
      this.errorschat = false;
      this.msg = "";
    },
    previewImage() {
      this.url = URL.createObjectURL(this.file);
      this.useravatar();
    },
    addtofavs(id) {
      const token = "Bearer ".concat(localStorage.getItem("usertoken"));
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/addFriend",
        headers: { Authorization: token },
        params: { recevier_id: id },
      })
        .then(() => {
          ///alert("تم اضافة الي قائمة المفضلين");///
          this.msg = "تم اضافة المستخدم الي قائمة المفضلين";
          this.donefav = true;
        })
        .catch(() => {
          this.errorfav = true;
          this.msg = "لقد قمت باضافة المستخدم من قبل..";
          ///  alert("لقد قمت باضافة المستخدم من قبل.."); ///
          return "error occoured";
        });
    },
    startchat(id) {
      const token = "Bearer ".concat(localStorage.getItem("usertoken"));
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/startchat",
        headers: { Authorization: token },
        params: { userid2: id },
      })
        .then(() => {
          this.doneschat = true;
          this.msg = "يمكنم الان بدء المحادثة";
          /// alert("You can start chat now");
          ///
        })
        .catch((error) => {
          if (error.response.status == 400) {
            /// alert("you have to choose user to start chat with");///
            this.errorschat = true;
            this.msg = "عليك اختيار مستخدم لبدء المحادثة ";
          } else if (error.response.status == 403) {
            ///alert("this user blocked you, cannot send msg");///
            this.errorschat = true;
            this.msg = "هذا المستخدم قام بحذ لك..لا يمن ان تبدء المحادثة معه ";
          } else if (error.response.status == 404) {
            /// alert("No user with this info to start chat with");///
            this.errorschat = true;
            this.msg = "لا يوجد معلومات عن هذا المستخدم ";
          } else if (error.response.status == 405) {
            // alert("can not send more than 4 msgs to this account or you may dont have access to this chat");///
            this.errorschat = true;
            this.msg =
              "لقد قمت بالرسال اكثر من 4 رسائل او لا يمكنك ارسال رسالة لهذا المستخدم";
          } else alert("you cannot start chat..");
          return "error occoured";
        });
    },
    requestchat(id) {
      const token = "Bearer ".concat(localStorage.getItem("usertoken"));
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/request",
        headers: { Authorization: token },
        data: { recevier: id },
      })
        .then(() => {
          this.msg = "تم ارسال طلب محادثة للمستخدم";
          this.donerchat = true;
        })
        .catch(() => {
          this.errorrchat = true;
          this.msg = "لقد قمت بالرسال طلب محادثة من قبل";
          /// alert("لقد قمت بالرسال طلب محادثة من قبل")///
          return "error occoured";
        });
    },
  },
  mounted() {
    if (!localStorage.getItem("usertoken")) {
      this.notoken = true;
      return;
    }
    const token = "Bearer ".concat(localStorage.getItem("usertoken"));
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/profile",
      headers: { Authorization: token },
    })
      .then((response) => {
        this.noerror = true;
        this.me_vip = response.data.VIP;
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
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/getUser",
      headers: { Authorization: token },
      data: { id: this.userId },
    }).then((response) => {
      this.ID = response.data.id;
      this.Name = response.data.name;
      this.Email = response.data.email;
      this.PhoneNumber = response.data.phone;
      this.BirthDay = response.data.birth_day;
      this.Gender = response.data.gender;
      this.avatarurl = response.data.image;
      this.NumberOfReports = response.data.reports;
      this.NumberOfBans = response.data.ban_count;
      this.Certified = response.data.certified;
      this.vip = response.data.VIP;
    });
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/show-user",
      headers: { Authorization: token },
      params: { user_id: this.userId },
    }).then((response) => {
      this.info = response.data;

      //// this.questions = response.data.questions;
      this.answers = response.data.answers; ///
    });
  },
};
</script>
<style scoped>
.font {
  font-family: 'Changa', sans-serif;
  /* You can also specify font-weight and other styles here */
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
</style>
