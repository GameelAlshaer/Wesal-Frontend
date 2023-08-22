<template>
  <div id="app">
    <div class="nb">
      <b-navbar class="navbar">
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ms-auto">
            <b-nav-item style="margin-right: -10rem" href="/adminuserslist"
              >المستخدمين</b-nav-item
            >
            <b-nav-item style="margin-right: 15rem" href="/All_Reports"
              >الإبلاغات</b-nav-item
            >
            <b-nav-item style="margin-right: 15rem" href="/certifyUsers"
              >طلبات التصديق</b-nav-item
            >
            <b-nav-item style="margin-right: 15rem" href="/adminquestions"
              >الأسئلة</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
        <!--  <b-collapse id="nav-collapse" is-nav class="inform" >
              <b-navbar-nav align="center"> 
                    <input align="center" type="text"  v-model="search"  placeholder="   ...البحث  " size="sm" class="in" />
                    <span></span>  
                    <input type="number" 
                      class="age"
                      v-model.number="age"  min=20 max=80  v-if="ageusers==true"/>
                    <input type="number" 
                      class="age"
                      v-model.number="bancount"  min=1 max=49  v-if="banusers==true"/>
                    <span v-if="ageusers==true"></span>             
                
                    <span></span> 
                    <b-button  size="sm"  class="b" variant="outline-light"   @click="gotosearch()">البحث   </b-button>
              </b-navbar-nav > 
          </b-collapse>-->

        <b-navbar-nav class="mr-4 ml-auto me-auto">
          <b-button
            size="sm"
            class="btnss"
            variant="outline-secondary"
            type="submit"
            @click="logout()"
            >تسجيل خروج</b-button
          >
        </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { faFolder, faList } from "@fortawesome/free-solid-svg-icons";
export default {
  data() {
    return {
      VIP: "",
      dosearch: false,
      search: "",
      users: [],
      catg: "بحث من خلال..",
      banusers: null,
      vipusers: null,
      freeusers: null,
      certusers: null,
      ageusers: null,
      age: 20,
      bancount: 1,
    };
  },
  computed: {
    folder() {
      return faFolder;
    },
    list() {
      return faList;
    },
  },

  methods: {
    logout() {
      //const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjUyNjY3MSwiZXhwIjoxNjMyOTM3MDcyLCJuYmYiOjE2MzI1MjY2NzIsImp0aSI6ImdhVVJYa0hLT0ZTMnZncTQiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.nsz9eFgELtk7uU-IKF_X8RIxkXusIrcjF22bWuhq7l4");
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/logout/Admin",
        headers: {
          Authorization: `${"Bearer"} ${localStorage.getItem("adminToken")}`,
        },
      })
        .then(() => {
          alert("You are logged out..");

          localStorage.clear();
          this.$router.push("/Adminlogin");
        })
        .catch(() => {
          return "error occoured";
          //return to login page
        });
    },
  },

  mounted() {},
};
</script>



<style scoped>
.alert {
  padding: 20px;
  background-color: #f44336; /* Red */
  color: white;
  margin-bottom: 15px;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;

  background-color: #f5f5f5;
  color: rgba(255, 98, 101, 1);
  height: 100 px;
  width: 100%;
  box-shadow: 1px 2px 5px rgba(255, 98, 101, 1);
}
.nav-links {
  display: flex;
}
.in {
  height: 30px;
  width: 150px;
  border-radius: 15px;
  padding-radius: 15px;
  margin-bottom: 4px;
  margin-top: 1px;
  border: solid 1px rgba(255, 98, 101, 1);
  border-radius: 30px;
  background-color: #f5f5f5;
}
.age {
  height: 30px;
  width: 60px;
  padding-radius: 15px;
  margin-bottom: 4px;
  margin-top: 1px;
  border: solid 1px rgba(255, 98, 101, 1);
  border-radius: 10px;
  background-color: white;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}
.dp {
  height: 30px;
  width: 140x;
  border-radius: 15px;
  padding-radius: 15px;
  margin-bottom: 4px;
  margin-top: 1px;
  marigin-right: 5px;
  marigin-left: 5px;
  background-color: #f5f5f5;
  border: solid 1px rgba(255, 98, 101, 1);
  border-radius: 30px;
}
.b {
  background-color: #f5f5f5;
  color: black;
  border-radius: 12px;
  margin-bottom: 4px;
  margin-top: 1px;
  width: 70px;
  height: 30px;
  border: solid 1px rgba(255, 98, 101, 1);
  border-radius: 30px;
}
.b:hover {
  cursor: pointer;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  background-color: #f5f5f5;
  color: grey;
  border-radius: 12px;
}
.inform {
  text-align: center;
  align: center;
  display: flex;
  display: grid;
  justify: center;
  margin-left: 25%;
}
.btnss {
  background-color: #f5f5f5;
  color: black;
  border-radius: 12px;
  margin-bottom: 4px;
  margin-top: 1px;
  width: 100px;
  height: 30px;
  border: solid 1px rgba(255, 98, 101, 1);
  border-radius: 30px;
}
.btnss:hover {
  cursor: pointer;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  background-color: #f5f5f5;
  color: grey;
  border-radius: 12px;
}
span:not(:last-child) {
  margin-right: 5px;
}

.nb {
  background-color: #f5f5f5;
}
</style>
 