<template>
  <v-app>
    <v-main class="font" >
      <div >
        <Navbar />
        <Sidebar />
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <!--   List Users    -->
        <list-users></list-users>
        </div>
        <div class="col-md-9">
          <div class="card">
            <div class="card-body text-center">
              <p class="font-weight-bold" style="color: #996542!important; ">لم تقم باختيار محادثة حتى الآن</p>
              <p style="color: #996542!important; "   >اختر المستخدم الذي تريد التحدث إليه</p>
            </div>
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
import Navbar from "../../components/Navbar.vue";
import Sidebar from "../../components/Sidebar.vue";
export default {
  components: {
    ListUsers,
    Navbar,
    Sidebar
  },
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
.font{
  font-family: 'Changa', sans-serif;
}
</style>