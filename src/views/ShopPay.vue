<template>
  <div>
    <input type="text" :value="orderId">
    <button @click="payerCommande">Payer</button>
  </div>
</template>

<script>

export default {
  name: "ShopPay",
  props: {
    orderId: String
  },
  methods: {
    payerCommande() {
      .finalizeOrder(this.orderId)
    }
  }
}
</script>