<template>
  <div id="app">
    <v-app id="content">
      <v-app v-if="notoken">
        <div class="text-center" style="margin: 50px !important">
          <v-alert
            text
            prominent
            type="error"
            icon="mdi-cloud-alert"
            style="direction: rtl"
          >
            لقد انتهت مدة صلاحيتك للتصفح داخل الموقع يرجي تسجيل الدخول مرة اخري.
          </v-alert>
          <v-btn depressed color="primary" @click="redirect()">
            نسجيل الدخول
          </v-btn>
        </div>
      </v-app>
      <div v-if="!notoken">
        <AdminNavbar />
        <h4 class="mt-3" align="center" style="color: rgba(255, 98, 101, 1)">
          بيانات عن المستخدم
        </h4>
        <v-divider dark></v-divider>
        <div class="page">
          <v-container grid-list-xl>
            <v-layout row justify-space-between>
              <v-row>
                <v-col>
                  <v-img
                    :src="useravatar"
                    id="img"
                    rounded
                    class="my-auto mx-5"
                    max-height="25%"
                    max-width="15%"
                  >
                  </v-img>
                </v-col>
                <v-col class="list">
                  <h6
                    class="font-italic mt-3"
                    align="center"
                    style="font-weight: bolder"
                  >
                    معلومات شخصية عن المستخدم
                  </h6>
                  <v-list>
                    <v-list-item-title style="font-size: 20px; align: right">
                      الاسم :
                      <v-list-item-subtitle
                        style="font-size: 15px; display: inline"
                      >
                        {{ Name }}
                      </v-list-item-subtitle>
                    </v-list-item-title>
                  </v-list>
                  <v-list>
                    <v-list-item-title style="font-size: 20px; align: right"
                      >رقم التليفون :
                      <v-list-item-subtitle
                        style="font-size: 15px; display: inline"
                      >
                        {{ PhoneNumber }}
                      </v-list-item-subtitle>
                    </v-list-item-title>
                  </v-list>
                  <v-list>
                    <v-list-item-title style="font-size: 20px; align: right"
                      >تاريخ الميلاد :
                      <v-list-item-subtitle
                        style="font-size: 15px; display: inline"
                      >
                        {{ BirthDay }}
                      </v-list-item-subtitle>
                    </v-list-item-title>
                  </v-list>
                  <v-list>
                    <v-list-item-title style="font-size: 20px; align: right"
                      >البريد:
                      <v-list-item-subtitle
                        style="font-size: 15px; display: inline"
                      >
                        {{ Email }}
                      </v-list-item-subtitle>
                    </v-list-item-title>
                  </v-list>
                  <v-list>
                    <v-list-item-title style="font-size: 20px; align: right">
                      النوع :
                      <v-list-item-subtitle
                        style="font-size: 15px; display: inline"
                      >
                        {{ Gender }}
                      </v-list-item-subtitle>
                    </v-list-item-title>
                  </v-list>
                  <v-list>
                    <v-list-item-title style="font-size: 20px; align: right">
                      عدد مرات الابلاغ :
                      <v-list-item-subtitle
                        style="font-size: 15px; display: inline"
                      >
                        {{ NumberOfReports }}
                      </v-list-item-subtitle>
                    </v-list-item-title>
                  </v-list>
                  <v-list>
                    <v-list-item-title style="font-size: 20px; align: right">
                      عدد مرات الحظر :
                      <v-list-item-subtitle
                        style="font-size: 15px; display: inline"
                      >
                        {{ NumberOfBans }}
                      </v-list-item-subtitle>
                    </v-list-item-title>
                  </v-list>
                  <v-list>
                    <v-list-item-title
                      style="font-size: 20px; align: right"
                      v-if="vip === 1"
                    >
                      المستخدم
                      <v-list-item-subtitle
                        style="font-size: 15px; display: inline"
                        v-if="vip === 1"
                      >
                        VIP
                      </v-list-item-subtitle>
                    </v-list-item-title>
                  </v-list>
                  <v-list>
                    <v-list-item-title style="font-size: 20px; align: right">
                      المستخدم
                      <v-list-item-subtitle
                        style="font-size: 15px; display: inline; align: right"
                        v-if="Certified === 1"
                      >
                        مصرح حسابه
                      </v-list-item-subtitle>
                      <v-list-item-subtitle
                        style="font-size: 15px; display: inline; align: right"
                        v-if="Certified === 0"
                      >
                        ليس مصرح حسابه
                      </v-list-item-subtitle>
                      <v-icon
                        v-if="Certified"
                        style="font-size: 20px; display: inline"
                        color="#FF6265"
                        >mdi-check-circle
                      </v-icon>
                    </v-list-item-title>
                  </v-list>
                </v-col>
                <v-col align="center">
                  <v-divider vertical></v-divider>
                </v-col>
                <v-col>
                  <h6
                    class="font-italic mt-3"
                    align="center"
                    style="font-weight: bolder"
                  >
                    اسئلة عن المستخدم
                  </h6>
                  <div class="list" v-for="(data, index) in info" :key="index">
                    <div v-if="data[1][0].hidden == 0">
                      <v-list>
                        <v-list-item-title style="font-size: 20px">
                          السؤال :
                          <v-list-item-subtitle
                            style="
                              font-size: 15px;
                              display: inline;
                              display: inline;
                            "
                          >
                            :{{ data[0][0].question }}
                          </v-list-item-subtitle>
                        </v-list-item-title>
                      </v-list>
                      <v-list>
                        <v-list-item-title style="font-size: 20px">
                          اجابة المستخدم :
                          <v-list-item-subtitle
                            style="
                              font-size: 15px;
                              display: inline;
                              display: inline;
                            "
                            >:{{ data[2][0].answer }}</v-list-item-subtitle
                          >
                        </v-list-item-title>
                      </v-list>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-alert
                    v-if="deleted"
                    type="success"
                    color="#FF6265"
                    align="center"
                    dismissible
                    @click="gotolistofuser()"
                  >
                    تم مسح الحساب
                  </v-alert>
                  <v-alert
                    v-if="dodelete"
                    type="info"
                    color="#FF6265"
                    dismissible
                    @click="recheck()"
                  >
                    <v-row align="center">
                      <v-col> هل انت متاكد من مسح حساب هذا المستخدم؟ </v-col>
                      <v-col class="shrink">
                        <v-btn color="#FF6265" @click="deleteuser()"
                          >مسح الحساب</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-alert>
                </v-col>
                <v-col>
                  <div class="b">
                    <span
                      class="mt-3"
                      align="center"
                      style="font-size: 20px; color: rgba(255, 98, 101, 1)"
                      >مسح حساب المستخدم</span
                    >
                    <button
                      rounded="circle"
                      class="btns-logo"
                      title="مسح حساب المستخدم"
                      @click="gotodelete()"
                    >
                      <font-awesome-icon
                        style="
                          color: #fe6265;
                          font-size: 50px;
                          margin-left: 4px;
                        "
                        :icon="remove"
                      />
                    </button>
                  </div>
                </v-col>
              </v-row>
            </v-layout>
          </v-container>
        </div>
      </div>
    </v-app>
  </div>
