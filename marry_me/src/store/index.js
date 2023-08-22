import Vue from 'vue';
import Vuex from 'vuex';
//import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usertoken: '',
  },
  mutations: {
   /* logout() {
      axios.get('http://127.0.0.1:8000/api/logout', { headers: { APP_KEY: 'c2Nob29sX2ZpbmRlcl9hcHBfa2V5ZmJkamhqeGNoa2N2anhqY2p2Ymh4amM6dmFzZGhoYXNkaGphZHNrZHNmYW1jbmhkc3VoZHVoY3Nq', Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } });
      this.$store.state.usertoken = null;
      localStorage.clear();
      this.$router.push('/');
    },*/
  },
  actions: {
  },
  modules: {
  },
});
