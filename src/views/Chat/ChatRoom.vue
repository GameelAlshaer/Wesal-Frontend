<template>
  <v-app>
    <v-main >
      <div >
        <Navbar />
        <Sidebar />
  <div class="container">
  <div class="row">
    <div class="col-md-3">
      <list-users></list-users>
    </div>
    <div class="col-md-9">
      <div v-if="authUser!==undefined && otherUser!==undefined">
        <chat-body :auth-user="authUser" :other-user="otherUser"></chat-body>
      </div>
    </div>
  </div>
  </div>
      </div>
    </v-main>
  </v-app>

</template>

<script>
import ListUsers from "../../components/chat/ListUsers.vue";
import ChatBody from "../../components/chat/ChatBody.vue";
import Navbar from "../../components/Navbar.vue";
import Sidebar from "../../components/Sidebar.vue";
import axios from "axios";

export default {
  components:{
    ListUsers,
    ChatBody,
    Navbar,
    Sidebar,
  },
  props: {
    otherUserId: {
      type: String,
      required: true
    },
  },
  data(){
    return{
      authUser: undefined,
      otherUser: undefined,
    };
  },
  async created() {
    await this.get2Users(this.otherUserId);
  },
  methods:{
    refreshPage(){
      location.reload();
    },
    // check if not logged in ? log in ==> in either cases get the token
    loginAndGetToken() {
      if (localStorage.getItem("usertoken") === null)
        this.$router.push("Login");
      return {
        headers: {
          Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
        },
      };
    },

    async get2Users(id){
      const option = this.loginAndGetToken();
      await axios
          .get(`http://127.0.0.1:8000/api/messages/${id}` , option)
          .then(response => {
            this.authUser = response.data.authUser ;
            this.otherUser = response.data.otherUser ;
          })
          .catch(error =>{
            console.log(error) ;
          });
    },
  },
  watch: {
    $route(to , from){
      console.log(to.params) ;
      console.log(from.params) ;

      if (to.params.otherUserId !== from.params.otherUserId) {
        this.refreshPage();
      }
    }
  }

}
</script>
<style scoped>
.bg {
  background-color: rgba(255, 255, 255, 0.9) !important;
  z-index: 2;
}
.v-main {
  background-image: url(../../assets/bb.jpg);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>