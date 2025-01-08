import BankService from "@/services/bankaccount.service";

export default {
    namespaced: true,
    state : () => ({
        accountAmount: 0,
        accountTransactions: []
    }),
    mutations: {
        updateAccountAmount(state, amount) {
            state.accountAmount = amount
        },
        updateAccountTransactions(state, transactions) {
            state.accountTransactions = transactions
        },
    },
    actions: {
        async getAccountAmount({commit}, number) {
            console.log('récupération du montant du compte');
            let accountAmount = await BankService.getAccountAmount(number)

            if (accountAmount.error === 0) {
                commit('updateAccountAmount', accountAmount.data)
            }
            else {
                console.log(accountAmount.data)
            }
        },
        async getAccountTransactions({commit}, number) {
            console.log('récupération des transactions du compte');
            let transactions = await BankService.getAccountTransactions(number)

            if (transactions.error === 0) {
                commit('updateAccountTransactions', transactions.data)
            }
            else {
                console.log(transactions.data)
            }
        },
    }
}