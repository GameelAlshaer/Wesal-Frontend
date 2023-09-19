<template>
  <div class="card font" >
    <div class="d-flex justify-content-start align-items-center p-1 " style="background-color: #f6f6f6;">
      <div class=" mx-2 my-1" style="width:100px;height: 100px; overflow: hidden ; border-radius: 50%; ">
        <img :src="otherUser.image" :alt="otherUser.name + ' profile picture'" class="otherUserImage">
      </div>
      <div class="fw-bold fs-3 mx-2 my-1 " style="color: #996542!important; "> {{ otherUser.name }} </div>
<!--      <span>يكتب الان..</span>-->
    </div>

    <div v-if="messages.length" class="card-body bbg overflow-y-auto " style="max-height: 500px;">
      <div v-for="message in messages" v-bind:key="message.id">

        <div v-if="message.author !== authUser.email" class="d-flex justify-content-end">
          <div class=" rounded-3  mb-1 py-2 px-3" style="background-color: #ffffff ;color: black; box-shadow: inset;">
            <div> {{ message.body }} </div>
            <span class="d-flex justify-space-between" style="font-size: 10px;">
              <small>{{otherUser.name}}</small>
              <small>{{ moment(message.state.timestamp).fromNow() }}</small>
            </span>
          </div>
        </div>
        <div v-else class="d-flex justify-content-start">
          <div class="text-white rounded-3 mb-1 py-2 px-3 overflow-hidden" style="background-color: #996542">
            <div> {{ message.body }} </div>
            <span class="d-flex justify-space-between" style="font-size: 10px;">
              <small class="ml-2">{{otherUser.name}}</small>
              <small>{{ moment(message.state.timestamp).fromNow() }}</small>
            </span>
          </div>
        </div>

      </div>
    </div>

    <div v-else class="card-body bbg " style="max-height: 500px; overflow: auto;">
      <h3>{{ initialMessage }}</h3>
    </div>

    <div class="card-footer d-flex">
<!--      <input type="file">-->
      <div>
        <input type="file" id="pic" style="display: none" @change="handleImageUpload">

        <label for="pic" style="cursor: pointer" >
          <i class="material-icons ml-1" style="font-size: 2.25rem; color: #996542;">image</i>
        </label>
      </div>
      <button type="submit" @click="sendMessage" :disabled="emptyMessage" :style="{cursor: emptyMessage ? 'not-allowed' : 'pointer'}">
        <i class="material-icons ml-1" style="font-size: 2.25rem; color: #996542;" >send</i>
      </button>
      <input
          type="text"
          v-model="newMessage"
          class="formAm"
          placeholder="اكتب رسالتك هنا ...."
          @keyup.enter="sendMessage"
      />
    </div>
  </div>
</template>

<script>
// install twilio js sdk before using it
const Chat = require('twilio-chat');
// needed to name the channel correctly
import {max, min} from "@popperjs/core/lib/utils/math";
import axios from "axios";
// to format the date of the message
let moment = require('moment') ;
moment.locale('ar') ;

export default {
  name: "ChatComponent",
  computed: {
    emptyMessage(){
      return this.newMessage==="" ;
    }
  },
  props: {
    authUser: {
      type: Object,
      required: true
    },
    otherUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      messages: [],
      newMessage: "",
      channel: "",
      initialMessage:"جاري التحميل",
      typingPlaceHolder: "",
      moment: moment
    };
  },
  async created() {
    const token = await this.fetchToken();
    await this.initializeClient(token);
    await this.fetchMessages();
  },
  updated(){
    console.log('component updated');
    console.log(this.otherUser);
  },
  methods: {
    loginAndGetToken() {
      if (localStorage.getItem("usertoken") === null)
        this.$router.push("Login");
      return {
        headers: {
          Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
        },
      };
    },

    async fetchToken() {
      const option = this.loginAndGetToken();
      const params = {
        email: `${this.authUser.email}`,
      }
      const {data} = await axios.post("http://127.0.0.1:8000/api/token", params, option);
      return data.token;
    },

    async initializeClient(token) {
      const client = await new Chat.Client(token);

      let mx = max(this.authUser.id, this.otherUser.id);
      let mn = min(this.authUser.id, this.otherUser.id);

      this.channel = await client.getChannelByUniqueName(
          `${mn}-${mx}`
      );

      client.on("tokenAboutToExpire", async () => {
        const token = await this.fetchToken();
        client.updateToken(token);
      });

      this.channel.on("messageAdded", message => {
        this.messages.push(message);
      });

    },

    async fetchMessages() {
      this.messages = (await this.channel.getMessages()).items;
      if(this.messages.length===0)
        this.initialMessage = "لم تبدأ المحادثة حتي الان..." ;
      // console.log(this.messages.delete()) ;
    },

    sendMessage() {
      if(this.newMessage!=="")
        this.channel.sendMessage(this.newMessage);
      this.newMessage = "";
    },

    handleImageUpload(){

    },
  }
}
</script>
<style scoped>
.bbg{
  background-image: url(../../assets/chatBg.png) !important;
  background-position: center center;
    background-size: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed; 
    z-index: 100000;
}
.otherUserImage{
  width: 150%;
  height: auto; /* Maintains the aspect ratio of the image */
}
.font{
  font-family: 'Changa', sans-serif;
}
.formAm{
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    appearance: none;
    border-radius: 0.25rem;

}
</style>