<template>
  <v-card
    :id="'card' + id"
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

          <v-list-item-content style="text-align: right; margin: 0 20px 0 20px">
            <v-list-item-title class="font_name" style="font-weight: bolder"
              >رقم الرسالة : {{ num }}
            </v-list-item-title>
            <v-list-item-subtitle class="font_age" style="font-weight: bolder"
              >رقم البلاغ : {{ id }}
            </v-list-item-subtitle>
            <v-list-item-subtitle
              :id="id + 'comment'"
              class="font_age"
              style="font-weight: bolder; display: none"
            >
              محتوى الرسالة : {{ message }}
            </v-list-item-subtitle>
            <v-list-item-subtitle
              :id="id + 'action'"
              class="font_age"
              style="font-weight: bolder; display: none"
              >القرار المأخوذ : في انتظار رد المشرف
            </v-list-item-subtitle>
            <v-list-item-subtitle
              :id="id + 'data1'"
              class="font_age"
              style="font-weight: bolder; display: none"
              >تم الانشاء في : {{ dateCreate }}
            </v-list-item-subtitle>
            <v-list-item-subtitle
              :id="id + 'data2'"
              class="font_age"
              style="font-weight: bolder; display: none"
              >تم النحديث في : {{ dateUpdate }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <div class="text-center">
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  style="
                    background-color: red;
                    font-weight: bolder;
                    padding: 0;
                    height: 25px;
                    color: #eeeeee;
                  "
                  depressed
                >
                  منع
                </v-btn>
                <font-awesome-icon
                  :id="id"
                  @click="change(id)"
                  title="رؤية اكثر"
                  style="
                    color: #0062cc;
                    cursor: pointer;
                    font-size: 37px;
                    margin-right: 15px;
                    margin-bottom: -8px;
                  "
                  :icon="showIcon"
                />
                <font-awesome-icon
                  @click="reverseChange(id)"
                  :id="id + 'show'"
                  title="رؤية اقل"
                  style="
                    display: none;
                    color: #0062cc;
                    cursor: pointer;
                    font-size: 37px;
                    margin-right: 15px;
                    margin-bottom: -8px;
                  "
                  :icon="lessIcon"
                />

                <v-icon
                  @click="takeAction(id, 2)"
                  style="color: red; font-size: 27px; margin-right: 15px"
                  depressed
                >
                  > mdi-delete
                </v-icon>
              </template>

              <v-card>
                <v-card-title class="text-h5">
                  منع مرسل هذه الرسالة من دخول الموقع
                </v-card-title>

                <v-card-text> هناك اختياران للمنع اختار ما تريد </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    @click="
                      dialog = false;
                      takeAction(id, 3);
                    "
                    style="background-color: #fe6265"
                  >
                    منع
                  </v-btn>
                  <v-btn
                    @click="
                      dialog = false;
                      takeAction(id, 4);
                    "
                    color="primary"
                    text
                    style="margin-left: 7px"
                  >
                    منع لمدة محددة
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
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import img from "../assets/UserDefaultAvatar.png";

export default {
  name: "AdminRep",
  props: ["id", "message", "num", "image", "dateUpdate", "dateCreate"],
  data() {
    return {
      msg: "لا يوجد اي بلاغات حتي الأن",
      dialog: false,
      img: img,
    };
  },
  methods: {
    takeAction(id, action) {
      const AuthStr = "Bearer ".concat(localStorage.getItem("adminToken"));
      axios({
        method: "put",
        url: "http://127.0.0.1:8000/api/admin/takeActionOnReport",
        headers: { Authorization: AuthStr },
        data: {
          report_id: id,
          action_type: action, // This is the body part
        },
      });
      document.getElementById("card" + id).style.display = "none";
    },
    change(id) {
      document.getElementById(id).style.display = "none";
      document.getElementById(id + "show").style.display = "inline";
      document.getElementById(id + "comment").style.display = "inline";
      document.getElementById(id + "action").style.display = "inline";
      document.getElementById(id + "data1").style.display = "inline";
      document.getElementById(id + "data2").style.display = "inline";
    },
    reverseChange(id) {
      document.getElementById(id).style.display = "inline";
      document.getElementById(id + "show").style.display = "none";
      document.getElementById(id + "comment").style.display = "none";
      document.getElementById(id + "action").style.display = "none";
      document.getElementById(id + "data1").style.display = "none";
      document.getElementById(id + "data2").style.display = "none";
    },
  },
  computed: {
    showIcon() {
      return faCaretDown;
    },
    lessIcon() {
      return faCaretUp;
    },
  },
};
</script>

<style scoped>
</style>
