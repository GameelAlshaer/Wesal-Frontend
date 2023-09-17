<template>
  <div>
    <button @click="test">Test</button>
  </div>
</template>
<script>
  import axios from "axios";

  export default {
    methods:{
      loginAndGetToken() {
        if (localStorage.getItem("usertoken") === null)
          this.$router.push("Login");
        return {
          headers: {
            Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
          },
        };
      },
      async test(){
        const option = this.loginAndGetToken() ;
        const data = {
          param: 'how are him',
        }
        await axios
            .post('http://127.0.0.1:8000/api/test',data , option)
            .then(response => {
              console.log(response) ;
            })
            .catch(err => {
              console.log(err) ;
            })
      }
    }
  }
</script>