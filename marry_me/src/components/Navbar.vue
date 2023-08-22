<template>
  <div id="app" v-if="!error">
    <div class="nb">
      <b-navbar class="navbar">
        <span></span>
        <b-navbar-brand>
          <button v-b-toggle.sidebar-right size="sm" title="فتح الشريط الجانبي">
            <font-awesome-icon
              title="فتح الشريط الجانبي"
              rounded="circle"
              style="color: #fe6265; background-color: #f5f5f5; font-size: 30px"
              :icon="list"
              class="icon"
            />
          </button>
        </b-navbar-brand>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ms-auto">
            <b-nav-item href="/homepage">الصفحة الرئيسية</b-nav-item>
            <b-nav-item href="/my_profile">الصفحة الشخصية</b-nav-item>
            <b-nav-item href="/chat">المحادثات</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
        <b-collapse id="nav-collapse" is-nav class="inform">
          <b-navbar-nav align="center">
            <input
              align="right"
              type="text"
              v-model="search"
              placeholder="   ...البحث  "
              size="sm"
              class="in"
            />
            <span></span>

            <div v-if="VIP === 1">
              <b-button class="b" style="width: 120px" @click="openfilter()">
                تصفية البحث
              </b-button>
            </div>

            <span></span>
            <b-button
              size="sm"
              class="b"
              variant="outline-light"
              @click="gotosearch()"
              >البحث
            </b-button>
          </b-navbar-nav>
        </b-collapse>
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

    <span></span>
    <br />

    <v-row>
      <div
        v-if="filter"
        style="
          direction: rtl;
          align: right;
          text-align: right;
          margin-right: 25%;
          display: inline-block;
        "
      >
        <v-checkbox
          style="display: inline-block"
          v-model="all"
          :label="` الكل `"
        ></v-checkbox>
        <v-checkbox
          style="display: inline-block"
          v-model="vip"
          :label="` VIP `"
        ></v-checkbox>
        <v-checkbox
          style="display: inline-block"
          v-model="cert"
          :label="` المصرح حسابهم `"
        ></v-checkbox>
        <v-checkbox
          style="display: inline-block"
          v-model="ban"
          :label="` المحظورين بعدد `"
        ></v-checkbox>
        <input
          v-if="ban"
          style="display: inline-block; padding-top: 5px; margin-right: 3px"
          type="number"
          class="age"
          v-model.number="bancount"
          min="1"
          max="50"
        />
        <v-checkbox
          style="display: inline-block"
          v-model="age"
          :label="` بالعمر `"
        >
        </v-checkbox>
        <input
          v-if="age"
          style="display: inline-block; padding-top: 5px; margin-right: 3px"
          type="number"
          class="age"
          v-model.number="agenum"
          min="20"
          max="80"
        />

        <span></span>
        <b-button class="b" style="width: 120px" @click="openfilter()">
          تم الاختيار
        </b-button>
      </div>
    </v-row>

    <span></span>
    <br />
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
      loggedout: false,
      error: false,
      filter: false,
      all: false,
      vip: false,
      free: false,
      age: false,
      agenum: 20,
      cert: false,
      ban: false,
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
    openfilter() {
      this.filter = !this.filter;
    },
    logout() {
      const token = "Bearer ".concat(localStorage.getItem("usertoken"));
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/logout",
        headers: { Authorization: token },
      })
        .then(() => {
          this.loggedout = true;
          localStorage.removeItem("usertoken");
          this.$router.push("/login");
        })
        .catch(() => {
          return "error occoured";
          //return to login page
        });
    },

    gotosearch() {
      this.dosearch = true;

      this.$router.push({
        name: "SearchResult",
        params: {
          me_vip: this.VIP,
          searchname: this.search,
          age: this.age,
          vip: this.vip,
          free: this.free,
          all: this.all,
          agenum: this.agenum,
          bancount: this.bancount,
          ban: this.ban,
          cert: this.cert,
        },
      });
    },
  },

  mounted() {
    if (!localStorage.getItem("usertoken")) {
      this.error = true;
    }
    const token = "Bearer ".concat(localStorage.getItem("usertoken"));
    ///const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjUyNjY3MSwiZXhwIjoxNjMyOTM3MDcyLCJuYmYiOjE2MzI1MjY2NzIsImp0aSI6ImdhVVJYa0hLT0ZTMnZncTQiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.nsz9eFgELtk7uU-IKF_X8RIxkXusIrcjF22bWuhq7l4");///
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/profile",
      headers: { Authorization: token },
    })
      .then((response) => {
        this.error = false;
        this.VIP = response.data.VIP;
      })
      .catch((error) => {
        if (error.response.status === 403) this.error = true;
        return "error occoured";
      });
  },
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

  border: solid 1px rgba(255, 98, 101, 1);
  border-radius: 30px;
  background-color: #f5f5f5;
  text-align: right;

  direction: rtl;
  padding: 10px 40px 10px 10px;
}
.in:focus {
  border: solid 1px rgba(255, 98, 101, 1);
  outline: none !important;
}
input {
  &:focus {
    outline: none !important;
  }
}
textarea {
  &:focus {
    outline: none !important;
  }
}
.age {
  height: 25px;
  width: 60px;
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

spann {
  margin-top: 2px;
}

.nb {
  background-color: #f5f5f5;
}
</style>
 