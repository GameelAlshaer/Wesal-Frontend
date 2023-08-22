<template>
    <!-- {{ questions[0].question.question }}
    {{ questions[0].answers[0].answer }} -->
  <div id="app" style="padding-top:23px;">
    <v-btn
      class="mx-2"
      fab
      dark
      small
      color="primary"
      @click="redirect()"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
    <p style="color:black; font-size: 24px;"> اضافة سؤال </p>
    <v-spacer></v-spacer>
    <v-container
      fluid
    >
      <v-row
        v-for="(q, index) in questions"
        :key="index"
        :align="start"
        no-gutters
        style="height: 400px;"
        justify="space-around"
      >
        <v-col
          :cols="1"
        >
          <v-card
          tile
          class="pa-2"
          style="background-color:black; color: white;"
          >
          السؤال {{index + 1}}
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="pa-1"
            tile
            style="color:Indigo;"
          >
            {{q.question.question}}
          </v-card>
        </v-col>

        <v-col :cols="6">
          <v-card
              class="pa-2"
              max-width="12%"
              tile
          >
      <v-dialog
      v-model="dialog1"
      width="500"
      >
      <template v-slot:activator="{on, attrs1}">
        <v-icon
            v-bind="attrs1"
            v-on="on"
            style="color: red;font-size: 27px" depressed
            >
            mdi-delete
        </v-icon>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          تأكيد المسح؟
        </v-card-title>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="removeQ(q.question.id)"
          >
          تأكيد
          </v-btn>
        </v-card-actions>
        </v-card>
        </v-dialog>
        
        
      <v-dialog
      v-model="dialog2"
      width="500"
      >
      <template v-slot:activator="{on, attrs2}">
        <v-icon
                v-bind="attrs2"
                v-on="on"
                style="color: green;font-size: 27px" depressed
              >
              mdi-application-edit
        </v-icon>
        </template>

        <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          تغيير السؤال
        </v-card-title>

        <v-divider></v-divider>
        
        <v-card-text>
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
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="editQ(q.question.id, gender, newq)"
          >
          تأكيد
          </v-btn>
        </v-card-actions>
        </v-card>
        </v-dialog>        
        </v-card>

        <v-col v-for="(ans, id) in q.answers" :key="id">
          <v-card
            class="pa-1"
            tile
            style="color:red;"
          >
            اجابة({{id + 1}}):
            {{ ans.answer }}
          </v-card>
        
        <v-card>
        <v-dialog
        v-model="dialog3"
        width="500"
        >
        <template v-slot:activator="{on, attrs3}">
          <v-icon
              v-bind="attrs3"
              v-on="on"
              style="color: red;font-size: 27px" depressed
              >
              mdi-delete
          </v-icon>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            تأكيد المسح؟
          </v-card-title>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="removeA(ans.id)"
            >
            تأكيد
            </v-btn>
          </v-card-actions>
          </v-card>
          </v-dialog>
          <v-dialog
      v-model="dialog4"
      width="500"
      >
      <template v-slot:activator="{on, attrs4}">
        <v-icon
                v-bind="attrs4"
                v-on="on"
                style="color: green;font-size: 27px" depressed
              >
              mdi-application-edit
        </v-icon>
        </template>

        <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          تغيير الاجابة
        </v-card-title>

        <v-divider></v-divider>
        
        <v-card-text>
        <br>
        <div class="text--primary">
          <p style="font-size: 24px; color:blue;"> الاجابة الجديد </p> 
          <input v-model="newq" placeholder="اكتب هنا" style="text-align: right;">
        </div>
        <br>
      
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="editA(ans.id, newq)"
          >
          تأكيد
          </v-btn>
        </v-card-actions>
        </v-card>
        </v-dialog>
        </v-card>
        </v-col>
      





















        </v-col>
      </v-row>
    </v-container>
  </div>
</template>



<script>
import axios from "axios";

export default {
    
    data () {
      return {
        questions: ["Q1", "Q2", "Q3", "Q4"],

      }
    },

    // props: [index],

    mounted() {
      this.reload();
    },

    methods: {

        reload(){
          const AuthStr = 'Bearer '.concat(localStorage.getItem('adminToken'));
           axios.get("http://127.0.0.1:8000/api/getAllQuestionsandAnswers", {headers: {Authorization: AuthStr}})
          .then(response => {
            this.questions = response.data[0];
          })
        },

        removeQ(ID) {
        const AuthStr = 'Bearer '.concat(localStorage.getItem('adminToken'));
        axios({
            method: 'delete',
            url: "http://127.0.0.1:8000/api/deleteQuestion",
            headers: {Authorization: AuthStr},
            data: {
            id: ID, // This is the body part
            }
        });
        this.reloadPage();
        },

        editQ(messageID, messageG, messageQ) {
        const AuthStr = 'Bearer '.concat(localStorage.getItem('adminToken'));
        axios({
            method: 'patch',
            url: "http://127.0.0.1:8000/api/editQuestion",
            headers: {Authorization: AuthStr},
            data: {
            id: messageID, // This is the body part
            question: messageQ,
            gender: messageG,
            }
        });
        this.reloadPage();
        },

        removeA(ID){
            const AuthStr = 'Bearer '.concat(localStorage.getItem('adminToken'));
            axios({
            method: 'delete',
            url: "http://127.0.0.1:8000/api/deleteSuggestedAnswer",
            headers: {Authorization: AuthStr},
            data: {
            answer_id: ID, // This is the body part
            }
        });
        this.reloadPage();
        },

        editA(messageID, messageA) {
        const AuthStr = 'Bearer '.concat(localStorage.getItem('adminToken'));
        axios({
            method: 'patch',
            url: "http://127.0.0.1:8000/api/editSuggestedAnswer",
            headers: {Authorization: AuthStr},
            data: {
            answer_id: messageID, // This is the body part
            answer: messageA,
            }
        });
        this.reloadPage();
        },

        redirect() {
        this.$router.push("AddQuestion");
        },

        reloadPage(){
          setTimeout(() => {
            location.reload();
          }, 800);
        },
    }
}
</script>

<style scoped>
  h1{
    height: 5%;
    width: 60%;
    font-size: 35px;
  }
</style>