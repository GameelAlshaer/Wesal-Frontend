<template>
    <div class="card">
      <div class="card-header">Users</div>
      <div class="card-body">
        <p v-if="!users.length">No Users</p>
        <ul v-else class="list-group list-group-flush">
          <li v-for="user in users"
              :key="user.id"
              class="list-group-item list-group-item-action"
          >
            <router-link
                style="text-decoration: none;"
                :to="'/chatRoom/'+user.id"
            >
              {{user.name}}
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
      await axios
          .get('http://127.0.0.1:8000/api/listUsers',option)
          .then((response) => {
            this.users = response.data.users;
          })
          .catch((error) => {
            console.log('error in fetching users ( ListUser component )');
            console.log(error);
          });
    },
  },
  async created() {
    await this.fetchUsers();
  }
}
</script>

<style scoped>

</style>