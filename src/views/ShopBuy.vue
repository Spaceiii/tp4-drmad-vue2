<script>
export default {
  name: "ShopBuy",
  components: {
    ItemList: () => import('@/components/ItemsList'),
    BasketList: () => import('@/components/BasketList')
  }
}
</script>

<template>
  <div class="main">
    <ItemList/>
    <BasketList/>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: row;

}
</style>