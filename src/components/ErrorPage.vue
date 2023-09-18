<template>
  <v-app>
    <v-main class="font">

      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="7" class="m-5 p-5 shadow rounded-3 bg">
            <div class="text-center">
              <v-alert text type="error" style="direction: rtl; font-weight: bolder;  font-size: 18px;">
                لقد انتهت مدة صلاحيتك للتصفح داخل الموقع يرجي تسجيل الدخول مرة أخرى.
              </v-alert>
              <v-btn style="font-size:18px; font-weight: bold;color: aliceblue;" depressed color="#bb9276"
                @click="redirect()"> تسجيل الدخول </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "ErrorPage",

  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    redirect() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
.bg {
  background-color: rgba(255, 255, 255, 0.9) !important;
  z-index: 2;
}


element.style {
  margin: 0px !important;
}

.font {
  font-family: 'Changa', sans-serif;
}
</style>