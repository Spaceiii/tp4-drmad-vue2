<template>
  <div>
    <h1>Les virus</h1>
    <p>Le tableau dans le store : {{ viruses }}</p>
    <p>sous forme de liste avec certains champs</p>

    <CheckedList
        :data="viruses"
        :fields="['name', 'price', 'stock']"
        :itemCheck="false"
        :checked="[]"
        :itemButton="{show: true, text: 'Affiche les infos du virus'}"
        :listButton="{show: false, text: ''}"
        @checked-change="(index) => checkedViruses[index] = !checkedViruses[index]"
        @item-button-clicked="(index) => printVirusesInfo(index)"
    />

    <span>Filtres :</span>
    <label for="filterpriceactive">par prix</label>&nbsp;<input type="checkbox" v-model="filterPriceActive" id="filterpriceactive">
    <label for="filternameactive">par nom</label>&nbsp;<input type="checkbox" v-model="filterNameActive" id="filternameactive">
    <label for="filterstockactive">par stock</label>&nbsp;<input type="checkbox" v-model="filterStockActive" id="filterstockactive">

    <hr />
    <div v-if="filterPriceActive">
      <h2>Filtrer les virus par prix</h2>
      <label for="filterprice">prix inférieur à : </label><input type="number" v-model="priceFilter" id="filterprice">
      <CheckedList
          :data="filterVirusesByPrice"
          :fields="['name', 'price']"
          :itemCheck="false"
          :checked="[]"
          :itemButton="{show: false, text: ''}"
          :listButton="{show: false, text: ''}"/>
    </div>


    <div v-if="filterNameActive">
      <h2>Filtrer les virus par nom</h2>
      <label for="filtername">nom contient : </label><input type="text" v-model="nameFilter" id="filtername">
      <CheckedList
          :data="filterVirusesByName"
          :fields="['name', 'price']"
          :itemCheck="false"
          :checked="checkedViruses"
          :itemButton="{show: false, text: ''}"
          :listButton="{show: false, text: ''}"/>
    </div>

    <div v-if="filterStockActive">
      <h2>Filtrer les virus en stock</h2>
      <label for="filterstock">En stock : </label><input type="checkbox" v-model="filterByStock" id="filterstock">
      <CheckedList
          :data="filterVirusesInStock"
          :fields="['name', 'price', 'promotion']"
          :itemCheck="false"
          :checked="[]"
          :item-amount="true"
          :item-button="{show: false, text: ''}"
          :list-button="{show: false, text: ''}"
          @list-button-clicked="listButtonClicked"
          @item-button-clicked="itemButtonClicked"
          />
    </div>
  </div>
</template>



<script>
import {mapState, mapMutations} from 'vuex'
import CheckedList from "@/components/CheckList.vue";
export default {
  name: 'VirusesView',
  components: {CheckedList},
  data: () => ({
    priceFilter: 0,
    nameFilter: '',
    filterByStock: false,
    filterPriceActive: false,
    filterNameActive: false,
    filterStockActive: false,
    checkedViruses: []
  }),
  mounted() {
    this.checkedViruses = Array(this.viruses.length).fill(false);
  },
  computed: {
    ...mapState('shop', ['viruses']),

    filterVirusesByPrice() {
      if (isNaN(this.priceFilter) || this.priceFilter <= 0) return this.viruses

      return this.viruses.filter(v => v.price <= this.priceFilter)
    },

    filterVirusesByName() {
      if (this.nameFilter.length > 0) return this.viruses.filter(v => v.name.includes(this.nameFilter))
      return this.viruses
    },

    /**
     * Filter viruses in stock
     * @return {{name: String, price: Number}[]}
     */
    filterVirusesInStock() {
      if (!this.filterByStock) return this.viruses
      return this.viruses.filter(v => v.stock > 0)
    },
  },
  methods: {
    ...mapMutations('shop', ['addItemToBasket']),
    printVirusesInfo(index) {
      alert(`Le virus ${this.viruses[index].name} coûte ${this.viruses[index].price} et il en reste ${this.viruses[index].stock}`)
    },
    itemButtonClicked({index, quantity}) {
      if (quantity <= 1) return
      this.addItemToBasket({item: this.viruses[index], quantity})
    },
    listButtonClicked({quantity}) {
      quantity.forEach((q, index) => {
        if (q > 0) {
          this.addItemToBasket({item: this.viruses[index], quantity: q})
        }
      })
      this.checkedViruses.fill(false)
    }
  },
}
</script>
