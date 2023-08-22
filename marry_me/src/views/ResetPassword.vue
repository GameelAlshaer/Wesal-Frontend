<template>
  <v-app>

    <v-main>
      <navbar1 />

      <v-container>
        <v-row align="center" justify="center" >
          <v-col cols="7"  class="m-5 p-5 shadow rounded-3 bg">
     
              <div class="text-center">
                <p style=" font-size: 38px; font-weight: bold; color: #bb9276;">إعادة تعيين كلمة المرور</p>
              </div>

              <v-form method="post" style=" text-align: center;" name="form" ref="form" v-model="valid" lazy-validation @submit.prevent="resetPassword">
                <v-text-field id="password" label="كلمة المرور" name="password" v-model="password"
                  color="red darken-0" :rules="passwordRules" prepend-inner-icon="mdi-lock"
                  :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword" class="rounded-2" outlined required></v-text-field>
                <v-text-field id="passwordconfirmation" ref="confirmPassword" label="تأكيد كلمة المرور"
                  name="confirmPassword" v-model="confirmPassword" color="red darken-0" :rules="confirmRules"
                  prepend-inner-icon="mdi-lock" :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"
                  class="rounded-2" outlined required></v-text-field>
                <div>
                  <span auto-draw-duration="100" style="color: #ff6265" id="message"></span>
                </div>

                <v-btn @click="check" style="
                    background-color: #bb9276;
                    color: white;
                    border-radius: 5px;
                    font-weight: bold;
                  " type="submit" x-large block>إعادة كلمة المرور
                </v-btn>
                <v-alert v-model="alert" dismissible type="success">تم إعادة كلمة المرور بنجاح
                </v-alert>
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
  name: "resetpassword",
  components: {
    navbar1,
    Footer,
  },

  props: {
    email: null,
  },
  data: () => ({
    alert: false,
    message: "",
    error: "",
    passwordRules: [
      (v) => !!v || "كلمة المرور مطلوبة",
      (v) => (v && v.length > 8) || "كلمة المرور يجب أن تكون على الأقل 8 أحرف",
    ],
    confirmRules: [(v) => !!v || "تأكيد كلمة المرور مطلوب"],
    password: "",
    confirmPassword: "",
    showPassword: false,
    errrConfirm: "",
    //email:this.$route.params.email,
  }),

  methods: {
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

    resetPassword() {
      if (this.$refs.form.validate()) {
        axios({
          method: "post",
          url: "http://127.0.0.1:8000/api/reset-password",
          // headers:{Authorization: AuthStr},
          data: {
            password: this.password,
            password_confirmation: this.confirmPassword,
            token: this.$route.params.token,
            email: this.$route.params.email,
          },
        })
          .then((res) => {
            if (res.data.message == "Your password has been reset!") {
              this.alert = true;
            }
            // this.$store.state.usertoken = res.data.access_token;
            localStorage.setItem("usertoken", res.data.AccessToken);

            this.$router.push({ name: "Login" });
          })
          .catch((err) => {
            if (err.response.status === 404) {
              alert("لا يوجد مثل هذا المستخدم");
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