<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <!--   List Users    -->
      <list-users :users="users"></list-users>
      </div>
      <div class="col-md-9">
<!--        <router-view />-->
        <div class="card">
          <div class="card-body text-center">
            <p class="font-weight-bold">You don’t have a chat selected</p>
            <p>Choose a user to continue an existing chat or start a new one.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import ListUsers from "../../components/chat/ListUsers.vue";
// import {RouterView} from "vue-router";
export default {
  components: {
    ListUsers,
    // RouterView
  },
  data() {
    return {
      users: [],
    }
  },
  methods: {
    // check if not logged in ? log in ==> in either cases get the token
    LoginIfNot() {
      if (localStorage.getItem("usertoken") === null)
        this.$router.push("Login");
      return {
        headers: {
          Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
        },
      };
    },

    fetchUsers() {
      const option = this.LoginIfNot();
      axios
          .get('http://127.0.0.1:8000/api/messages', option)
          .then((response) => {
            this.users = response.data.users;
          })
          .catch((error) => {
            console.log('error in fetching users');
            console.log(error);
          });
    }
  },
  created() {
    this.fetchUsers();
  }
}

</script>


<style>

</style>