<template>
  <v-container class="">
    <v-row>
      <div class="font mt-3 m-auto" align="center ">

<b-carousel id="mainCarousel" v-model="slide" :interval="5000" controls indicators background="#ccc" img-width="1024"
  img-height="450" style="text-shadow: 1px 1px 2px #000" @sliding-start="onSlideStart" @sliding-end="onSlideEnd"
  align="center">
  <b-carousel-slide align="center" caption=" مميزات في المحادثات "
    text="يمكن لمستخدمي Wesal VIP  بدء المحادثة فوراً مع الطرف الآخر دون إرسال طلب" color="black" :img-src="chat" style="
      width: 100%;
      max-height: 300px;
      background: rgba(255, 98, 101, 1);
      font-color: black;
      color: black;
    "></b-carousel-slide>

  <b-carousel-slide align="center" caption="المميزات الخاصة"
    text="يمكن لمستخدم Wesal VIP أن يخفي بعض البيانات الخاصة به" color="black" :img-src="hide" style="
      width: 100%;
      max-height: 300px;
      background: rgba(255, 98, 101, 1);
      font-color: black;
      color: black;
    "></b-carousel-slide>
  <b-carousel-slide align="center" caption="المميزات الأخرى" text="يمكن لمستخدم Wesal VIP أن يرى من قام بالإعجاب به"
    color="black" :img-src="like" style="
      width: 100%;
      max-height: 300px;
      background: rgba(255, 98, 101, 1);
      font-color: black;
      color: black;
    "></b-carousel-slide>
</b-carousel>
</div>
    </v-row>
  </v-container>

</template>


<script>
import chat from "../assets/3391387.png";
import hide from "../assets/ll.jpg";
import like from "../assets/2300.png";
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
      chat: chat,
      hide: hide,
      like: like,
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>

<style scoped></style>
