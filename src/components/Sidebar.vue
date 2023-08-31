<template>
  <div id="app" v-if="!error">
    <div class="font ">
      <b-sidebar id="sidebar-right" right shadow class="back">
        <div class="px-6 py-2">
          <nav class="mb-5">
            <b-nav vertical>
              <v-img :src="useravatar" id="avatar" rounded class="ml-auto mx-5">
              </v-img>
              <h5 style=" color: #df7656;  font-size: 20px;  margin-top: 1rem; ">
                {{ name }}
              </h5>
              <v-divider></v-divider>
              <v-list-item @click="redirect('friend')">
                <font-awesome-icon style="color: #df7656;font-size: 40px; margin-left: 1.25rem;" :icon="fav" />
                <span class="link" style="text-align: center; margin-left: auto">
                  قائمة المعجب بهم</span>
              </v-list-item>
              <v-list-item @click="redirect('block')">
                <font-awesome-icon style="color: #df7656;font-size: 40px; margin-left: 1.25rem;" :icon="block" />
                <span class="link" style="text-align: center; margin-left: auto">قائمة المحظورين</span>
              </v-list-item>
              <v-list-item @click="redirect('requests')">
                <font-awesome-icon style="color: #df7656;font-size: 40px; margin-left: 1.25rem;" :icon="req" />
                <span class="link" style="text-align: center; margin-left: auto">قائمة طلبات الصداقة</span>
              </v-list-item>
              <v-list-item @click="redirect('follower')" v-if="VIP === 1">
                <font-awesome-icon style="color: #df7656;font-size: 40px; margin-left: 1.25rem;" :icon="favme" />
                <span class="link" style="text-align: center; margin-left: auto">قائمة المعجبين بي</span>
              </v-list-item>
              <v-list-item @click="redirect('CertifyMe')">
                <font-awesome-icon style=" color: #df7656;font-size: 40px; margin-left: 1.25rem;" :icon="certify" />
                <span class="link" style="text-align: center; margin-left: auto">تصديق حسابي</span>
              </v-list-item>
            </b-nav>
          </nav>
        </div>
      </b-sidebar>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import img from "../assets/UserDefaultAvatar.png";
import {
  faHeart,
  faBan,
  faStar,
  faPlus,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
export default {
  data() {
    return {
      VIP: "",
      url: img,
      avatarurl: null,
      name: "",
      error: false,
    };
  },
  computed: {
    fav() {
      return faHeart;
    },
    favme() {
      return faStar;
    },
    block() {
      return faBan;
    },
    req() {
      return faPlus;
    },
    certify() {
      return faCheck;
    },
    useravatar() {
      if (this.avatarurl) return `http://127.0.0.1:8000${this.avatarurl}`;
      return this.url;
    },
  },
  methods: {
    previewImage() {
      this.url = URL.createObjectURL(this.file);
      this.useravatar();
    },
    goToblocks() {
      this.$router.push("/blockedUsers");
    },
    goTofavs() {
      this.$router.push("/favUsers");
    },
    goTolikedme() {
      this.$router.push("/followersList");
    },
    goTocertify() {
      this.$router.push("/certifyme");
    },
    goTorequests() {
      this.$router.push("/allRequests");
    },
    redirect(name) {
      this.$router.push({ name: name });
    },
  },
  mounted() {
    if (!localStorage.getItem("usertoken")) {
      this.error = true;
    }
    const token = "Bearer ".concat(localStorage.getItem("usertoken"));
    /// const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjUyNjY3MSwiZXhwIjoxNjMyOTM3MDcyLCJuYmYiOjE2MzI1MjY2NzIsImp0aSI6ImdhVVJYa0hLT0ZTMnZncTQiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.nsz9eFgELtk7uU-IKF_X8RIxkXusIrcjF22bWuhq7l4");///
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/profile",
      headers: { Authorization: token },
    })
      .then((response) => {
        this.error = false;
        this.VIP = response.data.VIP;
        this.avatarurl = response.data.image;

        this.name = response.data.name;
      })
      .catch((error) => {
        if (error.response.status === 403) this.error = true;
        return "error occoured";
      });
  },
};
</script>


<style scoped>
.back {
  background-color: rgba(187, 146, 118, 0.9) !important;


}

.font {
  font-family: 'Changa', sans-serif !important;
  ;
}
</style>
