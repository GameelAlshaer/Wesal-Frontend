<template>
  <v-app>
    <v-app v-if="notoken == true">
      <ErrorPage style="margin: 50px !important" v-if="notoken" />
    </v-app>
    <v-app v-if="notverified == true">
      <div class="text-center" style="margin: 50px !important">
        <v-alert
          text
          prominent
          type="error"
          icon="mdi-cloud-alert"
          style="direction: rtl"
        >
          من فضلك قم باعادة التسجيل الدخول و التحقق من حسابك
        </v-alert>
        <v-btn depressed color="primary" @click="redirect()">
          نسجيل الدخول
        </v-btn>
      </div>
    </v-app>
    <v-app v-if="checkquestions == true">
      <div class="text-center" style="margin: 50px !important">
        <v-alert
          text
          prominent
          type="error"
          icon="mdi-cloud-alert"
          style="direction: rtl"
        >
          من فضلك قم باجابة جميع اسئلتك قبل التصفح
        </v-alert>
        <v-btn depressed color="primary" @click="quizpage()">
          الذهاب للاسئلة
        </v-btn>
      </div>
    </v-app>

    <v-main id="content" v-if="noerror">
      <Navbar v-if="noerror" />
      <Sidebar v-if="noerror" />
      <v-row>
        <v-col cols="12" id="Black">
          <br />
          <br />
          <h1 class="text-center">حسابي الشخصي</h1>

          <br />
          <v-form ref="form" id="form">
            <v-row>
              <v-img
                id="avatar"
                class="preview"
                rounded
                :src="useravatar"
                max-height="200"
                max-width="200"
              >
              </v-img>
              <v-file-input
                @change="previewImage"
                hide-input
                v-model="file"
                accept="image/*"
                prepend-icon="mdi-camera-plus"
                color="#FF6265"
              ></v-file-input>
            </v-row>
            <br />
            <br />
            <v-btn
              @click="RemoveAvatar"
              rounded
              outlined
              style="width: 230px"
              color="#FF6265"
              small
            >
              ازالة صورة الملف الشخصي
            </v-btn>

            <br />
            <br />
            <v-divider id="Grey" dark></v-divider>
            <br />
            <v-row>
              <h3 id="Black">
                {{ Name }}
              </h3>
              <v-icon v-if="Certified" color="#FF6265">mdi-check-circle</v-icon>
            </v-row>
            <br />
            <h3 id="Grey">
              {{ Email }}
            </h3>
            <br />
            <br />
            <v-row>
              <v-text-field
                v-model="PhoneNumber"
                style="width: 200px"
                label="رقم الموبايل"
                color="#FF6265"
                :rules="[rules.number, rules.required]"
              ></v-text-field>

              <v-text-field
                v-model="BirthDay"
                label="تاريخ الميلاد"
                style="width: 200px"
                color="#FF6265"
                disabled
              ></v-text-field>
              <v-text-field
                v-model="Gender"
                label="النوع"
                style="width: 200px"
                color="#FF6265"
                disabled
              ></v-text-field>
            </v-row>
            <br />
            <v-row>
              <v-text-field
                v-model="NumberOfReports"
                style="width: 200px"
                label="عدد مرات الابلاغ"
                color="#FF6265"
                disabled
              ></v-text-field>
              <v-text-field
                v-model="NumberOfBans"
                label="عدد مرات الحظر"
                style="width: 200px"
                color="#FF6265"
                disabled
              ></v-text-field>
            </v-row>
            <br />
            <br />
            <v-divider id="Grey" dark></v-divider>
            <br />
            <v-row>
              <v-divider class="test" dark></v-divider>
              <v-alert border="left" color="#ff6265" dark rounded>
                <h3 id="Black">الاسئله</h3>
              </v-alert>
              <br /><br />
              <v-card width="700" class="mx-auto" hover="true">
                <v-list two-line>
                  <template v-for="i in Info.length">
                    <v-divider :key="i"></v-divider>
                    <v-list-item :key="i">
                      <v-list-item-content>
                        <v-list-item-title>{{
                          Info[i - 1][0][0].question
                        }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                          Info[i - 1][2][0].answer
                        }}</v-list-item-subtitle>
                        <br /><br />
                        <div>
                          <h6 v-if="vip && Info[i - 1][1][0].hidden" id="form">
                            هذا السؤال غير ظاهر للمسنخدمين الاخرين
                          </h6>
                          <v-btn
                            v-if="vip && Info[i - 1][1][0].hidden"
                            @click="UnHideData(Info[i - 1][0][0].id)"
                            rounded
                            outlined
                            color="#FF6265"
                            style="width: 130px"
                          >
                            اظهار السؤال
                          </v-btn>

                          <h6 v-if="vip && !Info[i - 1][1][0].hidden" id="form">
                            هذا السؤال ظاهر للمسنخدمين الاخرين
                          </h6>
                          <v-btn
                            v-if="vip && !Info[i - 1][1][0].hidden"
                            @click="HideData(Info[i - 1][0][0].id)"
                            rounded
                            outlined
                            color="#FF6265"
                            style="width: 130px"
                          >
                            اخفاء السؤال
                          </v-btn>

                          <v-btn
                            @click="
                              showAnswers = true;
                              currentID = Info[i - 1][0][0].id;
                              getAllAnswers(Info[i - 1][0][0].id);
                            "
                            rounded
                            outlined
                            color="#FF6265"
                            style="width: 130px"
                          >
                            <v-icon left> mdi-pencil </v-icon>
                            تعديل الاجابه
                          </v-btn>
                          <div
                            v-if="
                              showAnswers && currentID == Info[i - 1][0][0].id
                            "
                          >
                            <v-list>
                              <template v-for="answer in Answers">
                                <v-list-item :key="answer">
                                  <v-list-item-content>
                                    <v-radio-group v-model="radioGroup">
                                      <v-radio
                                        :label="answer.answer"
                                        :value="answer.id"
                                      ></v-radio>
                                    </v-radio-group>
                                  </v-list-item-content>
                                </v-list-item>
                              </template>
                            </v-list>
                            <v-btn
                              @click="
                                showAnswers = false;
                                ChangeAnswer(Info[i - 1][0][0].id);
                              "
                              rounded
                              outlined
                              color="#FF6265"
                              style="width: 30px"
                            >
                              تعديل
                            </v-btn>
                            <v-btn
                              @click="showAnswers = false"
                              rounded
                              outlined
                              color="#FF6265"
                              style="width: 30px"
                            >
                              الغاء
                            </v-btn>
                          </div>
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list>
              </v-card>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <div>
                <br /><br />
                <v-btn
                  @click="saveChanges"
                  rounded
                  outlined
                  color="#FF6265"
                  style="width: 230px"
                >
                  تحديث الحساب
                </v-btn>
                <v-alert
                  v-if="updataBoolean"
                  color="#FF6265"
                  text
                  prominent
                  icon="mdi-cloud-alert"
                  style="direction: rtl"
                >
                  <h6>تم تعديل الحساب بنجاح</h6>
                </v-alert>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <br />
                <v-btn
                  @click="DeleteAccount"
                  rounded
                  outlined
                  color="#FF6265"
                  style="width: 230px"
                >
                  حذف الحساب
                </v-btn>
                <v-btn
                  @click="alert = true"
                  v-if="!vip"
                  rounded
                  outlined
                  color="#FF6265"
                  style="width: 230px"
                >
                  تحديث الحساب ال VIP
                </v-btn>
                <v-alert
                  v-if="alert"
                  color="#FF6265"
                  text
                  prominent
                  icon="mdi-cloud-alert"
                  style="direction: rtl"
                >
                  <h6>سيتم نقلك الي حساب ال PayPal</h6>
                  <h6>
                    لمتابعة الخطوات اضغط
                    <a
                      style="text-decoration: none"
                      :href="'http://127.0.0.1:8000/api/test/' + this.ID"
                      target="_blank"
                    >
                      استمرار
                    </a>
                  </h6>
                </v-alert>
              </div>
            </v-row>
          </v-form>
          <br />
          <br />
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import SignupAvatar from "../assets/UserDefaultAvatar.png";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import ErrorPage from "@/components/ErrorPage.vue";
export default {
  components: {
    Navbar,
    Sidebar,
    ErrorPage,
  },
  data() {
    return {
      avatarurl: null,
      url: SignupAvatar,
      file: "",
      ID: null,
      Name: "",
      Email: "",
      PhoneNumber: "",
      BirthDay: "",
      Gender: "",
      NumberOfReports: "",
      NumberOfBans: "",
      Certified: "",
      vip: "",
      CurrentlyBanned: "",
      DeleteMsg: "",
      showAnswers: false,
      Info: [],
      Answers: [],
      answer: {
        id: "",
        answer: "",
      },
      updataBoolean: false,
      radioGroup: "",
      currentID: "",
      rules: {
        required: (value) => !!value || "Required.",
        number: (value) => this.IsaNumber(value) || "Not a Valid Number",
      },
      noerror: false,
      checkquestions: false,
      notverified: false,
      notoken: false,
      alert: false,
    };
  },
  methods: {
    redirect() {
      this.$router.push({ name: "Login" });
    },
    quizpage() {
      this.$router.push({ name: "questions" });
    },
    previewImage() {
      this.url = URL.createObjectURL(this.file);
      this.useravatar();
    },
    RemoveAvatar() {
      this.avatarurl = "";
      this.file = "";
      this.url = SignupAvatar;
    },
    IsaNumber(value) {
      const phoneno = /^\d{11}$/;
      if (value.match(phoneno)) {
        return true;
      }
      return false;
    },
    getUserInfo() {
      if (localStorage.getItem("usertoken") === null) this.$router.push("/");
      const option = {
        headers: {
          Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
        },
      }; //waiting for the login to be finished to store the access token
      // const option = { headers: { Authorization: `${'Bearer'} ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjI1ODI5NCwiZXhwIjoxNjMyNDg4Njk0LCJuYmYiOjE2MzIyNTgyOTQsImp0aSI6Imc2VnR1TG42UFNVbGlFYVkiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.X2FBWU2iydp-agPiFxVKsTF30bCMmSuBP-e_T4sLDWo'}` } };//temp for testing the request
      axios
        .get("http://127.0.0.1:8000/api/profile", option)
        .then((response) => {
          this.ID = response.data.id;
          this.Name = response.data.name;
          this.Email = response.data.email;
          this.PhoneNumber = response.data.phone;
          this.BirthDay = response.data.birth_day;
          this.Gender = response.data.gender;
          this.avatarurl = response.data.image;
          this.NumberOfReports = response.data.reports;
          this.NumberOfBans = response.data.ban_count;
          this.Certified = response.data.certified;
          this.vip = response.data.VIP;
          this.noerror = true;
          this.getUserQA();
        })
        .catch((error) => {
          if (
            error.response.data.message === "Not all the questions are answered"
          ) {
            this.checkquestions = true;
          }
          if (error.response.data.message === "Email is not verified") {
            this.notverified = true;
          }
          return "error occoured";
        });
    },
    getUserQA() {
      if (localStorage.getItem("usertoken") === null) this.$router.push("/");
      const token = "Bearer ".concat(localStorage.getItem("usertoken")); //waiting for the login to be finished to store the access token
      //const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjI1ODI5NCwiZXhwIjoxNjMyNDg4Njk0LCJuYmYiOjE2MzIyNTgyOTQsImp0aSI6Imc2VnR1TG42UFNVbGlFYVkiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.X2FBWU2iydp-agPiFxVKsTF30bCMmSuBP-e_T4sLDWo");
      axios({
        method: "get",
        url: "http://127.0.0.1:8000/api/show-user",
        headers: { Authorization: token },
        params: { user_id: this.ID },
      }).then((response) => {
        this.Info = response.data;
      });
    },
    DeleteAccount() {
      if (localStorage.getItem("usertoken") === null) this.$router.push("/");
      const option = {
        headers: {
          Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
        },
      }; //waiting for the login to be finished to store the access token
      // const option = { headers: { Authorization: `${'Bearer'} ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjI1ODI5NCwiZXhwIjoxNjMyNDg4Njk0LCJuYmYiOjE2MzIyNTgyOTQsImp0aSI6Imc2VnR1TG42UFNVbGlFYVkiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.X2FBWU2iydp-agPiFxVKsTF30bCMmSuBP-e_T4sLDWo'}` } };//temp for testing the request
      axios
        .delete("http://127.0.0.1:8000/api/delete", option)
        .then((response) => {
          this.DeleteMsg = response.data.message;
          this.$router.push("/"); //should redirect to login page
        });
    },
    HideData(id) {
      if (localStorage.getItem("usertoken") === null) this.$router.push("/");
      const token = "Bearer ".concat(localStorage.getItem("usertoken")); //waiting for the login to be finished to store the access token
      //  const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjI1ODI5NCwiZXhwIjoxNjMyNDg4Njk0LCJuYmYiOjE2MzIyNTgyOTQsImp0aSI6Imc2VnR1TG42UFNVbGlFYVkiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.X2FBWU2iydp-agPiFxVKsTF30bCMmSuBP-e_T4sLDWo");
      axios({
        method: "get",
        url: "http://127.0.0.1:8000/api/hide",
        headers: { Authorization: token },
        params: { question_id: id },
      });
      this.getUserQA();
    },
    UnHideData(id) {
      if (localStorage.getItem("usertoken") === null) this.$router.push("/");
      const token = "Bearer ".concat(localStorage.getItem("usertoken")); //waiting for the login to be finished to store the access token
      //const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjI1ODI5NCwiZXhwIjoxNjMyNDg4Njk0LCJuYmYiOjE2MzIyNTgyOTQsImp0aSI6Imc2VnR1TG42UFNVbGlFYVkiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.X2FBWU2iydp-agPiFxVKsTF30bCMmSuBP-e_T4sLDWo");
      axios({
        method: "get",
        url: "http://127.0.0.1:8000/api/unhide",
        headers: { Authorization: token },
        params: { question_id: id },
      });
      this.getUserQA();
    },
    getAllAnswers(id) {
      if (localStorage.getItem("usertoken") === null) this.$router.push("/");
      const token = "Bearer ".concat(localStorage.getItem("usertoken")); //waiting for the login to be finished to store the access token
      // const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjI1ODI5NCwiZXhwIjoxNjMyNDg4Njk0LCJuYmYiOjE2MzIyNTgyOTQsImp0aSI6Imc2VnR1TG42UFNVbGlFYVkiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.X2FBWU2iydp-agPiFxVKsTF30bCMmSuBP-e_T4sLDWo");
      axios({
        method: "get",
        url: "http://127.0.0.1:8000/api/get-question-answers",
        headers: { Authorization: token },
        params: { id: id },
      }).then((response) => {
        this.Answers = response.data;
      });
    },
    ChangeAnswer(quesID) {
      if (localStorage.getItem("usertoken") === null) this.$router.push("/");
      const token = "Bearer ".concat(localStorage.getItem("usertoken")); //waiting for the login to be finished to store the access token
      //const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjI1ODI5NCwiZXhwIjoxNjMyNDg4Njk0LCJuYmYiOjE2MzIyNTgyOTQsImp0aSI6Imc2VnR1TG42UFNVbGlFYVkiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.X2FBWU2iydp-agPiFxVKsTF30bCMmSuBP-e_T4sLDWo");
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/EditInfo",
        headers: { Authorization: token },
        data: {
          question_id: quesID,
          new_answer: this.radioGroup,
        },
      }).then(() => {
        this.getUserQA();
      });
    },
    saveChanges() {
      if (localStorage.getItem("usertoken") === null) this.$router.push("/");
      const option = {
        headers: {
          Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
        },
      }; //waiting for the login to be finished to store the access token
      if (!this.file) {
        const fd = new FormData();
        fd.append("image", this.file);
        // const option = { headers: { Authorization: `${'Bearer'} ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjI1ODI5NCwiZXhwIjoxNjMyNDg4Njk0LCJuYmYiOjE2MzIyNTgyOTQsImp0aSI6Imc2VnR1TG42UFNVbGlFYVkiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.X2FBWU2iydp-agPiFxVKsTF30bCMmSuBP-e_T4sLDWo'}`,'Content-Type': 'multipart/form-data' } };//temp for testing the request
        axios
          .post("http://127.0.0.1:8000/api/deleteImage", fd, option)
          .then(() => {
            this.updataBoolean = true;
          })
          .catch(() => {});
      }
      if (this.$refs.form.validate()) {
        const fd = new FormData();
        fd.append("image", this.file);
        fd.append("phone", this.PhoneNumber);
        // const option = { headers: { Authorization: `${'Bearer'} ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjI1ODI5NCwiZXhwIjoxNjMyNDg4Njk0LCJuYmYiOjE2MzIyNTgyOTQsImp0aSI6Imc2VnR1TG42UFNVbGlFYVkiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.X2FBWU2iydp-agPiFxVKsTF30bCMmSuBP-e_T4sLDWo'}`,'Content-Type': 'multipart/form-data' } };//temp for testing the request
        axios
          .post("http://127.0.0.1:8000/api/EditInfo", fd, option)
          .then(() => {
            this.updataBoolean = true;
          })
          .catch(() => {});
      }
    },
  },
  created() {
    if (!localStorage.getItem("usertoken")) {
      this.notoken = true;
      return;
    }
    this.getUserInfo();
  },
  computed: {
    useravatar() {
      if (this.avatarurl) return `http://127.0.0.1:8000${this.avatarurl}`;
      return this.url;
    },
  },
};
</script>
<style lang="scss">
#content {
  background-color: #ffffff;
}

#Black {
  color: #000000;
}
#Grey {
  color: #979797;
}
#avatar {
  border-radius: 50%;
  border: solid 2px #ff6265;
  max-width: 200px;
  max-height: 200px;
}

#form {
  color: #ff6265;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}

.preview {
  background-color: #ffffff;
  max-width: 100%;
  max-height: 100%;
}

.test {
  border-width: 10px;
  border-color: #ff6265;
  height: 100%;
}
</style>
