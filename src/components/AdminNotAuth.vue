<template>
<v-app v-if="notoken">
        <div class="text-center font" style="margin: 50px !important">
          <v-alert text prominent type="error" icon="mdi-cloud-alert" style="direction: rtl;
            font-size: 1.5rem;
            font-weight: bold;">
            لقد انتهت مدة صلاحيتك للتصفح داخل الموقع يرجى تسجيل الدخول مرة اخرى
          </v-alert>
          <v-btn depressed style=" background-color: #e9bba1; font-weight: bold; font-size: large; " @click="redirect()">
            تسجيل الدخول
          </v-btn>
        </div>
      </v-app>

</template>

<script>

export default {
    name: 'AdminNotAuth',
  data() {
    return {
      notoken: false,
    }
  },
  methods: {
    redirect() {
      this.$router.push({ name: "AdminLogin" });
    },
  },
  mounted() {
    if (localStorage.getItem('token') == null) {
      this.notoken = true
    }
  }
}

</script>
<style scoped></style>