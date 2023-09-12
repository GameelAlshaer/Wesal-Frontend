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
            <router-link to="/chatRoom" style="text-decoration: none;">{{user.name}}</router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import {RouterLink } from "vue-router";
export default {
  components:{
    RouterLink,
  },
  props: {
    users: []
  }
}
</script>

<style scoped>

</style>