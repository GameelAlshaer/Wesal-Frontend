<template>
  <div class="sc" align="center">
    <h4 class="headerpref" align="center" style="color: rgba(255, 98, 101, 1)">
      VIP الفرق بين المستخدمين المجانيين والمستخدمين ال
    </h4>
    <b-carousel
      id="mainCarousel"
      v-model="slide"
      :interval="5000"
      controls
      indicators
      background="#ccc"
      img-width="1024"
      img-height="450"
      style="text-shadow: 1px 1px 2px #000"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      align="center"
    >
      <b-carousel-slide
        align="center"
        caption="مميزات في المحادثات"
        text="  مستخدمVIP يمكنه بدء المحادثة فورا مع الطرف الاخر بدون ارسال طلب  "
        color="black"
        :img-src="chat"
        style="
          width: 100%;
          max-height: 450px;
          background: rgba(255, 98, 101, 1);
          font-color: black;
          color: black;
        "
      ></b-carousel-slide>

      <b-carousel-slide
        align="center"
        caption="المميزات خاصة"
        text="  مستخدم VIP يمكنه ان يخفي بعد البيانات الخاصة به    "
        color="black"
        :img-src="hide"
        style="
          width: 100%;
          max-height: 450px;
          background: rgba(255, 98, 101, 1);
          font-color: black;
          color: black;
        "
      ></b-carousel-slide>
      <b-carousel-slide
        align="center"
        caption="المميزات اخري"
        text=" مستخدم VIP  يمكنه ان يري من قام بالاعجاب به   "
        color="black"
        :img-src="like"
        style="
          width: 100%;
          max-height: 450px;
          background: rgba(255, 98, 101, 1);
          font-color: black;
          color: black;
        "
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>


<script>
import chat from "../assets/chattt.png";
import hide from "../assets/hideee.jpg";
import like from "../assets/like.jpg";
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

<style>
.sc {
  height: 30%;
  width: 100%;
  align: center;

  margin-top: 8px;
  margin-bottom: 60px;
  margin-border: 15px;
  padding-radius: 15px;
  border: 15px;
  border-radius: 15px;
  color: black;
}
</style>
