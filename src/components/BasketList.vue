<template>
  <div>
    <CheckedList
      :data="normalizedBasket"
      :fields="['name', 'amount']"
      :item-button="{text: 'supprimer', show: true}"
      @item-button-clicked="removeItem"
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
  data: () => ({
  }),
  computed: {
    ...mapState('shop', ['basket', 'shopUser']),
    normalizedBasket() { return this.basket.map(it => {return {amount: it.amount, name: it.item.name}})}
  },
  methods: {
    ...mapActions('shop', ['resetBasket', 'removeItemFromBasket', 'getBasket', 'shopLogin']),
    buyBasket() {
      const orderUuid = ShopService.buyBasket()
      if (orderUuid.error === 0) {
        this.resetBasket()
        this.$router.push(`/shop/pay/${orderUuid.data.uuid}`)
      }
    },
    removeItem ({index}) {
      this.removeItemFromBasket(this.basket[index].item)
    }
  },
  mounted() {
    this.shopLogin({login: 'drmad', password: 'drmad'}).then(() => {
      this.getBasket()
    })
  }
}
</script>