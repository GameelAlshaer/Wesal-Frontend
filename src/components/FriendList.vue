<template>
    <v-col cols="12" class="font">
    <v-card :id="id" style="background-color: white; margin: 15px; direction: rtl" class="hover">
      <v-list class="list-style" three-line>
          <v-list-item>
            <v-list-item-avatar class="imgHover" style="width: 100px; height: 100px; border-radius: 50%">
                <v-img   v-if="!image" v-bind:src="img"></v-img>
              <v-img  v-else-if="image.includes('http')" v-bind:src="image"></v-img>
              <v-img  v-else-if="!image.includes('http')" v-bind:src="`http:localhost:8000${image}`"></v-img>
            </v-list-item-avatar>

            <v-list-item-content style="text-align: right;" class="mx-">
              <v-list-item-title class="font_name" style="font-weight: bolder">الاسم : {{ name }}</v-list-item-title>
              <v-list-item-subtitle class="font_age" style="font-weight: bolder">العمر : {{ age }}</v-list-item-subtitle>
            </v-list-item-content>

            <div class="text-center">
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon title="إزالة من المعجبين بهم" v-bind="attrs" v-on="on" style="color: red; font-size: 27px" depressed>
                    > mdi-delete
                  </v-icon>
                  <v-icon style="
                    cursor: pointer;
                    font-size: 27px;
                    color: #985d4b;
                  " @click="redirect" title="الصفحة الشخصية">
                    mdi-account
                  </v-icon>
                </template>

                <v-card class="font text-center">
                  <v-card-title style="background-color: #fe6265; color: white;">
                    إزالة من المعجبين
                  </v-card-title>

                  <v-card-text class="mt-2"> هل انت متأكد من إزالة هذا الشخص ؟ </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="remove(id)" style="background-color: #fe6265 ;color: white;">
                      نعم انا متأكد
                    </v-btn>
                    <v-btn @click="dialog = false" color="#985d4b" text>
                      إلغاء
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-list-item>
      </v-list>
    </v-card>
  </v-col>
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
  name: "FriendList",
  props: ["name", "age", "id", "image", "user2_id"],
  methods: {
    remove(id) {
      const AuthStr = "Bearer ".concat(localStorage.getItem("usertoken"));
      axios({
        method: "delete",
        url: "http://127.0.0.1:8000/api/removeFromFav",
        headers: { Authorization: AuthStr },
        data: {
          id: id, // This is the body part
        },
      });
      this.dialog = false;
      document.getElementById(id).style.display = "none";
    },
    redirect() {
      this.$router.push({
        name: "Userinfo",
        params: { id: this.user2_id },
      });
    },
  },
};
</script>

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
<style scoped>
.imgHover{
  transition: transform .5s; /* Animation */
}
.imgHover:hover{
  transform: scale(1.25);
}
.hover{
  transition: transform .5s; /* Animation */
}
.hover:hover{
  transform: scale(1.075);
}
</style>
