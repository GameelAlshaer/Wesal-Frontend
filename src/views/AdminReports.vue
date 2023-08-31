<template>
  <v-app>
    <AdminNotAuth v-if="notoken"/>
    <v-main class="font">
      <AdminNavbar />
      <v-container>
        <v-row align="center" justify="center" class="m-5 p-5 shadow rounded-3 bg">
          <v-col>
            <v-card style=" background-color: #e9bba1" color="grey">
              <v-card-text style="background-color: #e9bba1; ">
                <div style="font-size: 30px ;font-weight: custom-font; ">
                  قائمة الإبلاغات
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        <Report
          v-for="r in report"
          :key="r.reports.id"
          :id="r.reports.id"
          :num="r.reports.message_id"
          :dateUpdate="r.reports.updated_at"
          :dateCreate="r.reports.created_at"
          :message="r.msg_content"
          :image="r.reports.sender_img"
        />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar.vue";
import AdminNotAuth from "@/components/AdminNotAuth.vue";

import Report from "@/components/AdminRep.vue";
export default {
  name: "AdminReports",
  components: {
    Report,
    AdminNavbar,
    AdminNotAuth,
  },
  data() {
    return {
      report: [],
      len: null,
    };
  },
  mounted() {
    this.reload();
  },
  methods: {
    reload() {
      const AuthStr = "Bearer ".concat(localStorage.getItem("adminToken"));
      // const AuthStr = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpblwvQWRtaW4iLCJpYXQiOjE2MzI4MzIzNTMsImV4cCI6MTYzMzI0Mjc1MywibmJmIjoxNjMyODMyMzUzLCJqdGkiOiJDaHNuWEdTOW5EMGpsdHBoIiwic3ViIjoxMSwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.9QPPCS4tqODVVTmiNQ8_dbtti9fyP_F1TDidla3iKbU");
      axios
        .get("http://127.0.0.1:8000/api/admin/getAllReports", {
          headers: { Authorization: AuthStr },
        })
        .then((response) => {
          // If request is good...
          this.report = response.data[0];
          this.error = false;
          this.len = response.data.msg;
          this.report.forEach((report, i) => {
            if (report.isImg == 1) {
              this.report[i].msg_content = this.report[i].msg_content.includes(
                "http"
              )
                ? this.report[i].msg_content
                : `http://127.0.0.1:8000${this.report[i].msg_content}`;
            }
          });
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
.v-main{
  background-image: url(../assets/date.jpg);
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
}
.bg{
  background-color:  rgba(255,255,255,0.9) !important;
  z-index: 2;
}
.font {
  font-family: 'Changa', sans-serif;
  /* You can also specify font-weight and other styles here */
}
</style>
