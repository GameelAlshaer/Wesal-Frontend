<template>
  <div>
    <h4 class="hp" align="center" style="color: rgba(255, 98, 101, 1)">
      قائمة التفضيلات الخاصة بك
    </h4>

    <div v-if="!users">
      <h4 class="hp" align="center" style="color: rgba(255, 98, 101, 1)">
        فم باجابة جميع الاسئلة لظهور قائمة التفضيلات الخاصة بك
      </h4>
    </div>
    <v-card
      :loading="loading"
      max-width="300"
      max-height="400"
      v-for="(user, index) in users"
      :key="index"
      class="card"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="250"
        width="300"
        v-if="!user.user[0].image"
        v-bind:src="url"
      ></v-img>
      <v-img
        height="250"
        width="300"
        v-else-if="user.user[0].image.includes('http')"
        v-bind:src="user.user[0].image"
      ></v-img>
      <v-img
        height="250"
        width="300"
        v-else-if="!user.user[0].image.includes('http')"
        v-bind:src="`http://127.0.0.1:8000${user.user[0].image}`"
      ></v-img>

      <div>الاسم : {{ user.user[0].name }}</div>
      <div>العمر : {{ parseInt(user.user[0].age) }}</div>

      <v-divider class="mx-4"></v-divider>
      <div v-if="sid == user.user[0].id">
        <v-alert
          v-if="donerchat"
          type="success"
          color="#FF6265"
          align="center"
          dismissible
          @click="rerchat()"
        >
          {{ msg }}
        </v-alert>
        <v-alert
          v-if="donefav"
          type="success"
          color="#FF6265"
          dismissible
          @click="refav()"
        >
          {{ msg }}
        </v-alert>

        <v-alert
          v-if="doneschat"
          type="success"
          color="#FF6265"
          dismissible
          @click="reschat()"
        >
          <v-row align="center">
            <v-col> هل انت متاكد من بدء المحادثة؟ </v-col>
            <v-col class="shrink">
              <v-btn color="#FF6265" @click="gochat()">بدء المحادثة</v-btn>
            </v-col>
          </v-row>
        </v-alert>
        <v-alert
          v-if="errorrchat"
          type="warning"
          color="#FF6265"
          align="center"
          dismissible
          @click="rerchat()"
        >
          {{ msg }}
        </v-alert>
        <v-alert
          v-if="errorfav"
          type="warning"
          color="#FF6265"
          dismissible
          @click="refav()"
        >
          {{ msg }}
        </v-alert>
        <v-alert
          v-if="errorschat"
          type="warning"
          color="#FF6265"
          dismissible
          @click="reschat()"
        >
          {{ msg }}
        </v-alert>
      </div>
      <v-card-actions class="c">
        <span
          v-if="VIP === 1"
          style="
             {
              background-color: white;
            }
          "
          class="btns-logo"
          title="بدء المحادثة"
          @click="startchat(user.user[0].id)"
          ><font-awesome-icon
            style="
              color: #fe6265;
              font-size: 30px;
              margin-left: 1px;
              background-color: white;
            "
            :icon="startChat"
        /></span>
        <span
          v-else
          class="btns-logo"
          title="ارسال طلب المحادثة"
          @click="requestchat(user.user[0].id)"
          ><font-awesome-icon
            style="
              color: #fe6265;
              font-size: 30px;
              margin-left: 1px;
              background-color: white;
            "
            :icon="startChat"
        /></span>
        <span
          @click="addtofavs(user.user[0].id)"
          class="btns-logo"
          title="اضافة الي المفضلين"
          ><font-awesome-icon
            style="
              color: #fe6265;
              font-size: 30px;
              margin-left: 1px;
              background-color: white;
            "
            :icon="fav"
        /></span>
        <div class="cc">
          <v-btn
            color="deep-purple lighten-2"
            class="btn"
            text
            @click="gotouserinfo(user)"
            left
          >
            المزيد
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>


