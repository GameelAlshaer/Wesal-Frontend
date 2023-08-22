<template>
  <v-app style="direction: rtl">
    <AdminNavbar />
    <v-main>
      <v-container>
        <v-card
          v-for="c in certifies.cert"
          :key="c.id"
          style="background-color: white; margin: 15px; direction: rtl"
          class="mx-auto"
          @click="gotoinfo(c.id)"
        >
          <v-list class="list-style" three-line>
            <template>
              <v-list-item style="max-width: 1300px">
                <v-list-item-avatar
                  style="width: 80px; height: 70px; border-radius: 50%"
                >
                  <v-img v-if="!c.image" v-bind:src="img"></v-img>
                  <v-img
                    v-else-if="c.image.includes('http')"
                    v-bind:src="c.image"
                  ></v-img>
                  <v-img
                    v-else-if="!c.image.includes('http')"
                    v-bind:src="`http://127.0.0.1:8000${c.image}`"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content
                  style="text-align: right; margin: 0 20px 0 20px"
                >
                  <v-list-item-title
                    class="font_name"
                    style="font-weight: bolder"
                    >الأسم : {{ c.name }}</v-list-item-title
                  >
                  <v-list-item-subtitle
                    class="font_age"
                    style="font-weight: bolder"
                    >العمر : {{ c.age }}</v-list-item-subtitle
                  >
                </v-list-item-content>

                <div class="text-center">
                  <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        @click="takeAction(c.id, 1)"
                        style="
                          margin-left: 10px;
                          background-color: green;
                          font-weight: bolder;
                          padding: 0;
                          height: 25px;
                          color: #eeeeee;
                        "
                        depressed
                      >
                        قبول
                      </v-btn>
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        style="
                          background-color: red;
                          font-weight: bolder;
                          padding: 0;
                          height: 25px;
                          color: #eeeeee;
                        "
                        depressed
                      >
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
                        <v-btn
                          @click="
                            takeAction(c.id, 2);
                            dialog = false;
                          "
                          style="background-color: #fe6265"
                        >
                          رفض
                        </v-btn>
                        <v-btn
                          @click="dialog = false"
                          color="primary"
                          text
                          style="margin-left: 7px"
                        >
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
        <EmptyPage
          :msg="this.msg"
          v-if="this.len"
          style="margin: 50px !important"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import EmptyPage from "@/components/EmptyPage.vue";
import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar.vue";
import img from "../assets/UserDefaultAvatar.png";
export default {
  name: "CertifyUser",
  components: {
    AdminNavbar,
    EmptyPage,
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
.list-style {
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  box-shadow: 0 0 20px gray;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;
}

.list-style:hover {
  -webkit-transform: scale(0.9);
  transform: scale(0.9);
  transition: 0.8s;
}
</style>
