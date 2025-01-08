import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/store/shop.store'
import bank from '@/store/bank.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    shop,
    bank
  }
})
