<template>
  <div>
    <input type="text" :value="orderId ? orderId : 'rien'">
    <button @click="payerCommande">Payer</button>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "ShopPay",
  data: () => ({
    orderId: null
  }),
  methods: {
    ...mapActions('shop', ['finalizeOrder']),
    payerCommande() {
      this.finalizeOrder(this.orderId)
    }
  },
  mounted() {
    this.orderId = this.$route.params.orderId
  }
}
</script>