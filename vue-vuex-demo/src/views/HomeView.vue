<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h3>{{ getCounter }}</h3>
    <button @click="addClickHandle">增加</button>
    <button @click="asyncAddClickHandle">异步增加</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {mapGetters , mapMutations , mapActions} from 'vuex'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  computed:{
    ...mapGetters(["getCounter"])
  },
  methods:{
    ...mapMutations(["addCounter"]),
    addClickHandle(){
      // this.$store.commit("addCounter",15)
      this.addCounter(16)
    },
    ...mapActions(["asyncAddCounter"]),
    asyncAddClickHandle(){
      // this.$store.dispatch("asyncAddCounter")
      this.asyncAddCounter();
    }
  }
}
</script>
