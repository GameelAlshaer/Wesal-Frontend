<template>
  <!-- <nav>
       <v-app-bar color="#23262D" dark app class="line" height="90px">
           <v-chip class="ma-2" color="grey darken-1" pill >Dashboard
           <v-icon right small color="cyan"> fas fa-chevron-circle-down</v-icon>
           </v-chip>
            <v-chip class="ma-2" color="grey darken-1" pill >REPORTS
           <v-icon right small color="cyan"> fas fa-chevron-circle-down</v-icon>
           </v-chip>
           <v-spacer></v-spacer>
           <v-text-field filled dense rounded label="search" prepend-inner-icon="fas fa-search"
           class="mt-6 mr-2" sm="2"></v-text-field>
           <v-btn fab color="cyan" elevation="0" class="mr-2">
               
           <v-icon  color="white"> fas fa-user-check</v-icon>
           </v-btn>
            <v-btn fab color="orange" elevation="0" >
               
           <v-icon  color="white"> fas fa-bars</v-icon>
           </v-btn>
       </v-app-bar>
       <v-navigation-drawer v-model="drawer" dark app mini-varient mini-varient-width="122" color="#23262D">
           <v-list>
               <v-list-item-group color="cyan">
               <v-list-item class="mb-4">
               <v-list-item-content align="center">
                   <v-icon align ="center" x-large>fas fa-tv</v-icon>
               </v-list-item-content>
               </v-list-item>
               </v-list-item-group>

                 <v-list-item-group color="cyan" v-model="selectedItem">
               <v-list-item  v-for="(item,i) in items" :key="i" >
               <v-list-item-content align="center">
                   <v-icon align ="center" class="mb-3" v-text="item.icon"></v-icon>
               <v-list-item-subtitle align ="center" class="caption" v-text="item.text"></v-list-item-subtitle>

               </v-list-item-content>
               </v-list-item>
               </v-list-item-group>
           </v-list>
       </v-navigation-drawer>
   </nav>-->

  <div id="app">
    <div>
      <b-sidebar id="sidebar-right" variant="grey" class="sidee" right shadow>
        <div class="px-6 py-2">
          <nav class="mb-5">
            <b-nav vertical>
              <v-img
                :src="useravatar"
                id="avatar"
                rounded
                max-height="80"
                max-width="80"
                class="ml-auto mx-5"
              >
              </v-img>
              <h5
                style="
                  color: #fe6265;
                  font-size: 20px;
                  margin-right: 9px;
                  margin-top: 2px;
                "
              >
                {{ name }}
              </h5>
              <v-divider></v-divider>
              <v-list-item to="favUsers">
                <font-awesome-icon
                  style="
                    color: #fe6265;
                    font-size: 40px;
                    margin-left: auto;
                    margin-right: 7px;
                  "
                  :icon="fav"
                />
                <span
                  class="link"
                  style="text-align: center; margin-left: auto"
                >
                  قائمة المعجب بهم</span
                >
              </v-list-item>
              <v-list-item to="blockedUsers">
                <font-awesome-icon
                  style="
                    color: #fe6265;
                    font-size: 40px;
                    margin-left: auto;
                    margin-right: 7px;
                  "
                  :icon="block"
                />
                <span class="link" style="text-align: center; margin-left: auto"
                  >قائمة المحظورين</span
                >
              </v-list-item>
              <v-list-item to="allRequests">
                <font-awesome-icon
                  style="
                    color: #fe6265;
                    font-size: 40px;
                    margin-left: auto;
                    margin-right: 7px;
                  "
                  :icon="req"
                />
                <span class="link" style="text-align: center; margin-left: auto"
                  >قائمة طلبات الصداقة</span
                >
              </v-list-item>
              <v-list-item to="followersList" v-if="VIP === 1">
                <font-awesome-icon
                  style="
                    color: #fe6265;
                    font-size: 40px;
                    margin-left: auto;
                    margin-right: 7px;
                  "
                  :icon="favme"
                />
                <span class="link" style="text-align: center; margin-left: auto"
                  >قائمة المعجبين بي</span
                >
              </v-list-item>
              <v-list-item to="certifyme">
                <font-awesome-icon
                  style="
                    color: #fe6265;
                    font-size: 40px;
                    margin-left: auto;
                    margin-right: 7px;
                  "
                  :icon="certify"
                />
                <span class="link" style="text-align: center; margin-left: auto"
                  >تصديق حسابي</span
                >
              </v-list-item>
            </b-nav>
          </nav>
        </div>
      </b-sidebar>
    </div>
  </div>
</template>


<script>
import axios from "axios";
//import img from "../assets/UserDefaultAvatar.png";
//import {faHeart,faBan,faStar,faPlus,faCheck} from '@fortawesome/free-solid-svg-icons';
export default {
  data() {
    return {
      drawer: null,
      selectedItem: 0,
      items: [
        { text: "DASHBOARD", icon: "fas fa-tachometer-alt" },

        { text: "REPORTS", icon: "fas fa-file-alt" },
      ],
      /*VIP: "",
      url: img,
      avatarurl: null,
      name:"",*/
    };
  },
  computed: {
    /* fav() {
      return faHeart
    },
     favme() {
      return faStar
    },
    block(){
      return faBan
    },
    req(){
       return faPlus
    },
    certify(){
       return faCheck
    }, 
    useravatar() {
      if (this.avatarurl) return this.avatarurl;
      return this.url;
    },*/
  },
  methods: {
    /* previewImage() {
          this.url = URL.createObjectURL(this.file);
          this.useravatar();
        },
      goToblocks(){
         this.$router.push('/blockedUsers'); 
        }
      ,  
      goTofavs(){
         this.$router.push('/favUsers'); 
      },  
      goTolikedme(){
         this.$router.push('/followersList'); 
      },
      goTocertify(){
         this.$router.push('/certifyme'); 
      }, 
      goTorequests(){
           this.$router.push('/allRequests'); 
      },*/
  },
  mounted() {
    const token = "Bearer ".concat(
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjUyNjY3MSwiZXhwIjoxNjMyOTM3MDcyLCJuYmYiOjE2MzI1MjY2NzIsImp0aSI6ImdhVVJYa0hLT0ZTMnZncTQiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.nsz9eFgELtk7uU-IKF_X8RIxkXusIrcjF22bWuhq7l4"
    );
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/profile",
      headers: { Authorization: token },
    })
      .then((response) => {
        this.VIP = response.data.VIP;
        this.avatarurl = response.data.image;

        this.name = response.data.name;
      })
      .catch(() => {
        return "error occoured";
      });
  },
};
</script>


<style>
.sidee {
  direction: rtl;
  background-color: #757575;

  box-shadow: 1px 2px 5px rgba(255, 98, 101, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon {
  background-color: #f5f5f5;
  margin-right: auto;
  margin-left: auto;
}
#avatar {
  border-radius: 50%;
  border: solid 2px #ff6265;
  margin-right: auto;
}
</style>