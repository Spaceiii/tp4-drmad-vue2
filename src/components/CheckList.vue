<template>
  <div>
    <ul>
      <li v-for="(value, index) of data" :key="index">
        <input
            v-if="itemCheck"
            :id="value + '-' + index"
            :name="value + '-' + index"
            :checked="checked[index]"
            @click="$emit('checked-change', index)"
            type="checkbox">
        <span v-for="(innerValue, innerIndex) of fields" :key="innerIndex">{{ value[innerValue] }}&nbsp;</span>
        <input
            v-if="itemAmount"
            type="text"
            :name="`item-amount-input-${index}`"
            v-model="itemQuantity[index]">
        <button
            @click="itemButtonClicked"
            v-if="itemButton.show"
        >{{ itemButton.text }}</button>
      </li>
    </ul>
    <button v-if="listButton.show" @click="listButtonClicked">{{ listButton.text }}</button>
  </div>
</template>

<script>

export default {
  name: 'CheckedList',
  props: {
    data: Array, // les données sources
    fields: Array, // le tableau contenant le nom des champs
    itemCheck: Boolean, // s'il y a des case à cocher
    checked: Array, // le tableau des cases cochées
    itemButton: Object, // l'objet pour les boutons d'items
    listButton: Object, // l'objet pour le bouton de liste
    itemAmount: Boolean // s'il y a des champs de quantité
  },
  data: () => ({
    itemQuantity: [] // le tableau des quantités d'items
  }),
  mounted() {
    this.itemQuantity = new Array(this.data.length).fill(0)
  },
  methods: {
    itemButtonClicked(index) {
      this.$emit('item-button-clicked', {index, quantity: this.itemQuantity[index]})
    },
    listButtonClicked() {
      this.$emit('list-button-clicked', {quantity: this.itemQuantity})
    }
  }
}
</script>

<style scoped>
</style>