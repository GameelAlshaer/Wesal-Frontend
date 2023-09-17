<template>
  <div class="card">
    <div class="card-header">{{ otherUser.name }}</div>

    <div class="card-body">
      <div v-for="message in messages" v-bind:key="message.id">

        <div v-if="message.author !== authUser.email" class="d-flex justify-content-end">
          <div class="text-white rounded-3  mb-1 py-2 px-2" style="background-color: #075E54"> {{ message.body }}</div>
        </div>

        <div v-else class="d-flex justify-content-start">
          <div class="text-white rounded-3  mb-1 py-2 px-2" style="background-color: #128C7E"> {{ message.body }}</div>
        </div>

      </div>
    </div>

    <div class="card-footer">
      <input
          type="text"
          v-model="newMessage"
          class="form-control"
          placeholder="Type your message..."
          @keyup.enter="sendMessage"
      />
    </div>

  </div>
</template>

<script>
// install twilio js sdk before using it
const Chat = require('twilio-chat');
import {max, min} from "@popperjs/core/lib/utils/math";
import axios from "axios";

export default {
  name: "ChatComponent",
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
      typingPlaceHolder: ""
    };
  },
  async created() {
    const token = await this.fetchToken();
    await this.initializeClient(token);
    await this.fetchMessages();
  },
  updated(){
    console.log('component updated');
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

      // const data = await axios.post("http://127.0.0.1:8000/api/test",params, option);
      // return data ;
    },

    async initializeClient(token) {
      const client = await new Chat.Client(token);

      let mx = max(this.authUser.id, this.otherUser.id);
      let mn = min(this.authUser.id, this.otherUser.id);

      this.channel = await client.getChannelByUniqueName(
          `${mn}-${mx}`
      );

      console.log(this.channel);

      client.on("tokenAboutToExpire", async () => {
        const token = await this.fetchToken();
        client.updateToken(token);
      });

      this.channel.on("messageAdded", message => {
        console.log('message added');
        this.messages.push(message);
      });

    },
    async fetchMessages() {
      console.log('fetch messages');
      this.messages = (await this.channel.getMessages()).items;
    },
    sendMessage() {
      console.log('send message %s', this.newMessage);
      console.log(this.channel);
      this.channel.sendMessage(this.newMessage);
      this.newMessage = "";
    },
  }
}
</script>
