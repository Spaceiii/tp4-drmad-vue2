<template>
  <div>
    {{ orders}}
    <ul>
      <li v-for="order in orders" :key="order.uuid">
        {{ order.uuid }} - {{ order.total }} - {{ order.status }} - {{ order.formatedItemsNames }}
        <button v-if="order.status === 'waiting_payment'" @click="payOrder(order.uuid)">Payer</button>
        <button v-if="order.status === 'waiting_payment'" @click="cancelOrder(order.uuid)">Annuler</button>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from "vuex";
import ShopService from "@/services/shop.service";

export default {
  name: "ShopOrders",
  data: () => ({
    orders: []
  }),
  computed: {
    ...mapState('shop', ['shopUser']),
  },
  methods: {
    async getOrders() {
      const apiOrders = await ShopService.getOrders(this.shopUser)
      if (apiOrders.error === 0) {
        this.orders = apiOrders.data
      }
    },
    async payOrder(orderId) {
      const apiResponse = await ShopService.payOrder(this.shopUser, orderId)
      if (apiResponse.error === 0) {
        await this.getOrders()
      }
    },
    async cancelOrder(orderId) {
      const apiResponse = await ShopService.cancelOrder(this.shopUser, orderId)
      if (apiResponse.error === 0) {
        await this.getOrders()
      }
    }
  },
  async mounted() {
    await this.getOrders()
  }
}
</script>