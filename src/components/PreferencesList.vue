<template id="favorite">
  <v-container class="font">
    <v-row align="center" justify="center" class="my-3 mx-1 p-3 shadow rounded-3 bg">

      <div>
        <h4 class="hp" align="center" style="color:#a22b0a">
          قائمة التفضيلات الخاصة بك
        </h4>
        <div v-if="!users">
          <h4 class="hp" align="center" style="color: rgba(255, 98, 101, 1)">
            فم باجابة جميع الاسئلة لظهور قائمة التفضيلات الخاصة بك
          </h4>
        </div>
      </div>

      <div class="row gx-5">
        <div class="col-lg-3 col-md-6  " v-for="(user, index) in users" :key="index">
          <div class="card1">
            <div>
              <v-img style="height: 200px;" class="imgraduis" v-if="!user.user[0].image" v-bind:src="url"></v-img>
              <v-img style="height: 200px;" class="imgraduis" v-else-if="user.user[0].image.includes('http')"
                     v-bind:src="user.user[0].image"></v-img>
              <v-img style="height: 200px;" class="imgraduis" v-else-if="!user.user[0].image.includes('http')"
                     v-bind:src="`http://127.0.0.1:8000${user.user[0].image}`"></v-img>
            </div>

            <div class="mt-3 fw-bold fs-5">الاسم : {{ user.user[0].name }}</div>
            <div class="mt-1 fw-bold fs-5">العمر : {{ parseInt(user.user[0].age) }}</div>
            <v-divider></v-divider>

            <div v-if="sid == user.user[0].id">
              <v-alert v-if="donerchat" type="success" color="green" align="center" dismissible @click="rerchat()">
                {{ msg }}
              </v-alert>
              <v-alert v-if="donefav" type="success" color="green" dismissible @click="refav()">
                {{ msg }}
              </v-alert>

              <v-alert v-if="doneschat" type="success" color="green" dismissible @click="reschat()">
                <v-row align="center">
                  <v-col> هل انت متاكد من بدء المحادثة؟</v-col>
                  <v-col class="shrink">
                    <v-btn color="darkgreen" @click="gochat()">بدء المحادثة</v-btn>
                  </v-col>
                </v-row>
              </v-alert>
              <v-alert v-if="errorrchat" type="warning" color="#FF6265" align="center" dismissible @click="rerchat()">
                {{ msg }}
              </v-alert>
              <v-alert v-if="errorfav" type="warning" color="#FF6265" dismissible @click="refav()">
                {{ msg }}
              </v-alert>
              <v-alert v-if="errorschat" type="warning" color="#FF6265" dismissible @click="reschat()">
                {{ msg }}
              </v-alert>
            </div>

            <v-card-actions class="align-items-center justify-content-between">
              <div>
              <span v-if="VIP === 1" class="mx-1 cur" title="بدء المحادثة" @click="startchat(user.user[0].id)">
                <font-awesome-icon style=" color: #fe6265; font-size: 30px;" :icon="startChat"/>
              </span>
                <span v-else class="mx-1 cur" title="ارسال طلب المحادثة"
                      @click="requestchat(user.user[0].id)"><font-awesome-icon style="color: #fe6265;font-size: 30px;"
                                                                               :icon="startChat"/>
              </span>
                <span @click="addtofavs(user.user[0].id)" class="mx-1 cur" title="اضافة الي المفضلين">
                <font-awesome-icon style="color: #fe6265;font-size: 30px;" :icon="fav"/>
              </span>
              </div>
              <div>
                <v-btn class="btn" style="color: #be8e71;font-weight: bolder; font-size: large;" text
                       @click="gotouserinfo(user)">
                  المزيد
                </v-btn>
              </div>
            </v-card-actions>
          </div>
        </div>
      </div>

    </v-row>
  </v-container>
</template>


<script>
import axios from "axios";
import img from "../assets/UserDefaultAvatar.png";
import {faHeart, faComment, faBan} from "@fortawesome/free-solid-svg-icons";

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
    // when mounted get the users & auth user
    const token = "Bearer ".concat(localStorage.getItem("usertoken"));
    ///const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjUyNjY3MSwiZXhwIjoxNjMyOTM3MDcyLCJuYmYiOjE2MzI1MjY2NzIsImp0aSI6ImdhVVJYa0hLT0ZTMnZncTQiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.nsz9eFgELtk7uU-IKF_X8RIxkXusIrcjF22bWuhq7l4");///
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/preference",  // get all valid users
      headers: {Authorization: token},
    })
        .then((response) => {
          this.users = response.data;
        })
        .catch(() => {
          return "error occurred";
        });

    // this request returns the authenticated user
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/profile",
      headers: {Authorization: token},
    })
        .then((response) => {
          this.VIP = response.data.VIP;
        })
        .catch(() => {
          return "error occurred";
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
      this.$router.push({name: "chatStartPage"});
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
        params: {id: user.user[0].id},
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
        headers: {Authorization: token},
        params: {recevier_id: id},
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
        headers: {Authorization: token},
        params: {userid2: id},
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
              // alert("can not send more than 4 msgs to this account, or you may don't have access to this chat");///
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
        headers: {Authorization: token},
        data: {recevier: id},
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
.bg {
  background-color: rgba(255, 255, 255, 0.9) !important;
  z-index: 2;
}

.font {
  font-family: 'Changa', sans-serif;
  /* You can also specify font-weight and other styles here */
}

.imgraduis {
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
}

.card1 {
  /* background-color: transparent !important; */
  border: 1px solid rgb(196, 196, 196) !important;
  border-radius: 15px;
}

.cur {
  cursor: pointer;
}
</style>