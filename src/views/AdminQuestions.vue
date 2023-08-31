<template>
    <v-app class="font">
      <AdminNotAuth v-if="notoken"/>
      <v-main>
        <AdminNavbar/>
        <ChangeQuestions/>
      </v-main>
    </v-app>
</template>

<script>
// import axios from 'axios';
import AdminNavbar from '@/components/AdminNavbar.vue'
import AdminNotAuth from '@/components/AdminNotAuth'
// import AdminSidebar from '@/components/AdminSidebar.vue'
import ChangeQuestions from '@/components/ChangeQuestions.vue'

export default {
  components: {
    AdminNavbar,
    // AdminSidebar,
    ChangeQuestions,
    AdminNotAuth
  },
};
</script>
<style scoped>
.font{
  font-family: 'Changa', sans-serif;
}
.v-main {
  background-image: url(../assets/date.jpg);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

</style>