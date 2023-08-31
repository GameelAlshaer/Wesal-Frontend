<template>
  <v-app>
    <v-main class="font">
      <navbar1 />
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="7" class="m-5 p-5 shadow rounded-3 bg">
            <div class="text-center" style="color:black ; font-weight: bold; font-size: 1.25rem;">
              <p>من فضلك أدخل عنوان بريدك الإلكتروني وسوف نرسل لك تعليمات حول كيفية إعادة كلمة المرور </p>
            </div>
            <v-alert v-if="this.alert" style="" color="green" dark>
              تم إرسال رابط إعادة تعيين كلمة المرور بنجاح
            </v-alert>
            <v-alert v-if="this.alert1" style="" color="#c84545" dark>
              لا يوجد مثل هذا البريد الإلكتروني
            </v-alert>
            <v-form style="text-align: center;" method="post" @submit.prevent="forgotPassword">
              <v-text-field label="أدخل عنوان بريدك الإلكتروني" name="email" prepend-inner-icon="mdi-email"
                :rules="emailRules" v-model="email" color="#198754" type="email" class="rounded-2"
                outlined></v-text-field>
              <v-btn style="
                    background-color: #bb9276;
                    color: white;
                    border-radius: 5px;
                  " type="submit" x-large block>إرسال</v-btn>
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
  name: "forgotPassword",
  components: {
    Footer,
    navbar1,
  },
  data: () => ({
    alert: false,
    alert1: false,
    email: "",
    message: "",
    error: "",
    emailRules: [
      (v) => !!v || "البريد الإلكتروني مطلوب",
      (v) => /.+@.+\..+/.test(v) || "البريد الإلكتروني يجب ان يكون صالحا",
    ],
  }),

  methods: {
    forgotPassword() {
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/forgot-password",
        data: {
          email: this.email,
        },
      })
        .then((res) => {
          //this.$store.state.usertoken = res.data.access_token;
          localStorage.setItem("usertoken", res.data.AccessToken);
          if (res.data.message == "Reset password link sent successfully") {
            this.alert = true;
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            this.alert1 = true;
          }
         
        });
  
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

.bg {
  background-color: rgba(255, 255, 255, 0.9) !important;
  z-index: 2;
}
.font{
  font-family: 'Changa', sans-serif;
}
</style>