<template>
  <v-app>
    <v-app class="font" v-if="notoken == true">
      <ErrorPage style="margin: 50px !important" v-if="notoken" />
    </v-app>
    <v-app class="font" v-if="notverified == true">
      <div class="text-center" style="margin: 50px !important">
        <v-alert
          text
          prominent
          type="error"
          icon="mdi-cloud-alert"
          style="direction: rtl"
        >
          من فضلك قم باعادة التسجيل الدخول و التحقق من حسابك
        </v-alert>
        <v-btn depressed color="primary" @click="redirect()">
          نسجيل الدخول
        </v-btn>
      </div>
    </v-app>
    <v-app class="font" v-if="checkquestions == true">
      <div class="text-center" style="margin: 50px !important">
        <v-alert
          text
          prominent
          type="error"
          icon="mdi-cloud-alert"
          style="direction: rtl"
        >
          من فضلك قم باجابة جميع اسئلتك قبل التصفح
        </v-alert>
        <v-btn depressed color="primary" @click="quizpage()">
          الذهاب للاسئلة
        </v-btn>
      </div>
    </v-app>
    <v-main class="font" id="certifyme" v-if="noerror">
      <Navbar v-if="noerror" />
      <Sidebar v-if="noerror" />
      <v-container v-if="!error2 && !error">

      <v-row align="center" justify="center" class="my-3 p-5 shadow rounded-3 bg">        <v-col cols="12" id="Black">
          <br />
          <br />
          <h1 class="text-center">تصديق حسابي</h1>
          <br />
          <v-form ref="form" id="form">
            <v-row>
              <h5 class="text-center">
                قم برفع صور تتضمن معلومات تريد تصديقها
              </h5>
              <br />
              <v-file-input
                v-model="files"
                accept="image/*"
                prepend-icon="mdi-camera-plus"
                color="#FF6265"
                multiple
              ></v-file-input>
            </v-row>
            <v-divider id="Grey" dark></v-divider>
            <br />
            <v-row>
              <v-spacer></v-spacer>
              <v-btn @click="Validate" rounded outlined color="#FF6265">
                قم بإرسال طلب لتصديق حسابي
              </v-btn>
              <br /><br />
              <v-alert
                v-show="this.boolean"
                color="green"
                dark
                type="success"
              >
                تم إرسال الطلب بنجاح
              </v-alert>
            </v-row>
          </v-form>
          <br />
          <br />
        </v-col>
      </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import ErrorPage from "@/components/ErrorPage.vue";
export default {
  components: {
    Navbar,
    Sidebar,
    ErrorPage,
  },
  data() {
    return {
      files: [],
      boolean: false,
      noerror: false,
      checkquestions: false,
      notverified: false,
      notoken: false,
    };
  },
  mounted() {
    if (!localStorage.getItem("usertoken")) {
      this.notoken = true;
      return;
    }
    const token = "Bearer ".concat(localStorage.getItem("usertoken"));
    /// const token ='Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjUyNjY3MSwiZXhwIjoxNjMyOTM3MDcyLCJuYmYiOjE2MzI1MjY2NzIsImp0aSI6ImdhVVJYa0hLT0ZTMnZncTQiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.nsz9eFgELtk7uU-IKF_X8RIxkXusIrcjF22bWuhq7l4");///
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/profile",
      headers: { Authorization: token },
    })
      .then((response) => {
        this.noerror = true;
        this.VIP = response.data.VIP;
      })
      .catch((error) => {
        if (
          error.response.data.message === "Not all the questions are answered"
        ) {
          this.checkquestions = true;
        }
        if (error.response.data.message === "Email is not verified") {
          this.notverified = true;
        }
        return "error occoured";
      });
  },
  methods: {
    redirect() {
      this.$router.push({ name: "Login" });
    },
    quizpage() {
      this.$router.push({ name: "questions" });
    },
    Validate() {
      if (this.$refs.form.validate()) {
        const fd = new FormData();
        for (let file of this.files) {
          fd.append("image[]", file);
        }
        if (localStorage.getItem("usertoken") === null) this.$router.push("/");
        const option = {
          headers: {
            Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
          },
        }; //waiting for the login to be finished to store the access token
        //  const option = { headers: { Authorization: `${'Bearer'} ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjI1ODI5NCwiZXhwIjoxNjMyNDg4Njk0LCJuYmYiOjE2MzIyNTgyOTQsImp0aSI6Imc2VnR1TG42UFNVbGlFYVkiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.X2FBWU2iydp-agPiFxVKsTF30bCMmSuBP-e_T4sLDWo'}`,'Content-Type': 'multipart/form-data' } };//temp for testing the request
        axios
          .post("http://127.0.0.1:8000/api/certified", fd, option)
          .then(() => {
            this.boolean = true;
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#certifyme {
  background-color: #ffffff;
}

#Black {
  color: #000000;
}
#Grey {
  color: #979797;
}
#form {
  color: #ff6265;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}
.v-main {
  background-image: url(../assets/bb.jpg);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.bg {
  background-color: rgba(255, 255, 255, 0.9) !important;
  z-index: 2;
}

.font {
  font-family: 'Changa', sans-serif;
  /* You can also specify font-weight and other styles here */
}
</style>
