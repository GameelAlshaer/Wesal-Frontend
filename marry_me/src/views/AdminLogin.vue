<template>
  <v-app>
    <v-main>
      <navbar1 />
      <v-container >
        <v-row align="center" justify="center" >
          <v-col cols="7"  class="m-5 p-5 shadow rounded-3 bg">
            <p style="font-weight: bold; font-size: 40px;color: #bb9276;text-align: center;">تسجيل دخول الأدمن</p>
            <v-alert v-show="this.show1" style="" color="#c84545" dark>
                لا يوجد مثل هذا المستخدم ، اسم المستخدم أو كلمة
                المرور غير صالحة
              </v-alert>

          <v-form method="post" style="text-align: center;" name="form" ref="form" v-model="valid" lazy-validation @submit.prevent="Login">
            <v-text-field label="اسم المستخدم" class="w-100" name="username" :rules="usernameRules"
              v-model="username" prepend-inner-icon="mdi-account" type="username" outlined color="#198754"></v-text-field>
            <v-text-field label="كلمة المرور" name="password" class="w-100" :rules="passwordRules"
              v-model="password" prepend-inner-icon="mdi-lock" :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"
              outlined color="#198754"></v-text-field>

            <v-btn :disabled="!valid" @click="validate" type="submit" style="background-color: #bb9276 !important ;color: white;font-weight: bold ;color: white;
                      border-radius: 5px;
                    " x-large block class="my-3">تسجيل الدخول</v-btn>

          </v-form>
          </v-col>
        </v-row>
      </v-container>
      <Footer />

    </v-main>
  </v-app>
</template>

<script>
import Footer from "@/components/footer.vue";
import navbar1 from '@/components/navbar1.vue';
import axios from "axios";
export default {
  name: "Login",
  components: {
    navbar1,
    Footer,
  },
  data: () => ({
    show1: false,
    answer: [],
    valid: true,
    usernameRules: [
      (v) => !!v || "اسم المستخدم مطلوب",
      //(v) => /.+@.+\..+/.test(v) || "الايميل يجب ان يكون صالحا",
    ],
    passwordRules: [
      (v) => !!v || "كلمه المرور مطلوبه",
      (v) => (v && v.length >= 8) || "كلمه المرور يجب ان تكون على الاقل 8 أحرف",
    ],
    username: "",

    password: "",

    showPassword: false,

    error: null,
    success: false,
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },

    Login() {
      //const AuthStr = 'Bearer '.concat(localStorage.getItem('usertoken'));
      if (this.$refs.form.validate()) {
        axios({
          method: "post",
          url: "http://127.0.0.1:8000/api/login/Admin",

          data: {
            username: this.username,
            password: this.password,
          },
        })
          .then((res) => {
            // this.$store.state.usertoken = res.data.AccessToken;
            localStorage.setItem("adminToken", res.data.AccessToken);
            // if(res.data.message =="logged in successfully"/*status== 200*/){
            this.$router.push({ name: "AdminHomePage" });
            // }
          })
          .catch((err) => {
            if (err.response.status == 404) {
              this.show1 = true;
            }
          });
      }
    },
  },
};
</script>

<style lang="css" scoped>
.v-main {
  background-image: url(../assets/date.jpg);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.bg{
  background-color:  rgba(255,255,255,0.9) !important;
  z-index: 2;
}

</style>
