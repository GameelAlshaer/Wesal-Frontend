<template>
  <v-card
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

          <v-list-item-content style="text-align: right; margin: 0 50px 0 20px">
            <v-list-item-title class="font_name" style="font-weight: bolder"
              >الأسم : {{ name }}</v-list-item-title
            >
            <v-list-item-subtitle class="font_age" style="font-weight: bolder"
              >العمر : {{ age }}</v-list-item-subtitle
            >
          </v-list-item-content>

          <div class="text-center">
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  style="color: red; font-size: 27px"
                  depressed
                >
                  > mdi-delete
                </v-icon>
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

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  ازالة شخص من قائمة المحظورين
                </v-card-title>

                <v-card-text>
                  هل انت متأكد من إزالة هذا الشخص من قائمة المحظورين ؟
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="remove(id)" style="background-color: #fe6265">
                    نعم انا متأكد
                  </v-btn>
                  <v-btn
                    @click="dialog = false"
                    color="primary"
                    text
                    style="margin-left: 7px"
                  >
                    إلغاء
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>
<script>
import axios from "axios";
import img from "../assets/UserDefaultAvatar.png";

export default {
  data() {
    return {
      img: img,
      dialog: false,
    };
  },
  name: "BlockList",
  props: ["name", "age", "id", "image", "blocked_id"],
  methods: {
    remove(id) {
      const AuthStr = "Bearer ".concat(localStorage.getItem("usertoken"));
      axios({
        method: "delete",
        url: "http://127.0.0.1:8000/api/removeBlock",
        headers: { Authorization: AuthStr },
        data: {
          blockId: id, // This is the body part
        },
      });
      this.dialog = false;
      document.getElementById(id).style.display = "none";
    },
    redirect() {
      this.$router.push({
        name: "Userinfo",
        params: { id: this.blocked_id },
      });
    },
  },
};
</script>

<style scoped>
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
<style>
body {
  background-color: #eee;
}

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
</style>