</template>


<script>
import axios from "axios";
import img from "../assets/UserDefaultAvatar.png";
import AdminNavbar from "@/components/AdminNavbar.vue";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
export default {
  name: "AdminUserinfo",
  components: {
    AdminNavbar,
  },
  data() {
    return {
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
      info: [],
      dodelete: false,
      deleted: false,
    };
  },
  computed: {
    remove() {
      return faTimes;
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
      this.$router.push({ name: "AdminLogin" });
    },
    gotodelete() {
      this.dodelete = true;
    },
    recheck() {
      this.dodelete = false;
    },
    gotolistofuser() {
      this.$router.push({ name: "AdminUserList" });
    },
    deleteuser() {
      if (!localStorage.getItem("adminToken")) {
        this.notoken = true;
        return;
      }
      const token = "Bearer ".concat(localStorage.getItem("adminToken"));
      /// const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpblwvQWRtaW4iLCJpYXQiOjE2MzMyMTgxMjEsImV4cCI6MTYzMzYyODUyMSwibmJmIjoxNjMzMjE4MTIxLCJqdGkiOiJKU3Q5MWV6MmF6T1Jya2k1Iiwic3ViIjoxMSwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.GdVUWDKV2HdvkH1LI0iQeCwb-fJ6jKQo9pdIVR4rjKY");///

      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/admin/banningFakeUser",
        headers: { Authorization: token },
        params: { user_id: this.ID },
      })
        .then(() => {
          this.deleted = true;
        })
        .catch(() => {
          return "error occoured";
        });
    },
    previewImage() {
      this.url = URL.createObjectURL(this.file);
      this.useravatar();
    },
  },
  mounted() {
    if (!localStorage.getItem("adminToken")) {
      this.notoken = true;
      return;
    }
    const tokenn = "Bearer ".concat(localStorage.getItem("adminToken"));
    ///const tokenn ='Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpblwvQWRtaW4iLCJpYXQiOjE2MzMyMTgxMjEsImV4cCI6MTYzMzYyODUyMSwibmJmIjoxNjMzMjE4MTIxLCJqdGkiOiJKU3Q5MWV6MmF6T1Jya2k1Iiwic3ViIjoxMSwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.GdVUWDKV2HdvkH1LI0iQeCwb-fJ6jKQo9pdIVR4rjKY");///
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/getUserbyID",
      headers: { Authorization: tokenn },
      params: { id: this.userId },
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
      url: "http://127.0.0.1:8000/api/getUserQues",
      headers: { Authorization: tokenn },
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
.btns-logo {
  margin-right: 4px;
  background-color: rgb(211, 211, 211);
  variant: outline-secondary;
  color: black;
  border-radius: 40%;
  border: 0;
  height: 60px;
  width: 60px;
}
.btns-logo:hover {
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.05);
  transform: scale(1.05);
  background-color: rgb(211, 211, 211);
  color: grey;
  border-radius: 40%;
  variant: outline-secondary;
  cursor: pointer;
  font-size: 12px;
}
.page {
  background-color: white;
  background-color: #ffffff;
  flex-direction: column;
}
.d {
}
#img {
  border-radius: 50%;
  border: solid 2px #ff6265;
  max-width: 200px;
  max-height: 200px;
  background-color: white;
  margin-right: 2px;
  position: absolute;
  right: 0;
}
.btns-logo {
  margin-right: 1px;
  background-color: white;
  variant: outline-secondary;
  color: black;
  border-radius: 40%;
  border: 0;
  height: 60px;
  width: 60px;
}
.btns-logo:hover {
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.05);
  transform: scale(1.02);
  background-color: white;
  color: grey;
  border-radius: 40%;
  variant: outline-secondary;
  cursor: pointer;
  font-size: 12px;
}
.list {
  direction: rtl;
  align: right;
  text-align: right;
  align-text: right;
}
.page {
}
.b {
  margin-left: 20%;
}
.title {
  margin-top: 5px;
}
.carddd {
  display: inline-block;
  width: 200px;
  height: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
}
.numbers {
  margin-top: 10px;
  font-weight: bold;
  font-family: "Arial";
  font-size: 2rem;
}
</style>