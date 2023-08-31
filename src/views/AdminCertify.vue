<template>
  <div id="app">
    <v-app id="content">
      <AdminNotAuth v-if="notoken"/>
      <v-main class="font"  v-if="!notoken">
        <AdminNavbar />
        <v-container>
          <v-row align="center" justify="center" class="m-5 p-5 shadow rounded-3 bg">
            <v-col>

            <v-card style=" background-color: #e9bba1" color="grey" >
              <v-card-text style="background-color: #e9bba1; ">
                <div style="font-size: 30px ;font-weight: custom-font; ">
                    طلبات التأكيد
                </div>
              </v-card-text>
            </v-card>
            <div>
                <v-card v-for="c in certifies.cert" :key="c.id " class="mt-3 hover mx-auto"
                  style="background-color: white; margin: 15px; direction: rtl"  @click="gotoinfo(c.id)">
                  <v-list class="list-style" three-line>
                    <template>
                      <v-list-item style="max-width: 1300px">
                        <v-list-item-avatar class="imgHover" style="width: 100px; height: 100px; border-radius: 50%">
                          <v-img v-if="!c.image" v-bind:src="img"></v-img>
                          <v-img v-else-if="c.image.includes('http')" v-bind:src="c.image"></v-img>
                          <v-img v-else-if="!c.image.includes('http')"
                            v-bind:src="`http://127.0.0.1:8000${c.image}`"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content style="text-align: right; margin: 0 20px 0 20px">
                          <v-list-item-title class="font_name" style="font-weight: bolder">الاسم : {{ c.name
                          }}</v-list-item-title>
                          <v-list-item-subtitle class="font_age" style="font-weight: bolder">العمر : {{ c.age
                          }}</v-list-item-subtitle>
                        </v-list-item-content>

                        <div class="text-center">
                          <v-dialog v-model="dialog" width="500">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn @click="takeAction(c.id, 1)" style="
                          margin-left: 10px;
                          background-color: green;
                          font-weight: bolder;
                          padding: 0;
                          height: 25px;
                          color: #eeeeee;
                        " depressed>
                                قبول
                              </v-btn>
                              <v-btn v-bind="attrs" v-on="on" style="
                          background-color: red;
                          font-weight: bolder;
                          padding: 0;
                          height: 25px;
                          color: #eeeeee;
                        " depressed>
                                رفض
                              </v-btn>
                            </template>

                            <v-card>
                              <v-card-title class="text-h5">
                                توثيق المستخدم
                              </v-card-title>

                              <v-card-text>
                                قم برفض او قبول توثيق المستخدم
                              </v-card-text>

                              <v-divider></v-divider>

                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="
                                  takeAction(c.id, 2);
                                dialog = false;
                                " style="background-color: #fe6265">
                                  رفض
                                </v-btn>
                                <v-btn @click="dialog = false" color="primary" text style="margin-left: 7px">
                                  إلغاء
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </div>
                      </v-list-item>
                    </template>
                  </v-list>
                </v-card>
                <EmptyPage :msg="this.msg" v-if="this.len" style="margin: 50px !important" />
              </div>
              </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import EmptyPage from "@/components/EmptyPage.vue";
import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar.vue";
import AdminNotAuth from "@/components/AdminNotAuth.vue";
import img from "../assets/UserDefaultAvatar.png";
export default {
  name: "CertifyUser",
  components: {
    AdminNavbar,
    EmptyPage,
    AdminNotAuth,
  },
  data() {
    return {
      img: img,
      msg: "لا يوجد اي بلاغات حتي الأن",
      dialog: false,
      certifies: [],
      len: null,
    };
  },
  mounted() {
    this.reload();
  },
  methods: {
    LoginRe() {
      this.$router.push({ name: "AdminLogin" });
    },
    gotoinfo(idd) {
      this.$router.push({ name: "AdminCertUserinfo", params: { id: idd } });
    },
    redirect() {
      this.$router.push("/userProfile/" + this.sender_id);
    },
    takeAction(id, action) {
      const AuthStr = "Bearer ".concat(localStorage.getItem("adminToken"));
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/admin/adminCertify",
        headers: { Authorization: AuthStr },
        data: {
          id: id,
          action: action, // This is the body part
        },
      });
      this.reload();
    },
    reload() {
      const AuthStr = "Bearer ".concat(localStorage.getItem("adminToken"));
      // const AuthStr = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpblwvQWRtaW4iLCJpYXQiOjE2MzI4MzIzNTMsImV4cCI6MTYzMzI0Mjc1MywibmJmIjoxNjMyODMyMzUzLCJqdGkiOiJDaHNuWEdTOW5EMGpsdHBoIiwic3ViIjoxMSwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.9QPPCS4tqODVVTmiNQ8_dbtti9fyP_F1TDidla3iKbU");
      axios
        .get("http://127.0.0.1:8000/api/admin/getAllNotCertifiedUsers", {
          headers: { Authorization: AuthStr },
        })
        .then((response) => {
          // If request is good...
          this.certifies = response.data;
          this.error = false;
          this.len = response.data.msg;
        })
        .catch(() => {
          this.error = true;
        });
    },
  },
};
</script>

<style scoped>
.v-main {
  background-image: url(../assets/date.jpg);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.btncss{

font-weight: bold;
 font-size: 1rem;
}
.bg {
  background-color: rgba(255, 255, 255, 0.9) !important;
  z-index: 2;
}
.hover{
  transition: transform .5s; /* Animation */
}
.hover:hover{
  transform: scale(1.075);
}
.imgHover{
  transition: transform .5s; /* Animation */
}
.imgHover:hover{
  transform: scale(1.4);
}
.textt{
  font-weight: bold;
   font-size: 1.5rem;
}
.font {
  font-family: 'Changa', sans-serif;
  /* You can also specify font-weight and other styles here */
}
@media screen and (max-width: 1024px) {
  .font_name {
    font-size: 24px;
  }

  .font_age {
    font-size: 20px;
  }
}

@media screen and (max-width: 950px) {
  .font_name {
    font-size: 20px;
  }

  .font_age {
    font-size: 16px;
  }
}

@media screen and (max-width: 650px) {
  .font_name {
    font-size: 18px;
  }

  .font_age {
    font-size: 13px;
  }
}

@media screen and (max-width: 480px) {
  .font_name {
    font-size: 15px;
  }

  .font_age {
    font-size: 11px;
  }
}

@media screen and (max-width: 360px) {
  .font_name {
    font-size: 11px;
  }

  .font_age {
    font-size: 8px;
  }
}
</style>
