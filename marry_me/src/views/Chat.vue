<template>
  <chat-window
    :current-user-id="currentUserId"
    :menu-actions="menuActions"
    @menu-action-handler="menuActionHandler"
    :rooms="rooms"
    :rooms-loaded="AllRoomsAreLoaded"
    :load-first-room="false"
    :room-info-enabled="true"
    @room-info="roomInfoHandler"
    :messages="messages"
    @fetch-messages="fetchMessages"
    :message-actions="messageActions"
    @message-action-handler="msgActionHandler"
    @send-message="sendMsg"
    :messages-loaded="AllmsgsAreLoaded"
    @typing-message="typingMsgHandler"
    :show-footer="
      (CanChat && requestApproved && !Vip) ||
      (CanChat && Vip && canSendMoreThan4Msgs) ||
      (CanChat && msgRecievedFromVIP && !Vip)
    "
    :show-add-room="true"
    @add-room="addNewRoom"
    :show-audio="false"
    :show-emojis="false"
    :show-files="Vip"
    :accepted-files="type"
    :link-options="{ disabled: false, target: '_blank' }"
    :styles="OurTheme"
    :text-messages="{
      ROOMS_EMPTY: 'لا توجد غرف دردشة',
      ROOM_EMPTY: 'لا توجد غرفة مختارة',
      NEW_MESSAGES: 'الرسائل الجديدة',
      MESSAGE_DELETED: 'تم حذف هذه الرسالة',
      MESSAGES_EMPTY: 'لا توجد رسائل',
      CONVERSATION_STARTED: 'بدأت المحادثة في: ',
      TYPE_MESSAGE: 'اكتب رسالتك هنا',
      SEARCH: 'بحث',
      IS_ONLINE: 'متصل',
      LAST_SEEN: ' آخر اتصال',
      IS_TYPING: 'يكتب رسالة الآن',
    }"
  >
    <template #eye-icon> <span></span> </template>
    <template #document-icon> <span></span> </template>
  </chat-window>
</template>
<script>
import axios from "axios";
import ChatWindow from "vue-advanced-chat";
import "vue-advanced-chat/dist/vue-advanced-chat.css";
import moment from "moment";

