<template>
  <div id="app">
    <v-app id="content">
    <AdminNotAuth v-if="notoken"/>
    <v-main class="font"  v-if="!notoken">
      <AdminNavbar />
        <v-container>
          <v-row align="center" justify="center" class="m-5 p-5 shadow rounded-3 bg">
            <v-col>
    <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div style="font-size: 35px; color:black;">اضافة سؤال</div>
      <br>
      <div class="text--primary">
        <p style="font-size: 24px; color:blue;"> السؤال الجديد </p> 
        <input v-model="newq" placeholder="اكتب هنا" style="text-align: right;">
      </div>
      <br>
      <div>
        <p style="font-size: 24px; color:blue;"> النوع </p>
        <input  type="radio" id="Male" value="Male" v-model="gender" name="radAnswer"> 
        <label for="Male">ذكر</label>
        <br>
        <input type="radio" id="Female" value="Female" v-model="gender" name="radAnswer">
        <label for="Female">انثى</label>
        <br>
      </div>
      
    </v-card-text>
    <v-card-actions>
      <v-btn
        style="background-color: green; color: white;"
        color="teal accent-4"
        @click="reveal1 = true; createQ(newq, gender)"
      >
        تأكيد
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal1"
        class="transition-fast-in-fast-out v-card--reveal1"
        style="height: 100%;"
      >
        <v-card-text class="pb-0">
          <p class="text-h4 text--primary" style="font-size: 35px; color:black;">
            تم اضافة السؤال
          </p>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn
            style="background-color: red; color: white; "
            @click="redirect()"
          >
            الرجوع
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>

  <v-divider> </v-divider>

  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div style="font-size: 35px; color:black;">اضافة اجابة</div>
      <br>
      <div class="text--primary">
        <p style="font-size: 24px; color:blue;"> الاجابة الجديد </p> 
        <input v-model="newa" placeholder="اكتب هنا" style="text-align: right;">
      </div>
      <br>
      <div v-for="(q, index) in questions" :key="q" style="font-size: 24px; color:BlueViolet;">
        :Q{{index+1}}
      <v-card-actions>
      <v-btn
        style="background-color: green; color: white;"
        color="teal accent-4"
        @click="reveal2 = true; createA(q.question.id, newa)"
      >
        اضافة
      </v-btn>
    </v-card-actions>
    </div>
      
    </v-card-text>
    <v-expand-transition>
      <v-card
        v-if="reveal2"
        class="transition-fast-in-fast-out v-card--reveal2"
        style="height: 100%;"
      >
        <v-card-text class="pb-0">
          <p class="text-h4 text--primary" style="font-size: 35px; color:black;">
            تم اضافة الاجابة
          </p>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn
            style="background-color: red; color: white; "
            @click="reveal2 = false;"
          >
            اجابة اخرى
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>

  <v-divider> </v-divider>

  <v-btn
    style="background-color: red; color: white;"
    @click="redirect()"
  >
    رجوع لقائمة الاسئلة
  </v-btn>
  </v-col>
  </v-row>
  </v-container>
</v-main>

</v-app>










<!-- <v-card
    class="mx-auto"
    max-width="400"
    tile
    style="height: 500px;"
     >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>اضافة سؤال</v-list-item-title>
        <input v-model="newq" placeholder="السؤال الجديد">
        <input v-model="gender" placeholder="النوع">
      </v-list-item-content>
    </v-list-item>
    <v-btn
    @click="create(newq, gender)"
    > Test </v-btn> 
    </v-card> -->
  </div>
</template>
<script>
import axios from "axios";
import AdminNavbar from '@/components/AdminNavbar.vue'
import AdminNotAuth from "./AdminNotAuth.vue";
// import AdminSidebar from '@/components/AdminSidebar.vue'

export default {

    data(){
        return {
            questions: ["Q1", "Q2", "Q3", "Q4"],
            reveal1: false,
            reveal2: false,
        }
    },

    components: {
    AdminNavbar,
    AdminNotAuth,
  },

    mounted() {
      const AuthStr = 'Bearer '.concat(localStorage.getItem('adminToken'));
      axios.get("http://127.0.0.1:8000/api/getAllQuestionsandAnswers", {headers: {Authorization: AuthStr}})
          .then(response => {
            this.questions = response.data[0];
          })
    },

    methods:{
        createQ(q, g) {
        const AuthStr = 'Bearer '.concat(localStorage.getItem('adminToken'));
        axios({
            method: 'post',
            url: "http://127.0.0.1:8000/api/createQuestion",
            headers: {Authorization: AuthStr},
            data: {
            question: q, // This is the body part
            gender: g,
            }
          });
        },

        createA(id, a) {
        const AuthStr = 'Bearer '.concat(localStorage.getItem('adminToken'));
        axios({
            method: 'post',
            url: "http://127.0.0.1:8000/api/addSuggestedAnswer",
            headers: {Authorization: AuthStr},
            data: {
            answer: a, // This is the body part
            question_id: id,
            }
          });
        },

        redirect() {
        this.$router.push("AdminQuestions");
        },

        
    }
}
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