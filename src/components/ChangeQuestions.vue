<template>
  <v-app class="font">
    <v-main>
      <v-container>
      <v-row align="center" justify="center" class="m-5 p-5 shadow rounded-3 bg">
        <div id="app " class="font">
          <v-col>
            <v-btn class="mb-2" fab dark color="#e9bba1" @click="redirect()">
              <v-icon dark> mdi-plus</v-icon>
            </v-btn>
            <p style="color:black; font-size: 24px;"> إضافة سؤال </p>
          </v-col>
          <v-row v-for="(q, index) in questions" :key="index" :align="start">
            <v-col :cols="1">
              <v-card tile class="pa-2" style="background-color:#3d3d3d; color: white;">
                السؤال {{ index + 1 }}
              </v-card>
            </v-col>
            <v-col>
              <v-card class="pa-1" tile style="color:#dc804b;">
                {{ q.question.question }}
              </v-card>

              <v-card class="pa-1 d-flex justify-content-center">
                <v-dialog v-model="dialog1" width="500">
                  <template v-slot:activator="{ on, attrs1 }">
                    <v-icon v-bind="attrs1" v-on="on" style="color: red;font-size: 27px" depressed>
                      mdi-delete
                    </v-icon>
                  </template>

                  <v-card>
                    <v-card-title style="background-color:red  ;color:white" class="font lighten-2">
                      تأكيد المسح؟
                    </v-card-title>


                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="font fw-bold" color="red" text @click="removeQ(q.question.id)">
                        تأكيد
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>


                <v-dialog v-model="dialog2" width="500">
                  <template v-slot:activator="{ on, attrs2 }">
                    <v-icon v-bind="attrs2" v-on="on" style="color: green;font-size: 27px" depressed>
                      mdi-application-edit
                    </v-icon>
                  </template>

                  <v-card>
                    <v-card-title style="background-color:green ; color:white" class="font lighten-2">
                      تغيير السؤال
                    </v-card-title>
                    <v-card-text>
                      <br>
                      <div class=" font">
                        <p style="font-size: 24px; color:green;"> السؤال الجديد </p>
                        <input v-model="newq" placeholder="اكتب هنا" class="w-75 border-1" style="text-align: right;">
                      </div>
                      <br>
                      <div class="font">
                        <p style="font-size: 24px; color:green;"> النوع </p>
                        <div class="d-flex justify-content-center">
                          <div class="mx-3">
                            <input type="radio" class="mx-1" id="Male" value="Male" v-model="gender" name="radAnswer">
                            <label for="Male">ذكر</label>
                          </div>
                          <div class="mx-3">
                            <input type="radio" class="mx-1" id="Female" value="Female" v-model="gender" name="radAnswer">
                            <label for="Female">انثى</label>
                          </div>
                        </div>
                      </div>

                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn style="background-color: green; color: white; font-weight: bold;" class="font"
                        @click="editQ(q.question.id, gender, newq)">
                        تأكيد
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card>
            </v-col>


            <v-col v-for="(ans, id) in q.answers" :key="id">
              <v-card class="pa-1" tile style="color:#3d3d3d;">
                اجابة({{ id + 1 }}):
                {{ ans.answer }}
              </v-card>

              <v-card>
                <v-dialog v-model="dialog4" width="500">
                  <template v-slot:activator="{ on, attrs3 }">
                    <v-icon v-bind="attrs3" v-on="on" style="color: red;font-size: 27px" depressed>
                      mdi-delete
                    </v-icon>
                  </template>

                  <v-card>
                    <v-card-title style="background-color:red  ;color:white" class="font lighten-2">
                      تأكيد المسح؟
                    </v-card-title>


                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="font fw-bold" color="red" text @click="removeA(ans.id)">
                        تأكيد
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog4" width="500">
                  <template v-slot:activator="{ on, attrs4 }">
                    <v-icon v-bind="attrs4" v-on="on" style="color: green;font-size: 27px" depressed>
                      mdi-application-edit
                    </v-icon>
                  </template>

                  <v-card>
                    <v-card-title style="background-color:green ; color:white" class="font lighten-2">
                      تغيير الاجابة
                    </v-card-title>
                    <v-card-text>
                      <br>
                      <div class="font">
                        <p style="font-size: 24px; color:green;"> الإجابة الجديدة </p>
                        <input v-model="newq" class="w-75 border-1" placeholder="اكتب هنا" style="text-align: right;">
                      </div>
                      <br>

                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn style="background-color: green; color: white; font-weight: bold;" class="font"
                        @click="editA(ans.id, newq)">
                        تأكيد
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-row>

    </v-container>
    </v-main>
  </v-app>
</template>



<script>
import axios from "axios";
export default {

  data() {
    return {
      questions: ["Q1", "Q2", "Q3", "Q4"],

    }
  },

  // props: [index],

  mounted() {
    this.reload();
  },

  methods: {

    reload() {
      const AuthStr = 'Bearer '.concat(localStorage.getItem('adminToken'));
      axios.get("http://127.0.0.1:8000/api/getAllQuestionsandAnswers", { headers: { Authorization: AuthStr } })
        .then(response => {
          this.questions = response.data[0];
        })
    },

    removeQ(ID) {
      const AuthStr = 'Bearer '.concat(localStorage.getItem('adminToken'));
      axios({
        method: 'delete',
        url: "http://127.0.0.1:8000/api/deleteQuestion",
        headers: { Authorization: AuthStr },
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
        headers: { Authorization: AuthStr },
        data: {
          id: messageID, // This is the body part
          question: messageQ,
          gender: messageG,
        }
      });
      this.reloadPage();
    },

    removeA(ID) {
      const AuthStr = 'Bearer '.concat(localStorage.getItem('adminToken'));
      axios({
        method: 'delete',
        url: "http://127.0.0.1:8000/api/deleteSuggestedAnswer",
        headers: { Authorization: AuthStr },
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
        headers: { Authorization: AuthStr },
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

    reloadPage() {
      setTimeout(() => {
        location.reload();
      }, 800);
    },
  }
}
</script>

<style scoped>
.font {
  font-family: 'Changa', sans-serif;
}

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