export default {
  components: {
    ChatWindow,
  },
  data() {
    return {
      rooms: [],
      currentRoomId: "",
      messages: [],
      users: [],
      currentUserId: "",
      currentUserName: "",
      currentUserAvatar: "",
      currentUserStatus: "",
      messageActions: [
        { name: "replyMessage", title: "الرد على هذه الرسالة" },
        { name: "ReportAmsg", title: "أبلغ عن هذه الرسالة" },
      ],
      Vip: false,
      requestApproved: false,
      CanChat: true,
      canSendMoreThan4Msgs: true,
      msgRecievedFromVIP: false,
      type: "image/*",
      AllRoomsAreLoaded: false,
      AllmsgsAreLoaded: false,
      menuActions: [],
      OurTheme: {
        general: {
          borderStyle: "1px solid #ff6265",
        },
        icons: {
          search: "#ff6265",
          paperclip: "#ff6265",
          emoji: "#ff6265",
          send: "#ff6265",
          add: "#ff6265",
        },
      },
    };
  },
  methods: {
    getUserInfo() {
      if (localStorage.getItem("usertoken") === null)
        this.$router.push("Login");
      const option = {
        headers: {
          Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
        },
      };
      axios
        .get("http://127.0.0.1:8000/api/profile", option)
        .then((response) => {
          this.currentUserId = response.data.id;
          this.currentUserName = response.data.name;
          this.currentUserAvatar = "";
          if (response.data.image) {
            this.currentUserAvatar = response.data.image.includes("http")
              ? response.data.image
              : `http://127.0.0.1:8000${response.data.image}`;
          }
          this.Vip = response.data.VIP == 1 ? true : false;
          if (this.Vip == true) {
            this.messageActions = [
              { name: "replyMessage", title: "الرد على هذه الرسالة" },
              { name: "deleteAMsg", title: "حذف الرسالة", onlyMe: true },
              { name: "ReportAmsg", title: "أبلغ عن هذه الرسالة" },
            ];
          }
        })
        .catch((error) => {
          if (
            error.response.data.message == "Not all the questions are answered"
          ) {
            this.$router.push("questions");
          } else {
            this.$router.push("Login");
          }
        });
    },
    roomInfoHandler(room) {
      this.$router.push({
        name: "Userinfo",
        params: { id: room.users[1]._id },
      });
    },
    addNewRoom() {
      this.$router.push("HomePage");
    },
    Chats() {
      this.AllRoomsAreLoaded = false;
      if (localStorage.getItem("usertoken") === null)
        this.$router.push("Login");
      const option = {
        headers: {
          Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
        },
      }; //waiting for the login to be finished to store the access token
      /*const option = {
        headers: {
          Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzA5MTI1MCwiZXhwIjoxNjMzNTAxNjUwLCJuYmYiOjE2MzMwOTEyNTAsImp0aSI6ImtCbVoyQTI3d2dUYUVHZTUiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.y5eoB01Bibcm1a4MbRWYcMG2wqrO4g1eoFORRcKHDEg"}`,
        },
      }; */
      axios
        .get("http://127.0.0.1:8000/api/listallchats", option)
        .then((response) => {
          const temprooms = [];
          let tempusers = [];
          let DateTime = "";
          let sent = false;
          let delivered = false;
          let seenmsg = false;
          let newmsg = false;
          let lastMsg = "";
          let userAvatar = "";
          let unreadCount;

          for (let i = 0; i < response.data.length; i++) {
            unreadCount =
              response.data[i].unreadcount < 1
                ? ""
                : response.data[i].unreadcount;
            userAvatar = "";
            if (response.data[i].image) {
              userAvatar = response.data[i].image.includes("http")
                ? response.data[i].image
                : `http://127.0.0.1:8000${response.data[i].image}`;
            }
            tempusers.push(
              {
                _id: `${this.currentUserId}`,
                username: `${this.currentUserName}`,
                avatar: `${this.currentUserAvatar}`,
              },
              {
                _id: `${response.data[i].user_id}`,
                username: `${response.data[i].name}`,
                avatar: `${userAvatar}`,
              }
            );

            if (response.data[i].status == 0) {
              sent = true;
              seenmsg = false;
              newmsg = true;
            } else if (response.data[i].status == 1) {
              sent = true;
              seenmsg = true;
              newmsg = false;
            }

            DateTime = moment(response.data[i].created_at).format(
              "HH:mm D/M/YYYY"
            );
            if (response.data[i].content === "") {
              temprooms.push({
                roomId: `${response.data[i].chat_id}`,
                roomName: `${response.data[i].name}`,
                avatar: `${userAvatar}`,
                index: `${response.data[i].created_at}`,
                users: tempusers,
                blockedRoom: response.data[i].block,
                blocker_id: response.data[i].blocker_id,
                block_id: response.data[i].block_id,
                requestStatus: response.data[i].RequestStatus,
              });
              tempusers = [];
            } else {
              lastMsg =
                response.data[i].isImg == 1 &&
                (!response.data[i].content ||
                  response.data[i].content.length < 0)
                  ? "Photo"
                  : response.data[i].content;

              temprooms.push({
                roomId: `${response.data[i].chat_id}`,
                roomName: `${response.data[i].name}`,
                avatar: `${userAvatar}`,
                unreadCount: `${unreadCount}`,
                index: `${response.data[i].created_at}`,
                lastMessage: {
                  _id: response.data[i].msg_id,
                  content: `${lastMsg}`,
                  senderId: `${response.data[i].sender_id}`,
                  username: `${response.data[i].sender_name}`,
                  timestamp: `${DateTime}`,
                  saved: sent,
                  distributed: delivered,
                  seen: seenmsg,
                  new: newmsg,
                  deleted: response.data[i].isDeleted,
                },
                users: tempusers,
                blockedRoom: response.data[i].block,
                blocker_id: response.data[i].blocker_id,
                block_id: response.data[i].block_id,
                requestStatus: response.data[i].RequestStatus,
              });
              tempusers = [];
            }
          }
          this.rooms = temprooms;
          this.AllRoomsAreLoaded = true;
        })
        .catch((error) => {
          if (error.response.data.message) {
            alert(error.response.data.message);
          }
        });
    },
    blockUser(roomId) {
      let secondUser_id;
      this.rooms.forEach((room) => {
        if (room.roomId == roomId) {
          secondUser_id = room.users[1]._id;
          if (localStorage.getItem("usertoken") === null)
            this.$router.push("Login");
          const option = {
            headers: {
              Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
            },
          }; //waiting for the login to be finished to store the access token
          /*const option = {
            headers: {
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzA5MTI1MCwiZXhwIjoxNjMzNTAxNjUwLCJuYmYiOjE2MzMwOTEyNTAsImp0aSI6ImtCbVoyQTI3d2dUYUVHZTUiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.y5eoB01Bibcm1a4MbRWYcMG2wqrO4g1eoFORRcKHDEg"}`,
            },
          }; */
          axios
            .post(
              "http://127.0.0.1:8000/api/blockFriend",
              { reciever_id: secondUser_id },
              option
            )
            .then((response) => {
              if (response.data.message) {
                if (response.data.message == "Block Created Successfully") {
                  alert("تم حظر المستخدم بنجاح");
                } else {
                  alert(response.data.message);
                }
              }
            })
            .catch((error) => {
              if (error.response.data.message) {
                if (
                  error.response.data.message ==
                  "receiver id and sender can't be same!"
                ) {
                  alert("لا يمكنك حظر نفسك");
                } else if (
                  error.response.data.message == "No user with this id"
                ) {
                  alert("لا يوجد هذا المستخدم");
                } else if (
                  error.response.data.message == "You Blocked this user before"
                ) {
                  alert("لقد حظرت هذا المستخدم من قبل");
                } else if (
                  error.response.data.message ==
                  "You not have message with user"
                ) {
                  alert("ليس لديك رسالة مع المستخدم");
                } else {
                  alert(error.response.data.message);
                }
              }
            });
          this.menuActions = [{ name: "removeBlock", title: "رفع الحظر" }];
          this.CanChat = false;
        }
      });
    },
    UnblockUser(roomId) {
      let block_id, blocked_id;
      this.rooms.forEach((room) => {
        if (room.roomId == roomId) {
          block_id = room.block_id;
          blocked_id = room.users[1]._id;
          if (localStorage.getItem("usertoken") === null)
            this.$router.push("Login");
          const option = {
            headers: {
              Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
            },
            data: {
              blockId: block_id,
              blockerId: this.currentUserId,
              blockedId: blocked_id,
            },
          }; //waiting for the login to be finished to store the access token
          /*const option = {
            headers: {
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzA5MTI1MCwiZXhwIjoxNjMzNTAxNjUwLCJuYmYiOjE2MzMwOTEyNTAsImp0aSI6ImtCbVoyQTI3d2dUYUVHZTUiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.y5eoB01Bibcm1a4MbRWYcMG2wqrO4g1eoFORRcKHDEg"}`,
            },
            data: {
              blockId: block_id,
              blockerId: this.currentUserId,
              blockedId: blocked_id,
            },
          }; //temp for testing the request*/
          axios
            .delete("http://127.0.0.1:8000/api/removeBlock", option)
            .then((response) => {
              if (response.data.message) {
                if (
                  response.data.message == "Block has been Deleted Successfully"
                ) {
                  alert("تمت إزالة الحظر بنجاح");
                } else {
                  alert(response.data.message);
                }
              }
            })
            .catch((error) => {
              if (error.response.data.message) {
                if (error.response.data.message == "no block with this id") {
                  alert("لا يوجد هذا حظر ");
                } else if (
                  error.response.data.message ==
                  "you are not the blocker for this block"
                ) {
                  alert("أنت لست صاحب هذاالحظر");
                } else {
                  alert(error.response.data.message);
                }
              }
            });
          this.CanChat = true;
          this.menuActions = [{ name: "blockaction", title: "حظر" }];
        }
      });
    },
    menuActionHandler(data) {
      switch (data.action.name) {
        case "blockaction":
          this.blockUser(data.roomId);
          break;
        case "removeBlock":
          this.UnblockUser(data.roomId);
          break;
      }
    },

    deleteMsg(roomId, message) {
      if (localStorage.getItem("usertoken") === null)
        this.$router.push("Login");
      const option = {
        headers: {
          Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
        },
      };
      axios
        .delete(
          `${"http://127.0.0.1:8000/api/deletemsg/"}${message._id}`,
          option
        )
        .catch((error) => {
          if (error.response.data.message) {
            if (error.response.data.message == "no msg found by This id ") {
              alert("لم يتم العثور على هذه رسالة ");
            } else {
              alert(error.response.data.message);
            }
          }
        });
    },
    reportAMsg(roomId, message) {
      if (localStorage.getItem("usertoken") === null)
        this.$router.push("Login");
      const option = {
        headers: {
          Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
        },
      }; //waiting for the login to be finished to store the access token
      /*const option = {
        headers: {
          Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzA5MTI1MCwiZXhwIjoxNjMzNTAxNjUwLCJuYmYiOjE2MzMwOTEyNTAsImp0aSI6ImtCbVoyQTI3d2dUYUVHZTUiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.y5eoB01Bibcm1a4MbRWYcMG2wqrO4g1eoFORRcKHDEg"}`,
        },
      }; //temp for testing the request*/
      axios
        .post(
          "http://127.0.0.1:8000/api/report",
          { message_id: message._id },
          option
        )
        .then((response) => {
          if (response.data.message) {
            if (
              response.data.message == "report has been Created Successfully"
            ) {
              alert("تم إنشاءالإبلاغ بنجاح");
            } else {
              alert(response.data.message);
            }
          }
        })
        .catch((error) => {
          if (error.response.data.message) {
            if (
              error.response.data.message ==
              "you are not receiver for this message!"
            ) {
              alert("! أنت لست متلقي لهذه الرسالة");
            } else if (
              error.response.data.message == "You reported this message before!"
            ) {
              alert(" ! لقد أبلغت عن هذه الرسالة من قبل");
            } else if (
              error.response.data.message == "no message with this id" ||
              error.response.data.message == "id of message is not found"
            ) {
              alert("لم يتم العثور على هذه رسالة ");
            } else {
              alert(error.response.data.message);
            }
          }
        });
    },
    msgActionHandler(data) {
      switch (data.action.name) {
        case "deleteAMsg":
          this.deleteMsg(data.roomId, data.message);
          break;
        case "ReportAmsg":
          this.reportAMsg(data.roomId, data.message);
          break;
      }
    },
    updateDeletedMsgs(data) {
      this.messages.forEach((msg, i) => {
        if (msg._id == data.messageId) {
          this.messages[i].deleted = true;
          this.messages = [...this.messages];

          this.rooms.forEach((room, j) => {
            if (room.roomId == data.chatId) {
              if (this.messages[i]._id == room.lastMessage._id) {
                //if msg deleted is the last msg update the last msg
                this.rooms[j].lastMessage.deleted = true;
                this.rooms = [...this.rooms];
              }
            }
          });
        }
      });
    },
    typingMsgHandler(data) {
      window.Echo.private(`chat.${data.roomId}`).whisper("typing", {
        userId: this.currentUserId,
      });
    },
    connect(roomID) {
      if (roomID) {
        window.Echo.private(`delete.${roomID}`).listen(
          ".DeleteMessage",
          (data) => {
            this.updateDeletedMsgs(data);
          }
        );
        window.Echo.private(`chat.${roomID}`).listen(".MessageSent", (data) => {
          this.updateMsgs(data);
        });
        window.Echo.private(`seen.${roomID}`).listen(".MessageSeen", (data) => {
          let lastIndex;
          let firstIndex;
          for (
            lastIndex = this.messages.length - 1;
            lastIndex >= 0;
            lastIndex--
          ) {
            if (this.messages[lastIndex]._id == data.message.id) {
              break;
            }
          }
          for (firstIndex = lastIndex; firstIndex >= 0; firstIndex--) {
            if (this.messages[firstIndex].seen == true) {
              break;
            }
            this.messages[firstIndex].seen = true;
            this.messages = [...this.messages];
            this.messages[firstIndex].new = false;
            this.messages = [...this.messages];
          }
        });
        window.Echo.private(`chat.${roomID}`).listenForWhisper(
          "typing",
          (e) => {
            this.rooms.forEach((room, i) => {
              if (room.roomId == roomID) {
                this.rooms[i].typingUsers = [`${e.userId}`];
              }
            });
            this.rooms = [...this.rooms];
          }
        );
      }
    },
    disconnect(roomID) {
      window.Echo.leave(`chat.${roomID}`);
      window.Echo.leave(`seen.${roomID}`);
      window.Echo.leave(`delete.${roomID}`);
    },
    fetchMessages(data) {
      this.currentRoomId = data.room.roomId;
      const option = {
        headers: {
          Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
        },
      };

      axios
        .post(
          "http://127.0.0.1:8000/api/readmsg",
          {
            chat_id: data.room.roomId,
            time: moment().locale("en").format("YYYY-MM-DD HH:mm:ss"),
          },
          option
        )
        .catch((error) => {
          if (error.response.data.message) {
            if (error.response.data.message == "no chat found by This id ") {
              alert("لم يتم العثور على هذه المحادثة ");
            } else {
              alert(error.response.data.message);
            }
          }
        });

      this.msgRecievedFromVIP = false;
      this.requestApproved = false;
      this.AllmsgsAreLoaded = false;
      this.canSendMoreThan4Msgs = true;
      this.CanChat = false;
      if (
        data.room.blockedRoom == true &&
        data.room.blocker_id == this.currentUserId
      ) {
        this.menuActions = [{ name: "removeBlock", title: "رفع الحظر" }];
        this.CanChat = false;
      } else if (data.room.blockedRoom == false) {
        this.CanChat = true;
        this.menuActions = [{ name: "blockaction", title: "حظر" }];
      } else {
        this.menuActions = [];
        this.CanChat = false;
      }
      if (data.room.requestStatus == 1) {
        this.requestApproved = true;
      }
      // use timeout to imitate async server fetched data
      setTimeout(() => {
        const tempMsgs = [];
        let date, time;
        let sent = false;
        let delivered = false;
        let seenmsg = false;
        let newmsg = false;
        if (localStorage.getItem("usertoken") === null)
          this.$router.push("Login");

        axios
          .get(
            `http://127.0.0.1:8000/api/fetchmsgs/${data.room.roomId}`,
            option
          )
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].sender_id != this.currentUserId) {
                this.msgRecievedFromVIP = true;
                break;
              }
            }
            if (response.data.length == 4) {
              let i;
              for (i = 0; i < response.data.length; i++) {
                if (response.data[i].sender_id != this.currentUserId) {
                  break;
                }
              }
              if (i == 4) {
                this.canSendMoreThan4Msgs = false;
              }
            }
            for (let i = 0; i < response.data.length; i++) {
              time = moment(response.data[i].created_at).format("HH:mm");
              date = moment(response.data[i].created_at).format("DD MMMM YYYY");
              if (response.data[i].status == 0) {
                sent = true;
                seenmsg = false;
                newmsg = true;
              } else if (response.data[i].status == 1) {
                sent = true;
                seenmsg = true;
                newmsg = false;
              }

              if (response.data[i].replyMsg != null) {
                //with reply msg

                let temReplyMsg = {};

                if (response.data[i].reply_isImg != 1) {
                  //reply msg not an image
                  temReplyMsg = {
                    content: response.data[i].reply_content,
                    senderId: response.data[i].reply_sender_id,
                  };
                } else {
                  let replyContent =
                    response.data[i].reply_content != null
                      ? response.data[i].reply_content
                      : "";
                  let msgImg = "";
                  let imgtype = "";

                  msgImg = response.data[i].reply_img_url.includes("http")
                    ? response.data[i].reply_img_url
                    : `http://127.0.0.1:8000${response.data[i].reply_img_url}`;
                  imgtype = msgImg.split(".").pop();

                  temReplyMsg = {
                    content: replyContent,
                    senderId: response.data[i].reply_sender_id,
                    files: [
                      {
                        type: `${imgtype}`,
                        url: `${msgImg}`,
                      },
                    ],
                  };
                }
                if (response.data[i].isImg != 1) {
                  //msg with content with reply

                  tempMsgs.push({
                    _id: response.data[i].id,
                    content: response.data[i].content,
                    senderId: response.data[i].sender_id,
                    username: response.data[i].sender_name,
                    avatar: data.room.avatar,
                    date: date,
                    timestamp: time,
                    system: false,
                    saved: sent,
                    distributed: delivered,
                    seen: seenmsg,
                    new: newmsg,
                    deleted: response.data[i].isDeleted,
                    disableActions: false,
                    disableReactions: true,
                    replyMessage: temReplyMsg,
                  });
                } else if (
                  response.data[i].content != null &&
                  response.data[i].isImg == 1
                ) {
                  //msg with content and image with a reply
                  let msgImg = "";
                  let imgtype = "";

                  msgImg = response.data[i].img_url.includes("http")
                    ? response.data[i].img_url
                    : `http://127.0.0.1:8000${response.data[i].img_url}`;
                  imgtype = msgImg.split(".").pop();

                  tempMsgs.push({
                    _id: response.data[i].id,
                    content: response.data[i].content,
                    senderId: response.data[i].sender_id,
                    username: response.data[i].sender_name,
                    avatar: data.room.avatar,
                    date: date,
                    timestamp: time,
                    system: false,
                    saved: sent,
                    distributed: delivered,
                    seen: seenmsg,
                    new: newmsg,
                    deleted: response.data[i].isDeleted,
                    disableActions: false,
                    disableReactions: true,
                    files: [
                      {
                        type: `${imgtype}`,
                        url: `${msgImg}`,
                      },
                    ],
                    replyMessage: temReplyMsg,
                  });
                } else {
                  //msg with image with a reply
                  let msgImg = "";
                  let imgtype = "";

                  msgImg = response.data[i].img_url.includes("http")
                    ? response.data[i].img_url
                    : `http://127.0.0.1:8000${response.data[i].img_url}`;
                  imgtype = msgImg.split(".").pop();

                  tempMsgs.push({
                    _id: response.data[i].id,
                    content: "",
                    senderId: response.data[i].sender_id,
                    username: response.data[i].sender_name,
                    avatar: data.room.avatar,
                    date: date,
                    timestamp: time,
                    system: false,
                    saved: sent,
                    distributed: delivered,
                    seen: seenmsg,
                    new: newmsg,
                    deleted: response.data[i].isDeleted,
                    disableActions: false,
                    disableReactions: true,
                    files: [
                      {
                        type: `${imgtype}`,
                        url: `${msgImg}`,
                      },
                    ],
                    replyMessage: temReplyMsg,
                  });
                }
              } //with no reply msg
              else {
                if (response.data[i].isImg != 1) {
                  //msg with content without reply
                  tempMsgs.push({
                    _id: response.data[i].id,
                    content: response.data[i].content,
                    senderId: response.data[i].sender_id,
                    username: response.data[i].sender_name,
                    avatar: data.room.avatar,
                    date: date,
                    timestamp: time,
                    system: false,
                    saved: sent,
                    distributed: delivered,
                    seen: seenmsg,
                    new: newmsg,
                    deleted: response.data[i].isDeleted,
                    disableActions: false,
                    disableReactions: true,
                  });
                } else if (
                  response.data[i].content != null &&
                  response.data[i].isImg == 1
                ) {
                  //msg with content and image without a reply
                  let msgImg = "";
                  let imgtype = "";

                  msgImg = response.data[i].img_url.includes("http")
                    ? response.data[i].img_url
                    : `http://127.0.0.1:8000${response.data[i].img_url}`;
                  imgtype = msgImg.split(".").pop();

                  tempMsgs.push({
                    _id: response.data[i].id,
                    content: response.data[i].content,
                    senderId: response.data[i].sender_id,
                    username: response.data[i].sender_name,
                    avatar: data.room.avatar,
                    date: date,
                    timestamp: time,
                    system: false,
                    saved: sent,
                    distributed: delivered,
                    seen: seenmsg,
                    new: newmsg,
                    deleted: response.data[i].isDeleted,
                    disableActions: false,
                    disableReactions: true,
                    files: [
                      {
                        type: `${imgtype}`,
                        url: `${msgImg}`,
                      },
                    ],
                  });
                } else {
                  //msg with image without a reply
                  let msgImg = "";
                  let imgtype = "";

                  msgImg = response.data[i].img_url.includes("http")
                    ? response.data[i].img_url
                    : `http://127.0.0.1:8000${response.data[i].img_url}`;
                  imgtype = msgImg.split(".").pop();

                  tempMsgs.push({
                    _id: response.data[i].id,
                    content: "",
                    senderId: response.data[i].sender_id,
                    username: response.data[i].sender_name,
                    avatar: data.room.avatar,
                    date: date,
                    timestamp: time,
                    system: false,
                    saved: sent,
                    distributed: delivered,
                    seen: seenmsg,
                    new: newmsg,
                    deleted: response.data[i].isDeleted,
                    disableActions: false,
                    disableReactions: true,
                    files: [
                      {
                        type: `${imgtype}`,
                        url: `${msgImg}`,
                      },
                    ],
                  });
                }
              }
            }
          })
          .catch((error) => {
            if (error.response.data.message) {
              if (error.response.data.message == "no chat found by This id ") {
                alert("لم يتم العثور على هذه المحادثة ");
              } else {
                alert(error.response.data.message);
              }
            }
          });
        this.messages = tempMsgs;
        this.AllmsgsAreLoaded = true;
      });
    },
    sendMsg(data) {
      if (localStorage.getItem("usertoken") === null)
        this.$router.push("Login");

      if (!data.replyMessage) {
        //no reply msg
        if (!data.files) {
          const option = {
            headers: {
              Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
            },
          };
          axios
            .post(
              "http://127.0.0.1:8000/api/sendmsg",
              { chat_id: data.roomId, content: data.content },
              option
            )
            .catch((error) => {
              if (error.response.data.message) {
                if (
                  error.response.data.message == "no chat found by This id "
                ) {
                  alert("لم يتم العثور على هذه المحادثة ");
                } else if (
                  error.response.data.message ==
                  "you dont have access to this chat "
                ) {
                  alert("لا يمكنك الدردشة في هذه المحادثة");
                } else if (
                  error.response.data.message ==
                  "you blocked this user, cannot send a message"
                ) {
                  alert("لقد حظرت هذا المستخدم ، لا يمكنك إرسال رسالة");
                } else if (
                  error.response.data.message ==
                  "this user blocked you, cannot send a message"
                ) {
                  alert("لقد حظرك هذا المستخدم ، لا يمكنه إرسال رسالة");
                } else if (
                  error.response.data.message ==
                  "can not send more than 4 msgs to this account"
                ) {
                  alert("لا يمكن إرسال أكثر من 4 رسائل إلى هذا الحساب");
                } else {
                  alert(error.response.data.message);
                }
              }
            });
        } else {
          const option = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
            },
          };
          const fd = new FormData();

          if (data.content != null && data.content.length > 0) {
            fd.append(
              "image",
              data.files[0].blob,
              data.files[0].name + "." + data.files[0].extension
            );
            fd.append("chat_id", data.roomId);
            fd.append("content", data.content);
          } else {
            fd.append(
              "image",
              data.files[0].blob,
              data.files[0].name + "." + data.files[0].extension
            );
            fd.append("chat_id", data.roomId);
          }
          axios
            .post("http://127.0.0.1:8000/api/sendpic", fd, option)
            .catch((error) => {
              if (error.response.data.message) {
                if (
                  error.response.data.message == "no chat found by This id "
                ) {
                  alert("لم يتم العثور على هذه المحادثة ");
                } else if (
                  error.response.data.message ==
                  "you dont have access to this chat "
                ) {
                  alert("لا يمكنك الدردشة في هذه المحادثة");
                } else if (
                  error.response.data.message ==
                  "you blocked this user, cannot send pic"
                ) {
                  alert("لقد حظرت هذا المستخدم ، لا يمكنك إرسال رسالة");
                } else if (
                  error.response.data.message ==
                  "this user blocked you, cannot send pic"
                ) {
                  alert("لقد حظرك هذا المستخدم ، لا يمكنه إرسال رسالة");
                } else if (
                  error.response.data.message ==
                  "can not send more than 4 msgs to this account"
                ) {
                  alert("لا يمكن إرسال أكثر من 4 رسائل إلى هذا الحساب");
                } else {
                  alert(error.response.data.message);
                }
              }
            });
        }
      } else {
        if (!data.files) {
          const option = {
            headers: {
              Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
            },
          };
          axios
            .post(
              "http://127.0.0.1:8000/api/sendmsg",
              {
                chat_id: data.roomId,
                content: data.content,
                replymsg: data.replyMessage._id,
              },
              option
            )
            .catch((error) => {
              if (error.response.data.message) {
                if (
                  error.response.data.message == "no chat found by This id "
                ) {
                  alert("لم يتم العثور على هذه المحادثة ");
                } else if (
                  error.response.data.message ==
                  "you dont have access to this chat "
                ) {
                  alert("لا يمكنك الدردشة في هذه المحادثة");
                } else if (
                  error.response.data.message ==
                  "you blocked this user, cannot send a message"
                ) {
                  alert("لقد حظرت هذا المستخدم ، لا يمكنك إرسال رسالة");
                } else if (
                  error.response.data.message ==
                  "this user blocked you, cannot send a message"
                ) {
                  alert("لقد حظرك هذا المستخدم ، لا يمكنه إرسال رسالة");
                } else if (
                  error.response.data.message ==
                  "can not send more than 4 msgs to this account"
                ) {
                  alert("لا يمكن إرسال أكثر من 4 رسائل إلى هذا الحساب");
                } else {
                  alert(error.response.data.message);
                }
              }
            });
        } else {
          const option = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
            },
          };
          const fd = new FormData();

          fd.append(
            "image",
            data.files[0].blob,
            data.files[0].name + "." + data.files[0].extension
          );
          fd.append("chat_id", data.roomId);
          fd.append("replymsg", data.replyMessage._id);

          if (data.content != null && data.content.length > 0) {
            fd.append("content", data.content);
          }
          axios
            .post("http://127.0.0.1:8000/api/sendpic", fd, option)
            .catch((error) => {
              if (error.response.data.message) {
                if (
                  error.response.data.message == "no chat found by This id "
                ) {
                  alert("لم يتم العثور على هذه المحادثة ");
                } else if (
                  error.response.data.message ==
                  "you dont have access to this chat "
                ) {
                  alert("لا يمكنك الدردشة في هذه المحادثة");
                } else if (
                  error.response.data.message ==
                  "you blocked this user, cannot send pic"
                ) {
                  alert("لقد حظرت هذا المستخدم ، لا يمكنك إرسال رسالة");
                } else if (
                  error.response.data.message ==
                  "this user blocked you, cannot send pic"
                ) {
                  alert("لقد حظرك هذا المستخدم ، لا يمكنه إرسال رسالة");
                } else if (
                  error.response.data.message ==
                  "can not send more than 4 msgs to this account"
                ) {
                  alert("لا يمكن إرسال أكثر من 4 رسائل إلى هذا الحساب");
                } else {
                  alert(error.response.data.message);
                }
              }
            });
        }
      }
    },
    updateMsgs(data) {
      let time, date;
      time = moment(data.message.created_at).format("HH:mm");
      date = moment(data.message.created_at).format("DD MMMM YYYY");
      let userImage = data.user.image.includes("http")
        ? data.user.image
        : `http://127.0.0.1:8000${data.user.image}`;
      if (!data.message.replyMsg) {
        //no reply msg
        if (data.message.isImg != 1) {
          this.rooms.forEach((room, i) => {
            if (room.roomId == data.chatId) {
              this.messages[this.messages.length] = {
                _id: data.message.id,
                content: data.message.content,
                senderId: data.message.sender_id,
                username: data.user.name,
                avatar: userImage,
                date: date,
                timestamp: time,
                system: false,
                saved: true,
                distributed: false,
                seen: false,
                new: false,
                deleted: false,
                disableActions: false,
                disableReactions: true,
              };
              this.messages = [...this.messages];
              this.rooms[i] = {
                roomId: room.roomId,
                roomName: room.roomName,
                avatar: room.avatar,
                unreadCount: "",
                index: `${data.message.created_at}`,
                users: room.users,
                blockedRoom: room.blockedRoom,
                blocker_id: room.blocker_id,
                block_id: room.block_id,
                requestStatus: room.requestStatus,
                lastMessage: {
                  _id: data.message.id,
                  content: data.message.content,
                  senderId: data.message.sender_id,
                  username: data.user.name,
                  timestamp: moment(data.message.created_at).format(
                    "HH:mm D/M/YYYY"
                  ),
                  saved: true,
                  distributed: false,
                  seen: false,
                  new: false,
                  deleted: false,
                },
              };
              this.rooms = [...this.rooms];
            }
          });
        } else {
          let msgImg = "";
          let imgtype = "";

          msgImg = data.message.img_url.includes("http")
            ? data.message.img_url
            : `http://127.0.0.1:8000${data.message.img_url}`;
          imgtype = msgImg.split(".").pop();
          this.rooms.forEach((room, i) => {
            if (room.roomId == data.chatId) {
              let msgContent =
                data.message.content != null && data.message.content.length > 0
                  ? data.message.content
                  : "";
              let lastMsgContent =
                data.message.content != null && data.message.content.length > 0
                  ? data.message.content
                  : "Photo";

              this.messages[this.messages.length] = {
                _id: data.message.id,
                content: msgContent,
                senderId: data.message.sender_id,
                username: data.user.name,
                avatar: userImage,
                date: date,
                timestamp: time,
                system: false,
                saved: true,
                distributed: false,
                seen: false,
                new: false,
                deleted: false,
                disableActions: false,
                disableReactions: true,
                files: [
                  {
                    type: imgtype,
                    url: msgImg,
                  },
                ],
              };

              this.messages = [...this.messages];
              this.rooms[i] = {
                roomId: room.roomId,
                roomName: room.roomName,
                avatar: room.avatar,
                unreadCount: "",
                index: `${data.message.created_at}`,
                users: room.users,
                blockedRoom: room.blockedRoom,
                blocker_id: room.blocker_id,
                block_id: room.block_id,
                requestStatus: room.requestStatus,
                lastMessage: {
                  _id: data.message.id,
                  content: lastMsgContent,
                  senderId: data.message.sender_id,
                  username: data.user.name,
                  timestamp: moment(data.message.created_at).format(
                    "HH:mm D/M/YYYY"
                  ),
                  saved: true,
                  distributed: false,
                  seen: false,
                  new: false,
                  deleted: false,
                },
              };
              this.rooms = [...this.rooms];
            }
          });
        }
      } else {
        let replyMsgs = {};
        if (data.replyMsg[0].isImg != 1) {
          replyMsgs = {
            content: data.replyMsg[0].content,
            senderId: data.replyMsg[0].sender_id,
          };
        } else {
          let replyContent =
            data.replyMsg[0].content != null &&
            data.replyMsg[0].content.length > 0
              ? data.replyMsg[0].content
              : "";
          let msgImg = "";
          let imgtype = "";

          msgImg = data.replyMsg[0].img_url.includes("http")
            ? data.replyMsg[0].img_url
            : `http://127.0.0.1:8000${data.replyMsg[0].img_url}`;
          imgtype = msgImg.split(".").pop();
          replyMsgs = {
            content: replyContent,
            senderId: data.replyMsg[0].sender_id,
            files: [
              {
                type: `${imgtype}`,
                url: `${msgImg}`,
              },
            ],
          };
        }
        if (data.message.isImg != 1) {
          this.rooms.forEach((room, i) => {
            if (room.roomId == data.chatId) {
              this.messages[this.messages.length] = {
                _id: data.message.id,
                content: data.message.content,
                senderId: data.message.sender_id,
                username: data.user.name,
                avatar: userImage,
                date: date,
                timestamp: time,
                system: false,
                saved: true,
                distributed: false,
                seen: false,
                new: false,
                deleted: false,
                disableActions: false,
                disableReactions: true,
                replyMessage: replyMsgs,
              };
              this.messages = [...this.messages];
              this.rooms[i] = {
                roomId: room.roomId,
                roomName: room.roomName,
                avatar: room.avatar,
                unreadCount: "",
                index: `${data.message.created_at}`,
                users: room.users,
                blockedRoom: room.blockedRoom,
                blocker_id: room.blocker_id,
                block_id: room.block_id,
                requestStatus: room.requestStatus,
                lastMessage: {
                  _id: data.message.id,
                  content: data.message.content,
                  senderId: data.message.sender_id,
                  username: data.user.name,
                  timestamp: moment(data.message.created_at).format(
                    "HH:mm D/M/YYYY"
                  ),
                  saved: true,
                  distributed: false,
                  seen: false,
                  new: false,
                  deleted: false,
                },
              };
              this.rooms = [...this.rooms];
            }
          });
        } else {
          this.rooms.forEach((room, i) => {
            if (room.roomId == data.chatId) {
              let msgContent =
                data.message.content != null && data.message.content.length > 0
                  ? data.message.content
                  : "";
              let lastMsgContent =
                data.message.content != null && data.message.content.length > 0
                  ? data.message.content
                  : "Photo";
              let msgImg = "";
              let imgtype = "";

              msgImg = data.message.img_url.includes("http")
                ? data.message.img_url
                : `http://127.0.0.1:8000${data.message.img_url}`;
              imgtype = msgImg.split(".").pop();
              this.messages[this.messages.length] = {
                _id: data.message.id,
                content: msgContent,
                senderId: data.message.sender_id,
                username: data.user.name,
                avatar: userImage,
                date: date,
                timestamp: time,
                system: false,
                saved: true,
                distributed: false,
                seen: false,
                new: false,
                deleted: false,
                disableActions: false,
                disableReactions: true,
                files: [
                  {
                    type: `${imgtype}`,
                    url: `${msgImg}`,
                  },
                ],
                replyMessage: replyMsgs,
              };

              this.messages = [...this.messages];
              this.rooms[i] = {
                roomId: room.roomId,
                roomName: room.roomName,
                avatar: room.avatar,
                unreadCount: "",
                index: `${data.message.created_at}`,
                users: room.users,
                blockedRoom: room.blockedRoom,
                blocker_id: room.blocker_id,
                block_id: room.block_id,
                requestStatus: room.requestStatus,
                lastMessage: {
                  _id: data.message.id,
                  content: lastMsgContent,
                  senderId: data.message.sender_id,
                  username: data.user.name,
                  timestamp: moment(data.message.created_at).format(
                    "HH:mm D/M/YYYY"
                  ),
                  saved: true,
                  distributed: false,
                  seen: false,
                  new: false,
                  deleted: false,
                },
              };
              this.rooms = [...this.rooms];
            }
          });
        }
      }
      const option = {
        headers: {
          Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
        },
      };

      axios
        .post(
          "http://127.0.0.1:8000/api/readmsg",
          {
            chat_id: data.chatId,
            time: moment().locale("en").format("YYYY-MM-DD HH:mm:ss"),
          },
          option
        )
        .catch((error) => {
          if (error.response.data.message) {
            if (error.response.data.message == "no chat found by This id ") {
              alert("لم يتم العثور على هذه المحادثة ");
            } else {
              alert(error.response.data.message);
            }
          }
        });
    },
  },
  watch: {
    currentRoomId(val, oldVal) {
      if (oldVal) {
        this.disconnect(oldVal);
      }

      this.connect(val);
    },
  },
  created() {
    moment.locale("ar");
    this.getUserInfo();
    this.Chats();
  },
  mounted() {},
};
</script>
<style lang="scss">
.vac-room-container .vac-room-badge {
  background-color: #ff6265;
}
.vac-message-wrapper .vac-line-new {
  color: #ff6265;
}
.vac-message-wrapper .vac-line-new:before {
  border-top: 1px solid #ff6265;
}
.vac-message-wrapper .vac-line-new:after {
  border-top: 1px solid #ff6265;
}
.vac-message-wrapper .vac-message-current {
  box-shadow: 0 1px 1px -1px #ffffff, 0 1px 1px -1px #ffffff,
    0 1px 2px -1px #ffffff;
  background: #ffaaab !important;
  color: #000000;
}
.vac-message-wrapper .vac-message-card {
  text-align: end;
}
.vac-message-wrapper .vac-text-timestamp {
  text-align: left;
  color: #000000;
}
.vac-message-wrapper .vac-icon-check {
  height: 18px;
  width: 18px;
}
.vac-message-wrapper .vac-card-date {
  background: #d8d8d8;
}
.vac-message-actions-wrapper .vac-options-me {
  background: #ffaaab;
}
.vac-message-actions-wrapper .vac-message-options svg {
  height: 25px;
  width: 25px;
}
.vac-message-actions-wrapper .vac-blur-container {
  left: 60px;
}
.vac-message-wrapper .vac-message-image {
  background-color: #ffffff !important;
}
.vac-card-window .vac-chat-container {
  text-align: left;
}
.vac-textarea {
  direction: rtl;
}
.vac-box-search .vac-icon-search {
  left: auto;
  right: 70px;
}
.vac-box-search .vac-input {
  direction: rtl;
  padding: 10px 40px 10px 10px;
}
.vac-box-search .vac-add-icon {
  margin-left: auto;
  padding-left: 10px;
}
.vac-room-container .vac-text-date {
  margin-left: auto;
  direction: ltr;
  margin-right: 5px;
  font-size: 13px;
  text-align: left;
}
.vac-message-wrapper .vac-icon-deleted {
  margin: 2px 0 -2px 2px;
  float: right;
}
.vac-format-message-wrapper .vac-icon-deleted {
  margin: 2px 0 -2px 2px;
  float: right;
}
.vac-format-message-wrapper .vac-format-container {
  display: inline-grid;
}
</style>