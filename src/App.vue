<template>
  <div id="app">
    <NavBar :titles="titles"/>

    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Welcome to DrMad app</h1>

    <router-view></router-view>
  </div>

</template>

<script>

import {mapActions, mapState} from 'vuex'
import NavBar from "@/components/Navbar.vue";

export default {
  name: 'App',
  components: {NavBar},

  data: () => ({
    unloggedTitles: [
      {title: 'Login', color: 'red', link: '/shop/login'}
    ],
    loggedTitles: [
      {title: 'Logout', color: 'red', link: '/shop/logout'},
      {title: 'Shop', color: 'green', link: '/shop/buy'},
      {title: 'Commands', color: 'blue', link: '/shop/orders' }
    ],
  }),
  computed: {
    ...mapState('shop', ['shopUser']),
    titles() {
      return this.shopUser ? this.loggedTitles : this.unloggedTitles
    }
  },
  methods: {
    ...mapActions('shop', ['getAllViruses', 'shopLogin']),
  },
  mounted() {
    this.getAllViruses()
    this.shopLogin({login: 'drmad', password: 'drmad'})
  }
};
</script>