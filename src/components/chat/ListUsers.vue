<template>
  <div class="card font">
    <div class="card-header fw-bolder fs-3">الدردشات</div>
    <div class="card-body" style="max-height: 650px; overflow: auto;">
      <p v-if="!users.length">لا يوجد أي دردشات </p>
      <ul v-else class="list-group list-group-flush">
<!--        <li v-for="user in users" :key="user.id" class="list-group-item list-group-item-action">-->
        <li  v-for="user in users" :key="user.user[0].id" class="list-group-item list-group-item-action">
          <router-link style="text-decoration: none; color:#996542; font-weight: bolder; font-size: 1.25rem;"
            :to="'/chatRoom/' + user.user[0].id">
                <p>{{ user.user[0].name }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {RouterLink } from "vue-router";
import axios from "axios";
export default {
  components:{
    RouterLink,
  },
  data() {
    return {
      users: [],
    }
  },
  methods: {
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

    async fetchUsers() {
      const option = this.loginAndGetToken();
      // this request returns a collection of users where each record looks like => user[] that contains only one user
        // that's why we access through user.user[0]
      let response = await axios.get('http://127.0.0.1:8000/api/preference',option);
      this.users = response.data ;
    },
  },
  async created() {
    await this.fetchUsers();
  }
}
</script>

<style scoped>
.font {
  font-family: 'Changa', sans-serif;
}
</style>