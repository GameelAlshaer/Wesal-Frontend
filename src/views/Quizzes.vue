
<template>
  <v-app>
    <v-main>
    <navbar1 />
    
    <v-container>
        <v-row align="center" justify="center" >
          <v-col cols="10"  class="m-5 p-5 shadow rounded-3 bg">
    <div id="app" >
            <h1 style="text-align: center;color: #bb9276; font-weight: bold; ">أسئلة التسجيل</h1>
          <Questions />
          <ErrorPage style="margin: 50px !important" v-if="error" />
      </div>
      </v-col>
      </v-row>
      </v-container>
    <Footer />
  </v-main>
  </v-app>
</template>

<script>
import ErrorPage from "@/components/ErrorPage.vue";
import Questions from "@/components/Questions.vue";
import navbar1 from '@/components/navbar1.vue';
import Footer from "@/components/footer.vue";
export default {
  name: "Block",
  components: {
    ErrorPage,
    Questions,
    Footer,
    navbar1,
  },
  data() {
    return {
      blocks: [],
      drawer: false,
      group: null,
      error: false,
    };
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
<style scoped>
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

</style>