<template>
    <div>
      <h1>Account number</h1>
  
      <span>Account number</span><input v-model="number">
      <button @click="getAccountAmount(number); getAccountTransactions(number)">Visionner</button>
      <p v-if="accountAmount">{{accountAmount}}</p>
      <div v-if="accountTransactions || accountTransactions.length === 0">
        <ul>
          <li v-for="transaction in accountTransactions" :key="transaction.id">
            Gain/perte de {{transaction.amount}} à date du : {{ printProperDate(transaction.date.$date) }}
          </li>
        </ul>
      </div>
      <p v-else>pas de transaction</p>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'BankAccountView',
  data: () => ({
    number: '',
  }),
  computed: {
    ...mapState('bank', ['accountAmount']),
    ...mapState('bank', ['accountTransactions'])
  },
  methods: {
    ...mapActions('bank', ['getAccountAmount']),
    ...mapActions('bank', ['getAccountTransactions']),
    printProperDate: (date) => {
      let dateObj = new Date(date)
      return dateObj.toDateString() + ' at ' + dateObj.toLocaleTimeString()
    }
  }
}
</script>
