  
<template>
  <v-app>
    <v-main class="font">
      <navbar1 />
      <v-container>
        <v-row  align="center" justify="center" >
          <v-col cols="7"  class="m-5 p-5 shadow rounded-3 bg">

        <v-form ref="form" style="text-align: center;" name="myform" v-model="valid" lazy-validation @submit.prevent="Register">
          <h2 style="font-weight: bold; font-size: 40px;color: #bb9276;text-align: center;">إنشاء حساب جديد</h2>
          <div>
            <v-btn type="submit" @click="signUpFacebook" style="font-size: 18px; color: white; background-color: darkblue;" class="w-50 mx-3 p-3 my-3">
              <i class="fa fa-facebook fa-fw"></i> تسجيل دخول عبر فيسبوك<v-icon style="color: white">mdi-facebook </v-icon>
            </v-btn>
            <v-btn type="submit" style="font-size: 18px; color: white; background-color: #bb9276;" @click="signUpGoogle" class="w-50 p-3 mb-3">
              <i class="fa fa-google fa-fw"></i>تسجيل دخول عبر جوجل
              <v-icon style="color: #bb9276;background-color: white; border-radius: 13px;font-size: 25px; ">
                mdi-google
              </v-icon>
            </v-btn>
          </div>
          <v-text-field id="name" label="الاسم الثلاثي" name="name"   color="red darken-0" v-model="name"
            :rules="nameRules" prepend-inner-icon="mdi-account" type="text" class="rounded-2 mt-3" outlined></v-text-field>
          <v-text-field id="Email" label="البريد الإلكتروني" name="email" v-model="email" color="#c84545" :rules="emailRules"
            prepend-inner-icon="mdi-email" type="email" class="rounded-2" outlined required></v-text-field>
          <div >
            <span v-if="this.errorEmail.length > 0" style="color: #c84545">{{ this.errorEmail }}</span>
          </div>
          <v-text-field id="password" onChange="check()" label="كلمة المرور" name="password" v-model="password"
            color="#c84545" :rules="passwordRules" prepend-inner-icon="mdi-lock"
            :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword" class="rounded-2" outlined required></v-text-field>
          <v-text-field id="passwordconfirmation" onChange="check()" ref="confirmPassword" label="تأكيد كلمة المرور"
            name="confirmPassword" v-model="confirmPassword" color="#c84545" :rules="[confirmRules.required]"
            prepend-inner-icon="mdi-lock" :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"
            class="rounded-2" outlined required></v-text-field>
          <div >
            <span style="color: #c84545" id="message"></span>
          </div>

          <v-form ref="myform" style="
                      text-align: center;

                    " name="myform" v-model="valid" lazy-validation @submit.prevent="signUpFacebook">
            <v-text-field ref="PhoneNumber" id="phone" label="رقم الموبايل" name="phone" v-model="phone" color="#198754"
              :rules="phoneRules" prepend-inner-icon="mdi-phone" type="phone" class="rounded-2" outlined
              required></v-text-field>
            <div >
              <span style="color: #c84545" id="message"></span>
            </div>

            <div >
              <span style="color: #c84545" id="message"></span>
            </div>
            <v-text-field id="birthday" ref="birthday" label="تاريخ الميلاد" name="birthday" v-model="birthday"
              color="#198754" :rules="birthdayRules"  type="date" class="rounded-2" outlined
              required></v-text-field>
              <div class="d-flex" >
            <v-radio-group class="nowrap" id="gender" ref="gender" label=":النوع" name="gender" v-model="gender" row :rules="genderRules">
              <v-radio label="أنثى" value="female" color="#198754"></v-radio>
              <v-radio label="ذكر" value="male" color="#198754"></v-radio>
            </v-radio-group>
          </div>
            <div >
              <span id="messageBirthday" v-if="this.errorBirthday.length > 0" style="color: #c84545">{{
                this.errorBirthday }}
              </span>
            </div>
          </v-form>
          <v-btn class="mt-3" @click="check" type="submit" style="
                      background-color: #bb9276;
                      color: white;
                    " x-large block dark>إنشاء حساب</v-btn>
          <div style="text-align: center; " class="text-center">
            <v-card-actions class="text--secondary">
              <v-spacer></v-spacer>
               هل لديك حساب؟ 
              <button class="mx-1" style="color: #bb9276;font-size: larger;" @click="signIn()">تسجيل دخول</button>
            </v-card-actions>
          </div>
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
  name: "Register",
  components: {
    navbar1,
    Footer,
  },
  data: () => ({
    show1: false,
    show2: false,
    showVerify: false,
    valid: true,
    nameRules: [(v) => !!v || "الاسم مطلوب"],
    emailRules: [
      (v) => !!v || "البريد الإلتروني مطلوب",
      (v) => /.+@.+\..+/.test(v) || "البريد الإلكتروني يجب ان يكون صالحاً",
    ],
    passwordRules: [
      (v) => !!v || "كلمة المرور مطلوبة",
      (v) => (v && v.length > 8) || "كلمة المرور يجب أن تكون على الأقل 8 أحرف",
    ],
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    birthday: "",
    confirmRules: {
      required: (v) => !!v || "تأكيد كلمة المرور مطلوب",
    },
    phoneRules: [(v) => !!v || "رقم الموبايل مطلوب"],
    genderRules: [(v) => !!v || "النوع مطلوب"],
    birthdayRules: [(v) => !!v || "تاريخ الميلاد مطلوب"],
    showPassword: false,
    checkbox: true,
    errorEmail: "",
    errrConfirm: "",
    errorBirthday: "",
  }),
  mounted() {
    this.HomePage();
  },
  methods: {
    signUpFacebook() {
      if (this.$refs.myform.validate()) {
        axios({
          method: "get",
          url: `${"http://127.0.0.1:8000/api/auth/facebook?gender="}${this.gender
            }${"&birth_day="}${this.birthday}${"&phone="}${this.phone}`,
        })
          .then((res) => {
            localStorage.setItem("usertoken", res.data.AccessToken);
            this.$router.push("questions");
          })
          .catch((err) => {
            if (err.response.status === 403) {
              alert("لقد استخدمت هذا الجهاز من قبل !!");
            }

            if (
              err.response.data.Errorsin.email ==
              "The email has already been taken."
            ) {
              this.errorEmail =
                "لقد تم تسجيل الدخول من قبل هذا البريد الإلكتروني";
            }
            if (
              err.response.data.Errorsin.birth_day ==
              "The birth day must be a date before 17 years ago."
            ) {
              this.errorBirthday = "يجب أن يكون تاريخ الميلاد قبل 17 عامًا";
            }
          });
      }
    },
    HomePage(){
      if(localStorage.getItem('usertoken') != null){
        this.$router.push({ name: "HomePage" });
      }

    },
    
    signUpGoogle() {
      if (this.$refs.myform.validate()) {
        axios({
          method: "get",
          url: `${"http://127.0.0.1:8000/api/auth/google?gender="}${this.gender
            }${"&birth_day="}${this.birthday}${"&phone="}${this.phone}`,
        })
          .then((res) => {
            localStorage.setItem("usertoken", res.data.AccessToken);
            this.$router.push("questions");
          })
          .catch((err) => {
            if (err.response.status === 403) {
              alert("لقد استخدمت هذا الجهاز من قبل !!");
              // this.show1=true;
            }
            // this.errorEmail=err.response.data.Errorsin.email;
            // this.errorBirthday=err.response.data.Errorsin.birth_day;
            if (
              err.response.data.Errorsin.email ==
              "The email has already been taken."
            ) {
              this.errorEmail =
                "لقد تم تسجيل الدخول من قبل هذا البريد الإلكتروني";
            }
            if (
              err.response.data.Errorsin.birth_day ==
              "The birth day must be a date before 17 years ago."
            ) {
              this.errorBirthday = "يجب أن يكون تاريخ الميلاد قبل 17 عامًا";
            }
          });
      }
    },
    check() {
      if (
        document.getElementById("password").value !=
        document.getElementById("passwordconfirmation").value
      ) {
        document.getElementById("message").innerHTML =
          "تأكيد كلمة المرور غير متطابق";
        document.getElementById("passwordconfirmation").focus();
      }
    },
    signIn() {
      this.$router.push({ name: "Login" });
    },
    validate() {
      this.$refs.myform.validate();
    },
    Register() {
      if (this.$refs.form.validate() || this.$refs.myform.validate()) {
        axios({
          method: "post",
          url: "http://127.0.0.1:8000/api/register",

          data: {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.confirmPassword,
            phone: this.phone,
            gender: this.gender,
            birth_day: this.birthday,
          },
        })
        
          .then((res) => {
            console.log("res.data");
            localStorage.setItem("usertoken", res.data.AccessToken);
            alert("تم التسجيل بنجاح!");
          })
          .catch((err) => {
            if (err.response.status === 400) {
              alert(
                "من فضلك يرجى إدخال البيانات والتحقق منها أولا لإنشاء حسابك"
              );
              // this.show1=true;
            }
            if (err.response.status === 403) {
              alert("لقد استخدمت هذا الجهاز من قبل !!");
              // this.show1=true;
            }
            // this.errorEmail=err.response.data.Errorsin.email;
            // this.errorBirthday=err.response.data.Errorsin.birth_day;
            if (
              err.response.data.Errorsin.email ==
              "The email has already been taken."
            ) {
              this.errorEmail =
                "لقد تم تسجيل الدخول من قبل هذا البريد الإلكتروني";
            }
            if (
              err.response.data.Errorsin.birth_day ==
              "The birth day must be a date before 17 years ago."
            ) {
              this.errorBirthday = "يجب أن يكون تاريخ الميلاد قبل 17 عامًا";
            }
          });
      }
    },
  },
};
</script>

<style lang="css" scoped>
.bg {
  background-color: rgba(255, 255, 255, 0.9) !important;
  z-index: 2;
}

.v-main {
  background-image: url(../assets/date.jpg);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.btn {
  opacity: 0.85;}

.btn:hover {
  opacity: 1;
}

.font{
  font-family: 'Changa', sans-serif;
}



</style>