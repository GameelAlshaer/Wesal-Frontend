<template>
  <div id="app">
    <v-app id="content" class="font">
      <AdminNotAuth v-if="notoken"/>
      <v-main>
        <AdminNavbar />
        <v-container>
          <v-row v-if="!notoken" align="center" justify="center" class="m-5 p-5 shadow rounded-3 bg">
            <v-col>
            <v-card style=" background-color: #e9bba1" color="grey">
              <v-card-text style="background-color: #e9bba1; ">
                <div style="font-size: 30px ;font-weight: custom-font; ">
                  قائمة المستخدمين
                </div>
              </v-card-text>
            </v-card>
            <div class="d-flex justify-content-around align-items-center">
              <v-checkbox v-model="all" label="جميع المستخدمين"></v-checkbox>  
              <v-checkbox v-model="name" label=" البحث بالاسم "></v-checkbox>
              <input type="text" v-model="searchname" placeholder="   .. ادخل الاسم" size="sm" class="border-1 border-dark"  />
              <v-checkbox v-model="vip" label=" VIP "></v-checkbox>
              <v-checkbox v-model="cert" label=" المصرح حسابهم "></v-checkbox>
              <v-checkbox v-model="female" label=" الاناث ">
              </v-checkbox>
              <v-checkbox v-model="male" label="الذكور  ">
              </v-checkbox>
              <v-btn class="btn " style=" background-color: #e9bba1; font-weight: bold; font-size: large; "  @click="startsearch()"> عرض </v-btn>
            </div>

              <h4 class="hp" align="center">{{ this.title }}</h4>
              <v-card  v-for="(user, index) in users" :key="index" class="mt-3 hover">
                <v-list  :style="getCardStyle(user.gender)" >
                  <v-list-item >
                    <v-list-item-avatar class="imgHover" style="width:100px;height: 100px; border-radius: 50%">
                      <v-img v-if="!user.image" v-bind:src="img"></v-img>
                      <v-img v-else-if="user.image.includes('http')" v-bind:src="user.image"></v-img>
                      <v-img v-else-if="!user.image.includes('http')"
                        v-bind:src="`http://127.0.0.1:8000${user.image}`"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content class="shift">
                      <v-list-item-title :class="`textt`" :style="getListStyle(user.gender)">{{ user.name }}</v-list-item-title>
                      <v-list-item-title class="textt"  style="font-weight: bold; font-size: 1.15rem;">{{ user.gender }}</v-list-item-title>
                      <v-list-item-title class="textt"  style="font-weight: bold; font-size: 1.15rem;">{{ user.age }}</v-list-item-title>
                    </v-list-item-content>
                    <v-btn class="btn btncss"  :style="getBtnStyle(user.gender)" @click="gotouserinfo(user)">
                      المزيد
                    </v-btn>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
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

