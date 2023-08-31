
<template>
  <v-card
    v-if="status === 2"
    :id="id"
    style="background-color: white; margin: 15px; direction: rtl"
    class="mx-auto"
  >
    <v-list class="list-style" three-line>
      <template>
        <v-list-item style="max-width: 1300px">
          <v-list-item-avatar
            style="width: 80px; height: 70px; border-radius: 50%"
          >
            <v-img v-if="!image" v-bind:src="img"></v-img>
            <v-img
              v-else-if="image.includes('http')"
              v-bind:src="image"
            ></v-img>
            <v-img
              v-else-if="!image.includes('http')"
              v-bind:src="`http:localhost:8000${image}`"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content
            style="text-align: right; margin: 0 20px 0 20px; min-width: 80px"
          >
            <v-list-item-title class="font_name" style="font-weight: bolder"
              >الأسم : {{ name }}</v-list-item-title
            >
            <v-list-item-subtitle class="font_age" style="font-weight: bolder"
              >العمر : {{ age }}</v-list-item-subtitle
            >
          </v-list-item-content>

          <div class="text-center">
            <template>
              <!--                <font-awesome-icon-->
              <!--                    @click="decision(id,sender_id,1)"-->
              <!--                    style="color: green;cursor: pointer;font-size: 25px;margin-left: 10px;margin-top: 3px  "-->
              <!--                    :icon="checkIcon"/>-->

              <v-btn
                @click="decision(id, sender_id, 1)"
                style="
                  background-color: green;
                  margin-right: 10px;
                  color: #eeeeee;
                  margin-bottom: 5px;
                "
                depressed
              >
                قبول
              </v-btn>
              <v-icon
                style="
                  cursor: pointer;
                  font-size: 27px;
                  color: #0062cc;
                  margin-right: 10px;
                "
                @click="redirect"
                title="صفحته الشخصية"
              >
                mdi-account
              </v-icon>
            </template>
          </div>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>
<script>
import axios from "axios";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import img from "../assets/UserDefaultAvatar.png";

export default {
  data() {
    return {
      img: img,
      dialog: false,
    };
  },
  computed: {
    checkIcon() {
      return faCheck;
    },
  },

  name: "RejectedRequests",
  props: {
    name: String,
    age: Number,
    id: Number,
    image: String,
    count: Function,
    sender_id: Number,
    status: Number,
  },
  methods: {
    decision(id, s, rep) {
      const AuthStr = "Bearer ".concat(localStorage.getItem("usertoken"));
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/decision",
        headers: { Authorization: AuthStr },
        data: {
          sender: s, // This is the body part
          replay: rep,
        },
      });
      this.dialog = false;
      document.getElementById(id).style.display = "none";
      this.count();
    },
    redirect() {
      this.$router.push({
        name: "Userinfo",
        params: { id: this.sender_id },
      });
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 1024px) {
  .font_name {
    font-size: 24px;
  }
  .font_age {
    font-size: 20px;
  }
}

@media screen and (max-width: 950px) {
  .font_name {
    font-size: 20px;
  }
  .font_age {
    font-size: 16px;
  }
}

@media screen and (max-width: 650px) {
  .font_name {
    font-size: 18px;
  }
  .font_age {
    font-size: 13px;
  }
}

@media screen and (max-width: 480px) {
  .font_name {
    font-size: 15px;
  }
  .font_age {
    font-size: 11px;
  }
}
@media screen and (max-width: 360px) {
  .font_name {
    font-size: 11px;
  }
  .font_age {
    font-size: 8px;
  }
}
.list-style {
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  box-shadow: 0 0 20px gray;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;
}

.list-style:hover {
  -webkit-transform: scale(0.9);
  transform: scale(0.9);
  transition: 0.8s;
}
</style>
