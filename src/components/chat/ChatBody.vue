<template>
  <div class="card">
    <div class="card-header">{{ otherUser.name }}</div>

    <div class="card-body" >
      <div v-for="message in messages" v-bind:key="message.id">

        <div v-if="message.author !== authUser.email" class="d-flex justify-content-end">
          <div class="text-white rounded-3  mb-1 py-2 px-2" style="background-color: #075E54"> {{ message.body }} </div>
        </div>

        <div v-else class="d-flex justify-content-start">
          <div class="text-white rounded-3  mb-1 py-2 px-2" style="background-color: #128C7E"> {{ message.body }} </div>
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
  data(){
    return{
      messages: [],
      newMessage: "",
      channel: "",
      typingPlaceHolder: ""
    };
  },
  async created() {
    const token = await this.fetchToken();
    console.log(token) ;
    await this.initializeClient(token);
    await this.fetchMessages();

  },
  methods: {
    async fetchToken() {
      const {data} = await axios.post("http://127.0.0.1:8000/api/token", {
        email: this.authUser.email
      });
      return data.token;
    },
    async initializeClient(token) {
      console.log('init client');
      // const client = await Twilio.Chat.Client.create(token);
      const client = await Chat.Client.create(token);

      client.on("tokenAboutToExpire", async () => {
        const token = await this.fetchToken();
        client.updateToken(token);
      });

      let mx = max(this.authUser.id , this.otherUser.id);
      let mn = min(this.authUser.id , this.otherUser.id);

      console.log('before getting the channel');

      this.channel = await client.getChannelByUniqueName(
          `${mn}-${mx}`
      );

      console.log('After getting the channel');
      console.log(this.channel) ;

      this.channel.on("messageAdded", message => {
        console.log('message added') ;
        this.messages.push(message);
      });

      this.channel.on('typingStarted', member => {
        console.log('typingStarted');
        this.typingPlaceHolder.text(member.identity + ' is typing...');
        console.log(this.typingPlaceHolder);
      });
      this.channel.on('typingEnded', data => {
        console.log('typingEnded');
        console.log(data) ;
        this.typingPlaceHolder.text('');
        console.log(this.typingPlaceHolder);
      });
    },
    async fetchMessages() {
      console.log('fetch messages') ;
      this.messages = (await this.channel.getMessages()).items;
    },
    sendMessage() {
      console.log('send message %s' , this.newMessage) ;
      console.log(this.channel) ;
      this.channel.sendMessage(this.newMessage);
      this.newMessage = "";
    },
  }
}
</script>
