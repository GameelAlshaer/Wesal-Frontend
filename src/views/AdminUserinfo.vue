<template>
  <div id="app">
    <v-app id="content" class="font">
      <AdminNotAuth v-if="notoken"/>
      <v-main>
        <AdminNavbar />
        <v-container>
          <v-row align="center" justify="center" class="m-5 p-5 shadow rounded-3 bg">
            <div v-if="!notoken">
              <v-col>

                <v-card style=" background-color: #e9bba1" color="grey">
                  <v-card-text style="background-color: #e9bba1; ">
                    <div style="font-size: 30px ;font-weight: custom-font; ">
                      بيانات المستخدم
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <div class="page">
                <v-row>
                  <v-col cols="2">
                    <v-img :src="useravatar" id="img" style="width: 150px;height: 150px; border-radius: 50%;">
                    </v-img>
                  </v-col>
                  <v-col cols="5">
                    <v-list>
                      <h6 class="mt-3" align="center" style="font-weight: bolder">
                        معلومات شخصية عن المستخدم
                      </h6>
                      <v-list-item-title style="font-size: 1.10rem; align: right">
                        الاسم :
                        <v-list-item-subtitle style="font-size: 1rem; display: inline">
                          {{ Name }}
                        </v-list-item-subtitle>
                      </v-list-item-title>
                    </v-list>

                    <v-list>
                      <v-list-item-title style="font-size: 1.10rem; align: right">رقم التليفون :
                        <v-list-item-subtitle style="font-size: 1rem; display: inline">
                          {{ PhoneNumber }}
                        </v-list-item-subtitle>
                      </v-list-item-title>
                    </v-list>
                    <v-list>
                      <v-list-item-title style="font-size: 1.10rem; align: right">تاريخ الميلاد :
                        <v-list-item-subtitle style="font-size: 1rem; display: inline">
                          {{ BirthDay }}
                        </v-list-item-subtitle>
                      </v-list-item-title>
                    </v-list>
                    <v-list>
                      <v-list-item-title style="font-size: 1.10rem; align: right">البريد:
                        <v-list-item-subtitle style="font-size: 1rem; display: inline">
                          {{ Email }}
                        </v-list-item-subtitle>
                      </v-list-item-title>
                    </v-list>
                    <v-list>
                      <v-list-item-title style="font-size: 1.10rem; align: right">
                        النوع :
                        <v-list-item-subtitle style="font-size: 1rem; display: inline">
                          {{ Gender }}
                        </v-list-item-subtitle>
                      </v-list-item-title>
                    </v-list>
                    <v-list>
                      <v-list-item-title style="font-size: 1.10rem; align: right">
                        عدد مرات الابلاغ :
                        <v-list-item-subtitle style="font-size: 1rem; display: inline">
                          {{ NumberOfReports }}
                        </v-list-item-subtitle>
                      </v-list-item-title>
                    </v-list>
                    <v-list>
                      <v-list-item-title style="font-size: 1.10rem; align: right">
                        عدد مرات الحظر :
                        <v-list-item-subtitle style="font-size: 1rem; display: inline">
                          {{ NumberOfBans }}
                        </v-list-item-subtitle>
                      </v-list-item-title>
                    </v-list>
                    <v-list>
                      <v-list-item-title style="font-size: 1.10rem; align: right" v-if="vip === 1">
                        المستخدم
                        <v-list-item-subtitle style="font-size: 1rem; display: inline" v-if="vip === 1">
                          VIP
                        </v-list-item-subtitle>
                      </v-list-item-title>
                    </v-list>
                    <v-list>
                      <v-list-item-title style="font-size: 1.10rem; align: right">
                        المستخدم
                        <v-list-item-subtitle style="font-size: 1rem; display: inline; align: right"
                          v-if="Certified === 1">
                          مصرح حسابه
                        </v-list-item-subtitle>
                        <v-list-item-subtitle style="font-size: 1rem; display: inline; align: right"
                          v-if="Certified === 0">
                          ليس مصرح حسابه
                        </v-list-item-subtitle>
                        <v-icon v-if="Certified" style="font-size: 1.10rem; display: inline"
                          color="#FF6265">mdi-check-circle
                        </v-icon>
                      </v-list-item-title>
                    </v-list>
                  </v-col>
                  <v-col cols="5">

                    <div class="list p-3 bg-white" v-for="(data, index) in info" :key="index">
                      <div v-if="data[1][0].hidden == 0">
                        <v-list>
                          <h6 class="mt-3" align="center" style="font-weight: bolder">
                            اسئلة عن المستخدم
                          </h6>
                          <v-list-item-title style="font-size: 1.10rem">
                            السؤال :
                            <v-list-item-subtitle style="
                              font-size: 15px;
                              display: inline;
                              display: inline;
                            ">
                              :{{ data[0][0].question }}
                            </v-list-item-subtitle>
                          </v-list-item-title>
                        </v-list>
                        <v-list>
                          <v-list-item-title style="font-size: 1.10rem">
                            اجابة المستخدم :
                            <v-list-item-subtitle style="
                              font-size: 15px;
                              display: inline;
                            ">:{{ data[2][0].answer }}</v-list-item-subtitle>
                          </v-list-item-title>
                          <v-alert v-if="deleted" type="success" color="#FF6265" align="center" dismissible
                            @click="gotolistofuser()">
                            تم مسح الحساب
                          </v-alert>
                          <v-alert v-if="dodelete" type="info" color="#FF6265" dismissible @click="recheck()">
                            <v-row align="center">
                              <v-col> هل انت متاكد من مسح حساب هذا المستخدم؟ </v-col>
                              <v-col class="shrink">
                                <v-btn color="#FF6265" @click="deleteuser()">مسح الحساب</v-btn>
                              </v-col>
                            </v-row>
                          </v-alert>

                          <div class="b">
                            <span class="mt-3" align="center" style="font-size: 20px; color: rgba(255, 98, 101, 1)">مسح
                              حساب
                              المستخدم</span>
                            <button rounded="circle" class="btns-logo" title="مسح حساب المستخدم" @click="gotodelete()">
                              <font-awesome-icon style="
                          color: #fe6265;
                          font-size: 3rem;
                        " :icon="remove" />
                            </button>
                          </div>
                        </v-list>
                      </div>
                    </div>

                  </v-col>
                </v-row>

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
import img from "../assets/UserDefaultAvatar.png";
import AdminNavbar from "@/components/AdminNavbar.vue";
import AdminNotAuth from "@/components/AdminNotAuth.vue";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
export default {
  name: "AdminUserinfo",
  components: {
    AdminNavbar,
    AdminNotAuth,
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
.font {
  font-family: 'Changa', sans-serif;
  /* You can also specify font-weight and other styles here */
}

.v-main {
  background-image: url(../assets/date.jpg);
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