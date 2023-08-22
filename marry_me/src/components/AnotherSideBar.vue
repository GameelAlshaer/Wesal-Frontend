<template>
  <div>
    <v-list-item to="/">
      <v-icon large color="#FE6265FF"> mdi-home </v-icon>
      <span class="link">القائمة الرئيسية</span>
    </v-list-item>

    <v-list-item to="my_profile">
      <v-icon large color="#FE6265FF"> mdi-account </v-icon>
      <span class="link">الصفحة الشخصية</span>
    </v-list-item>
    <v-list-item to="followersList">
      <font-awesome-icon
        style="color: #fe6265; font-size: 30px; margin-left: 4px"
        :icon="fanIcon"
      />
      <span class="link">قائمة المعجبين بي</span>
    </v-list-item>
    <v-list-item to="favUsers">
      <font-awesome-icon
        style="color: #fe6265; font-size: 30px; margin-left: 4px"
        :icon="favIcon"
      />
      <span class="link"> قائمة المعجب بهم</span>
    </v-list-item>
    <v-list-item to="blockedUsers">
      <font-awesome-icon
        style="color: #fe6265; font-size: 30px; margin-left: 4px"
        :icon="blockIcon"
      />
      <span class="link">قائمة المحظورين</span>
    </v-list-item>
    <v-list-item to="allRequests">
      <font-awesome-icon
        style="color: #fe6265; font-size: 30px; margin-left: 4px"
        :icon="friendsIcon"
      />
      <span class="link">قائمة طلبات الصداقة</span>
    </v-list-item>
  </div>
</template>

<script>
import {
  faHeart,
  faFan,
  faAngry,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";

export default {
  name: "SlideBar",
  computed: {
    favIcon() {
      return faHeart;
    },
    fanIcon() {
      return faFan;
    },
    blockIcon() {
      return faAngry;
    },
    friendsIcon() {
      return faUserFriends;
    },
  },
};
</script>

<style scoped>
.link {
  font-size: 16px;
  font-weight: bolder;
  text-align: center;
  position: relative;
  height: 40px;
  line-height: 40px;
  margin-top: 7px;
  overflow: hidden;
  margin-right: 10px;
  cursor: pointer;
  color: #eeeeee;
}

.link:after {
  content: "";
  position: absolute;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  bottom: 50%;
  transition-delay: 0.5s;
  transition: all 0.5s;
}
</style>
