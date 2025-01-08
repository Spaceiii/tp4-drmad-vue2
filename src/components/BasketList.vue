<template>
  <div>
    <CheckedList
      :data="basket"
      :fields="['item', 'amount']"
      @list-button-clicked="resetBasket"
      @item-button-clicked="removeItemFromBasket"
    />

    <button @click="resetBasket">Vider le panier</button>
    <button @click="buyBasket">Acheter</button>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex"
import CheckedList from "@/components/CheckList.vue"
import ShopService from "@/services/shop.service";
/** @typedef {import('@/store').Item} Item */

export default {
  name: "BasketList",
  components:{CheckedList},
  computed: {
    ...mapState('shop', ['basket', 'shopUser']),
  },
  methods: {
    ...mapActions('shop', ['resetBasket', 'removeItemFromBasket', 'getBasket']),
    buyBasket() {
      const orderUuid = ShopService.buyBasket()
      if (orderUuid.error === 0) {
        this.resetBasket()
        this.$router.push(`/shop/pay/${orderUuid.data.uuid}`)
      }
    }
  },
  mounted() {
    this.getBasket()
  }
}
</script>