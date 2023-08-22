<template v-for="(id) in questions">
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step v-for="(question, id) in questions" :key="id" :complete="e1 > id" :step="id + 1" color="#bb9276">
        السؤال {{ id + 1 }}
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content v-for="(q, id) in questions" :key="id" :step="id + 1">
        <h2>{{ q.question.question }}</h2>
        <br />
        <br />

        <v-btn @click="
          e1 += 1;
        saveAnswer(q.question.id, ans.answer);
        " outlined large color="#bb9276" v-for="ans in q.answers" :value="ans.answer" :key="ans.id" :id="ans.id" class="w-100">
             {{ ans.answer }}
            </v-btn>

        <br />
        <br />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      e1: 1,
      questions: ["Q1", "Q2", "Q3", "Q4"],
      currentIdOfButton: null,
      nextId: null,
      currentId: null,
    };
  },
  mounted() {
    const AuthStr = "Bearer ".concat(localStorage.getItem("usertoken"));
    axios
      .get("http://127.0.0.1:8000/api/get-all-questions-with-gender", {
        headers: { Authorization: AuthStr },
      })
      .then((response) => {
        this.questions = response.data[0];
      });
  },
  methods: {
    redirect(name) {
      this.$router.push({ name: name });
    },
    saveAnswer(id, ans) {
      const AuthStr = "Bearer ".concat(localStorage.getItem("usertoken"));
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/save-answer",
        headers: { Authorization: AuthStr },
        data: {
          question_id: id, // This is the body part
          answer: ans,
        },
      }).then((res) => {
        if (res.data.Answered == 1) {
          this.redirect("HomePage");
        }
      });
    },
    changeStyle(id) {
      document.getElementById(id).style.backgroundColor = "green";
    },
  },
};
</script>

<style scoped>
.test {
  align-content: right;
}
</style>
