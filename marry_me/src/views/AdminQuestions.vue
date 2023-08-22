<template>
    <v-app>
        <AdminNavbar/>
        <ChangeQuestions/>
    </v-app>
</template>

<script>
// import axios from 'axios';
import AdminNavbar from '@/components/AdminNavbar.vue'
// import AdminSidebar from '@/components/AdminSidebar.vue'
import ChangeQuestions from '@/components/ChangeQuestions.vue'

export default {
  components: {
    AdminNavbar,
    // AdminSidebar,
    ChangeQuestions
  },
};
</script>