export default {
  name: "AdminUserList",
  components: {
    AdminNavbar,
    AdminNotAuth,
  },
  data() {
    return {
      users: [],
      catg: "جميع المستخدمين",
      img: img,
      notoken: false,
      filter: false,
      all: false,
      searchname: "",
      name: false,
      female: false,
      gender: false,
      vip: false,
      free: false,
      male: false,
      cert: false,
      c: 0,
      v: 0,
      title: "",
    };
  },
  mounted() {
    if (!localStorage.getItem("adminToken")) {
      this.notoken = true;
      return;
    }
    ///const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpblwvQWRtaW4iLCJpYXQiOjE2MzMyOTUyMTksImV4cCI6MTYzMzcwNTYxOSwibmJmIjoxNjMzMjk1MjE5LCJqdGkiOiJVOFVFNWFmRUxJYTdNams5Iiwic3ViIjoxMSwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.L_xQAe8y2eyhVKGjjTWAdbAAb9hOMgGrPynI6BaI2Bs");///
    const token = "Bearer ".concat(localStorage.getItem("adminToken"));

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/admin/getAllUsersInfo",
      headers: { Authorization: token },
    })
      .then((response) => {
        /// All_Users_info///
        this.users = response.data.All_Users_info;

        this.title = "";
        if (response.data.All_Users_info.length === 0)
          this.title = "لا يوجد مستخدمين";
        this.catg = "جميع المستخدمين";
      })
      .catch(() => {
        return "error occoured";
      });
  },
  methods: {
    getCardStyle(gender) {
      if (gender=="Male") {
        // Even index
        return {
          backgroundColor: "rgba(255, 229, 214, 0.5)",          
        };
      } else {
        // Odd index
        return {
          backgroundColor:"rgba(255, 150, 204,0.25)" ,
        };
      }
    },
    getListStyle(gender){
      if (gender=="Male") {
        return {
          color: "#e05b0e",
        };
      } else {
        return {
          color: "#f281d0",
        };
      }
    },
    getBtnStyle(gender){
      if (gender=="Male") {
        return {
          color: "#e05b0e",
        };
      } else {
        return {
          color: "#f281d0",
        };
      }
    },
    redirect() {
      this.$router.push({ name: "AdminLogin" });
    },
    openfilter() {
      this.filter = !this.filter;
    },
    gotouserinfo(user) {
      let i = user.id;
      this.$router.push({ name: "AdminUserinfo", params: { id: i } });
    },
    startsearch() {
      if (!localStorage.getItem("adminToken")) {
        this.notoken = true;
        return;
      }
      /// const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpblwvQWRtaW4iLCJpYXQiOjE2MzMyOTUyMTksImV4cCI6MTYzMzcwNTYxOSwibmJmIjoxNjMzMjk1MjE5LCJqdGkiOiJVOFVFNWFmRUxJYTdNams5Iiwic3ViIjoxMSwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.L_xQAe8y2eyhVKGjjTWAdbAAb9hOMgGrPynI6BaI2Bs");///
      const token = "Bearer ".concat(localStorage.getItem("adminToken"));
      if (this.free == true && this.vip == true) this.all = true;
      if (this.all) {
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/admin/getAllUsersInfo",
          headers: { Authorization: token },
        })
          .then((response) => {
            /// All_Users_info///
            this.users = response.data.All_Users_info;
            this.title = "";
            if (response.data.All_Users_info.length === 0)
              this.title = "لا يوجد مستخدمين";
          })
          .catch(() => {
            return "error occoured";
          });
      } else if (
        this.vip == true &&
        this.free == false &&
        this.all == false &&
        this.name == false &&
        this.cert == false &&
        this.male == false &&
        this.female == false
      ) {
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
          headers: { Authorization: token },
          params: { VIP: 1 },
        })
          .then((response) => {
            this.users = response.data.Users_info;
            this.title = "";
            if (response.data.Users_info.length === 0)
              this.title = "لا يوجد مستخدمين";
          })
          .catch(() => {
            return "error occoured";
          });
      } else if (
        this.vip == false &&
        this.free == true &&
        this.all == false &&
        this.name == false &&
        this.cert == false &&
        this.male == false &&
        this.female == false
      ) {
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
          headers: { Authorization: token },
          params: { VIP: 0 },
        })
          .then((response) => {
            this.users = response.data.Users_info;
            this.title = "";
            if (response.data.Users_info.length === 0)
              this.title = "لا يوجد مستخدمين";
          })
          .catch(() => {
            return "error occoured";
          });
      } else if (
        this.vip == false &&
        this.free == false &&
        this.all == false &&
        this.name == false &&
        this.cert == true &&
        this.male == false &&
        this.female == false
      ) {
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
          headers: { Authorization: token },
          params: { cert: 1 },
        })
          .then((response) => {
            this.users = response.data.Users_info;
            this.title = "";
            if (response.data.Users_info.length === 0)
              this.title = "لا يوجد مستخدمين";
          })
          .catch(() => {
            return "error occoured";
          });
      } else if (
        this.vip == false &&
        this.free == false &&
        this.all == false &&
        this.name == false &&
        this.cert == false &&
        this.male == false &&
        this.female == true
      ) {
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
          headers: { Authorization: token },
          params: { gender: "Female" },
        })
          .then((response) => {
            this.users = response.data.Users_info;
            this.title = "";
            if (response.data.Users_info.length === 0)
              this.title = "لا يوجد مستخدمين";
          })
          .catch(() => {
            return "error occoured";
          });
      } else if (
        this.vip == false &&
        this.free == false &&
        this.all == false &&
        this.name == false &&
        this.cert == false &&
        this.male == true &&
        this.female == false
      ) {
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
          headers: { Authorization: token },
          params: { gender: "Male" },
        })
          .then((response) => {
            this.users = response.data.Users_info;
            this.title = "";
            if (response.data.Users_info.length === 0)
              this.title = "لا يوجد مستخدمين";
          })
          .catch(() => {
            return "error occoured";
          });
      } else if (
        this.vip == false &&
        this.free == false &&
        this.all == false &&
        this.name == true &&
        this.cert == false &&
        this.male == false &&
        this.female == false
      ) {
        if (!this.searchname) {
          this.title = "قم بادخال الاسم للبحث عنه...";
          return;
        }
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
          headers: { Authorization: token },
          params: { name: this.searchname },
        })
          .then((response) => {
            this.users = response.data.Users_info;
            this.title = "";
            if (response.data.Users_info.length === 0)
              this.title = "لا يوجد مستخدمين";
          })
          .catch(() => {
            return "error occoured";
          });
      } else {
        if ((this.name == false) | (this.searchname == ""))
          this.searchname = "";
        if (this.female === false && this.male === false) this.gender = "";
        else if (this.female === true && this.male === true) this.gender = "";
        else if (this.female === true && this.male === false)
          this.gender = "Female";
        else if (this.male === true && this.female === false)
          this.gender = "Male";
        if (this.vip === false) this.v = 0;
        else this.v = 1;
        if (this.cert === false) this.c = 0;
        else this.c = 1;

        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
          headers: { Authorization: token },
          params: {
            name: this.searchname,
            gender: this.gender,
            VIP: this.v,
            cert: this.c,
          },
        })
          .then((response) => {
            this.users = response.data.Users_info;
            this.title = "";
            if (response.data.Users_info.length === 0)
              this.title = "لا يوجد مستخدمين";
          })
          .catch(() => {
            return "error occoured";
          });
      }
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
</style>