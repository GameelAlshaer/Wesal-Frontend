<template>
  <v-main id="content">
    <Navbar />
    <Sidebar />
    <v-row>
      <v-col cols="12" id="Black">
        <br />
        <br />
        <h1 class="text-center">حسابه الشخصي</h1>

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
          </v-row>
          <br />
          <br />

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
              disabled
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
        </v-form>
        <br />
        <br />
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import axios from "axios";
import SignupAvatar from "../assets/UserDefaultAvatar.png";

export default {
  name: "Profile",
  components: {
    Navbar,
    Sidebar,
  },
  data() {
    return {
      avatarurl: null,
      userId: this.$route.params.id,
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
      currentID: "",
      rules: {
        required: (value) => !!value || "Required.",
        number: (value) => this.IsaNumber(value) || "Not a Valid Number",
      },
    };
  },
  methods: {
    previewImage() {
      this.url = URL.createObjectURL(this.file);
      this.useravatar();
    },
    IsaNumber(value) {
      const phoneno = /^\d{11}$/;
      if (value.match(phoneno)) {
        return true;
      }
      return false;
    },
  },
  computed: {
    useravatar() {
      if (this.avatarurl) return `http://127.0.0.1:8000${this.avatarurl}`;
      return this.url;
    },
  },
  mounted() {
    const AuthStr = "Bearer ".concat(
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjQyODEwNSwiZXhwIjoxNjMyODM4NTA1LCJuYmYiOjE2MzI0MjgxMDUsImp0aSI6IjQxQzRqTWxLWG43ZHpoengiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.K1Soh5sa2rWKGy2SIqUoHkNuOISOiVe5eZ7QLsicKPE"
    );
    axios({
      method: "get",
      url: "http://localhost:8000/api/getUser/" + this.userId,
      headers: { Authorization: AuthStr },
    }).then((response) => {
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
    });
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