<script>
import axios from "axios";
import img from "../assets/UserDefaultAvatar.png";
import { faHeart, faComment, faBan } from "@fortawesome/free-solid-svg-icons";
export default {
  data() {
    return {
      users: [],
      VIP: "",
      avatarurl: null,
      url: img,
      file: "",
      loading: false,
      selection: 1,
      donefav: false,
      donerchat: false,
      doneschat: false,
      errorrchat: false,
      errorfav: false,
      errorschat: false,
      msg: "",
      sid: null,
    };
  },
  computed: {
    fav() {
      return faHeart;
    },
    startChat() {
      return faComment;
    },
    block() {
      return faBan;
    },

    useravatar(img) {
      if (!img.includes("http")) {
        return `http://127.0.0.1:8000${img}`;
      }
      return img;
    },
  },

  mounted() {
    const token = "Bearer ".concat(localStorage.getItem("usertoken"));
    ///const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjUyNjY3MSwiZXhwIjoxNjMyOTM3MDcyLCJuYmYiOjE2MzI1MjY2NzIsImp0aSI6ImdhVVJYa0hLT0ZTMnZncTQiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.nsz9eFgELtk7uU-IKF_X8RIxkXusIrcjF22bWuhq7l4");///
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/preference",
      headers: { Authorization: token },
    })
      .then((response) => {
        this.users = response.data;
      })
      .catch(() => {
        return "error occoured";
      });

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/profile",
      headers: { Authorization: token },
    })
      .then((response) => {
        this.VIP = response.data.VIP;
      })
      .catch(() => {
        return "error occoured";
      });
  },

  methods: {
    refav() {
      this.donefav = false;
      this.errorfav = false;
      this.msg = "";
      this.sid = null;
    },
    rerchat() {
      this.donerchat = false;
      this.errorrchat = false;
      this.msg = "";
      this.sid = null;
    },
    gochat() {
      this.doneschat = false;
      this.errorschat = false;
      this.msg = "";
      this.sid = null;
      this.$router.push({ name: "Chat" });
    },
    reschat() {
      this.doneschat = false;
      this.errorschat = false;
      this.msg = "";
      this.sid = null;
    },
    gotouserinfo(user) {
      this.$router.push({
        name: "Userinfo",
        params: { id: user.user[0].id },
      });
    },
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
    addtofavs(id) {
      const token = "Bearer ".concat(localStorage.getItem("usertoken"));

      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/addFriend",
        headers: { Authorization: token },
        params: { recevier_id: id },
      })
        .then(() => {
          ///alert("تم اضافة الي قائمة المفضلين");///
          this.sid = id;
          this.msg = "تم اضافة المستخدم الي قائمة المفضلين";
          this.donefav = true;
        })
        .catch(() => {
          this.sid = id;
          this.errorfav = true;
          this.msg = "لقد قمت باضافة المستخدم من قبل..";
          ///  alert("لقد قمت باضافة المستخدم من قبل.."); ///
          return "error occoured";
        });
    },
    startchat(id) {
      const token = "Bearer ".concat(localStorage.getItem("usertoken"));
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/startchat",
        headers: { Authorization: token },
        params: { userid2: id },
      })
        .then(() => {
          this.sid = id;
          this.doneschat = true;
          this.msg = "يمكنم الان بدء المحادثة";
          /// alert("You can start chat now");
        })
        .catch((error) => {
          this.sid = id;
          if (error.response.status == 400) {
            /// alert("you have to choose user to start chat with");///
            this.errorschat = true;
            this.msg = "عليك اختيار مستخدم لبدء المحادثة ";
          } else if (error.response.status == 403) {
            ///alert("this user blocked you, cannot send msg");///
            this.errorschat = true;
            this.msg = "هذا المستخدم قام بحذ لك..لا يمن ان تبدء المحادثة معه ";
          } else if (error.response.status == 404) {
            /// alert("No user with this info to start chat with");///
            this.errorschat = true;
            this.msg = "لا يوجد معلومات عن هذا المستخدم ";
          } else if (error.response.status == 405) {
            // alert("can not send more than 4 msgs to this account or you may dont have access to this chat");///
            this.errorschat = true;
            this.msg =
              "لقد قمت بالرسال اكثر من 4 رسائل او لا يمكنك ارسال رسالة لهذا المستخدم";
          } else alert("you cannot start chat..");
          return "error occoured";
        });
    },
    requestchat(id) {
      const token = "Bearer ".concat(localStorage.getItem("usertoken"));
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/request",
        headers: { Authorization: token },
        data: { recevier: id },
      })
        .then(() => {
          this.sid = id;
          ///alert("تم ارسال طلب محادثة للمستخدم");///
          this.msg = "تم ارسال طلب محادثة للمستخدم";
          this.donerchat = true;
        })
        .catch(() => {
          this.sid = id;
          this.errorrchat = true;
          this.msg = "لقد قمت بالرسال طلب محادثة من قبل";
          /// alert("لقد قمت بالرسال طلب محادثة من قبل")///
          return "error occoured";
        });
    },
  },
};
</script> 


<style scoped>
.card {
  display: inline-block;
  background-color: white;
  box-shadow: 0px 6px 0px white;
  border: solid 2px rgba(255, 98, 101, 1);
  border-radius: 30px;
  margin-right: 5px;
  margin-left: 5px;
  margin-top: 3px;
  margin-bottom: 5px;
  direction: rtl;
}
.card:hover {
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.01);
  transform: scale(1.1);
  border-radius: 15px;
}
.btns-logo {
  margin-right: 9px;
  background-color: white;
  color: white;
  height: 20px;
  width: 30px;
}
.btns-logo:hover {
  background-color: white;
  color: white;
  border-radius: 40%;
  variant: white;
  cursor: pointer;
  font-size: 12px;
}
.btn {
  variant: outline-secondary;
  color: black;
  background-color: white;
  box-shadow: 0px 6px 0px white;
  border: solid 1px rgba(255, 98, 101, 1);
  border-radius: 30px;
}

.hp {
  margin-top: 10px;
}
.c {
  direction: rtl;
}
.cc {
  direction: rtl;
  margin-right: 40%;
}
</style>