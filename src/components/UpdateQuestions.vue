<!-- <template>
    <v-card
    class="mx-auto"
    outlined
  >
  
    
    <p  
        style="font-family: verdana;
        font-size: 15px;"
        v-for="(q, index) in questions"
        :key="index">
        {{q.question.question}}
        <v-divider> </v-divider>
    </p>

    <div class="text-center" name="delete">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{on, attrs}">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          مسح
        </v-btn>
      </template>

        <v-card>
            <v-card-title class="text-h5 grey lighten-2">
            ما هو رقم السؤال الذي تريد مسحه؟
            </v-card-title>

            <v-divider></v-divider>

            <v-card-actions>
            <input v-model="messageID" name="messageID" placeholder="ID">
            <v-spacer></v-spacer>
            <v-btn
                color="accent"
                @click="remove(messageID)"
            >
                تأكيد
            </v-btn>
            
            </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    
    <!-- <div class="text-center" name="edit">
    <v-dialog
      v-model="dialog"
      width="750"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="green lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
          style=";"
        >
          تعديل
        </v-btn>
      </template>

        <v-card>
            <v-card-title class="text-h5 grey lighten-2">
            تعديل الاسئلة
            </v-card-title>

            <v-divider></v-divider>

            <v-card-actions>
            <input v-model="messageID" name="messageID" placeholder="ID">
            <v-spacer></v-spacer>
            <input v-model="messageQ" name="messageQ" placeholder="السؤال الجديد">
            <v-spacer></v-spacer>
            <input v-model="messageG" name="messageG" placeholder="النوع">
            <v-spacer></v-spacer>
            <v-btn
                color="accent"
                @click="edit(messageID, messageG, messageQ)"
            >
                تأكيد
            </v-btn>
            </v-card-actions>
        </v-card>
     </v-dialog>
    </div> 
  </v-card>
</template> -->

<script>
import axios from "axios";

export default {
    data () {
      return {
        questions: ["Q1", "Q2", "Q3", "Q4"],
        dialog: false,
        messageID: "",
        messageG: "",
        messageQ: ""
      }
    },
    mounted() {
      const AuthStr = 'Bearer '.concat(localStorage.getItem('usertoken'));
      axios.get("http://127.0.0.1:8000/api/get-all-questions-with-answers", {headers: {Authorization: AuthStr}})
          .then(response => {
            this.questions = response.data[0];
            
          })
    },
    methods: {
        remove(messageID) {
        const AuthStr = 'Bearer '.concat(localStorage.getItem('adminToken'));
        axios({
            method: 'delete',
            url: "http://127.0.0.1:8000/api/deleteQuestion",
            headers: {Authorization: AuthStr},
            data: {
            id: messageID, // This is the body part
            }
        });
        this.dialog = false;
        document.getElementById(messageID).style.display='none';
        },
        edit(messageID, messageG, messageQ) {
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
        this.dialog = false;
        document.getElementById(messageID).style.display='none';
        this.count();
        },
    }
}
</script>