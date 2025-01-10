<template>
  <div>
    <input type="text" :value="orderId">
    <button @click="payerCommande">Payer</button>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "ShopPay",
  props: {
    orderId: String
  },
  methods: {
    ...mapActions('shop', ['finalizeOrder']),
    payerCommande() {
      this.finalizeOrder(this.orderId)
    }
  }
}
</script>