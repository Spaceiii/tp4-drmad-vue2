<template>
    <div>
      <h1>Login</h1>

      <form action="">
        <span>login</span><input v-model="login">
        <span>password</span><input v-model="password">
        <button @click.prevent="logInto">Login</button>
      </form>

    </div>
</template>
  
  <script>
  
  import {mapState, mapActions} from 'vuex'
  export default {
    name: 'ShopLoginView',
    data: () => ({
      login: '',
      password:'',
    }),
    computed: {
      ...mapState('shop', ['shopUser'])
    },
    methods: {
      ...mapActions('shop', ['shopLogin']),
      logInto() {
        this.shopLogin({login: this.login, password: this.password})
        this.$router.push({name: "buy"})
      }
    }
  }
  </script>
  