<template>
  <v-app>
    <v-main >   
      <navbar1 />
      <v-container>
        <v-row align="center" justify="center" >
         

          <v-col cols="7"  class="m-5 p-5 shadow rounded-3 bg">
            <p style="font-weight: bold; font-size: 40px;color: #bb9276;text-align: center;">تسجيل الدخول </p>
            <v-alert v-show="this.show1" style="" color="#c84545" dark>
            لا يوجد مثل هذا المستخدم ، البريد الإلكتروني أو كلمة
            المرور غير صالحة
          </v-alert>
          <v-form method="post"   name="form" ref="form" v-model="valid" lazy-validation
            @submit.prevent="Login">

            <v-text-field label="البريد الإلكتروني" name="email" :rules="emailRules" v-model="email "
              prepend-inner-icon="mdi-email" type="email" outlined color="#bb9276" class="rounded-2 w-100" ></v-text-field>

            <v-text-field label="كلمة المرور" name="password" :rules="passwordRules"
              v-model="password" prepend-inner-icon="mdi-lock" :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"
              class="rounded-2 w-100" outlined color="#bb9276" ></v-text-field>
            <div class="text-start" >
              <b-form-checkbox id="checkbox" style="display: inline;" v-model="remember"  name="remember" value="accepted" unchecked-value="not_accepted" class="pe-2"></b-form-checkbox>
              <label for="checkbox" style="display: inline; color: #bb9276;">تذكرني لاحقاً</label>

            </div>

            <v-btn @click="validate" type="submit" style="
                      background-color: #bb9276 !important;
                      color: white;
                      border-radius: 5px;
                      
                    " x-large block class="my-3">تسجيل الدخول</v-btn>

            <div class=" d-flex justify-content-around text-align-center" >
              <a @click="forgotPassword()"  class=" mx-5"  style=" color: #bb9276;"> هل نسيت كلمة المرور؟</a>
              <a @click="signUp()" class=" mx-5" style="color: #bb9276; ">إنشاء حساب</a>
            </div>




          </v-form>
          <v-btn @click="adminLogin" type="submit" style="
                    background-color: #bb9276 !important;
                    color: white;
                    border-radius: 5px;
             
                  " x-large block class="my-3 ">تسجيل دخول الأدمن</v-btn>

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
    emailRules: [
      (v) => !!v || "البريد الإلكتروني مطلوب",
      (v) => /.+@.+\..+/.test(v) || "البريد الإلكتروني يجب ان يكون صالحا",
    ],
    passwordRules: [
      (v) => !!v || "كلمة المرور مطلوبة",
      (v) => (v && v.length >= 8) || "كلمة المرور يجب ان تكون على الاقل 8 أحرف",
    ],
    email: "",

    password: "",
    remember: "",
    showPassword: false,
    checkbox: true,
    error: null,
    success: false,
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },

    forgotPassword() {
      this.$router.push({ name: "ForgotPassword" });
    },
    adminLogin() {
      this.$router.push({ name: "AdminLogin" });
    },
    signUp() {
      this.$router.push({ name: "Register" });
    },
    Login() {
      // const AuthStr = 'Bearer '.concat(localStorage.getItem('usertoken'));
      if (this.$refs.form.validate()) {
        axios({
          method: "post",
          url: "http://127.0.0.1:8000/api/login",
          // headers:{Authorization: AuthStr},
          data: {
            email: this.email,
            password: this.password,
            remember: this.remember,
          },
        })
          .then((res) => {
            // this.$store.state.usertoken = res.data.AccessToken;

            //sessionStorage.setItem("usertoken", res.data.AccessToken);
            localStorage.setItem("usertoken", res.data.AccessToken);
            // if(res.data.message =="logged in successfully"/*status== 200*/){

            this.$router.push({ name: "HomePage" });
            // }
          })
          .catch((err) => {
            if (err.response.status == 404) {
              this.show1 = true;
            }
          });

        //this.$router.push({ name: "HomePage" });
      }
    },
  },
};
</script>

<style lang="css" scoped>
.v-text-field__slot input {
  text-align: right;
}

.v-input__slot {
  width: 50rem;
  height: 62px;
}

.v-text-field {
  width: 400px;
}

rounded-0.v-btn.v-btn--block.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--x-large.tomato {
  background-color: rgb(25, 135, 84);
  border-radius: 10px;
}

input#input-64 {
  background-color: white;
}

.v-main{
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

#text {
  font-size: 20px;
  font-weight: bold;
}

div.v-image.v-responsive.theme--light {
  height: 50px;
  width: 50px;
  margin-left: 13px;
  margin-top: -3rem;
  margin-right: -27rem;
}

div.row.no-gutters.justify-center {
  width: 63rem;
  margin-right: -11rem;
}

div.v-alert.v-sheet.theme--dark.tomato {
  background-color: #bb9276;
  width: 27rem;
  margin-top: -7rem;
  margin-right: 0rem;
}

@media screen and (max-width: 963px) {
  p {
    font-weight: bold;
    /* font-weight: 100; */
    font-size: 26px;
    color: #bb9276;
    margin: -1rem 16rem 9rem -6rem;
    text-align: center;
    width: -15px;
    width: max-content;
  }
}

@media screen and (max-width: 780px) {
  body {
    width: 48rem;
    height: 32rem;
  }
}

@media screen and (max-width: 360px) {
  body {
    width: 31rem;
    height: 38rem;
  }
}

@media screen and (max-width: 780px) {
  div.v-image.v-responsive.theme--light {
    margin-right: -8rem;
    margin-top: -1rem;
  }
}
</style>
