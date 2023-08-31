<template>
  <v-main>
    <div class="back font">
      <div class="container">
        <b-navbar toggleable="lg" type="" class=" d-flex justify-content-between poistion-unset color">
          <b-navbar-brand herf="/adminhome"><img src="@/assets/logo.png" alt="logo" width="85"></b-navbar-brand>
          <b-collapse id="nav-collapse" is-nav class="justify-content-end">
            <b-navbar-nav style="color: #bb9276 !important">
              <b-nav-item  href="/adminhome" class="bg-white rounded-2 mx-3 ">
                الصفحة الرئيسية </b-nav-item>
              <b-nav-item  href="" class="bg-white rounded-2 mx-3 ">
                <button type="submit" @click="showUsers()">المستخدمين</button>
              </b-nav-item>
              <b-nav-item  class="color bg-white rounded-2 mx-3 " href="">
                <button type="submit" @click="allReport()">الإبلاغات</button>
              </b-nav-item>
              <b-nav-item  class="bg-white rounded-2 mx-3 " href="">
                <button type="submit" @click="certifyUsers()">طلبات التأكيد</button>
              </b-nav-item>
              <b-nav-item class="bg-white rounded-2 mx-3 " href="">
                <button class="color" type="submit" @click="adminquestions()">إعداد الأسئلة</button>
              </b-nav-item>

            </b-navbar-nav>

          </b-collapse>

        </b-navbar>
      </div>
    </div>
    <div class="fixed-icon">
      <i type="submit" @click="logout()" class="material-icons">logout</i>

    </div>
  </v-main>
</template>

<script>
import axios from "axios";
import { faFolder, faList } from "@fortawesome/free-solid-svg-icons";
export default {
  data() {
    return {
      VIP: "",
      dosearch: false,
      search: "",
      users: [],
      catg: "بحث من خلال..",
      banusers: null,
      vipusers: null,
      freeusers: null,
      certusers: null,
      ageusers: null,
      age: 20,
      bancount: 1,
    };
  },
  computed: {
    folder() {
      return faFolder;
    },
    list() {
      return faList;
    },
  },

  methods: {
    homeAdmin() {
      this.$router.push("/AdminHomePage");
    },
    showUsers() {
      this.$router.push("/adminuserslist");
    },
    allReport() {
      this.$router.push("/All_Reports");
    },
    certifyUsers() {
      this.$router.push("/certifyUsers");
    },
    adminquestions() {
      this.$router.push("/adminquestions");
    },

    logout() {
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/logout/Admin",
        headers: {
          Authorization: `${"Bearer"} ${localStorage.getItem("adminToken")}`,
        },
      })
        .then(() => {
          alert("You are logged out..");

          localStorage.clear();
          this.$router.push("/Adminlogin");
        })
        .catch(() => {
          return "error occoured";
          //return to login page
        });
    },
  },

  mounted() { },
};
</script>
<style scoped>
.back {
  background-color: rgba(187, 146, 118,0.75);

}
.color{
  color: rgba(187, 146, 118,1) !important;
}
.font{
  font-family: 'Changa', sans-serif;
}
.fixed-icon {
  position: fixed;
  bottom: 1rem;
  /* Adjust the distance from the bottom */
  left: 1rem;
  /* Adjust the distance from the right */
  background-color: rgba(187, 146, 118);
  /* Adjust the background color */
  color: #ffffff;
  /* Adjust the icon color */
  width: 3rem;
  /* Set equal width and height for circle shape */
  height: 3rem;
  /* Set equal width and height for circle shape */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s, transform 0.3s;
  /* Add transition effects */
}

/* Hover effect */
.fixed-icon:hover {
  background-color: rgba(179, 103, 74);
  /* Change background color on hover */
  transform: scale(1.1);
  /* Enlarge the icon on hover */
}</style>