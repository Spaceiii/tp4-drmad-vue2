import ShopService from "@/services/shop.service";

/**
 * an item in the shop
 * @typedef {Object} Item
 * @property {string} _id
 * @property {string} name
 * @property {string} description
 * @property {string[]} links
 * @property {number} stock
 * @property {{$date: Date}} wait
 * @property {boolean} sold
 * @property {number} price
 * @property {Object[]} promotion
 * @property {string} object
 */

export default
{
    namespaced: true,
    // state = les données centralisées
    state: () => ({
        /**
         * list of viruses
         * @type {Item[]}
         */
        viruses: [],

        /**
         * user logged in the shop
         * @type {Object}
         */
        shopUser: null,

        /**
         * basket of the user
         * @type {Array<{item: Item, amount: number}>}
         */
        basket: [],
    }),
    // mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
    mutations: {
        updateViruses(state, viruses) {
            state.viruses = viruses
        },
        updateShopUser(state, user) {
            state.shopUser = user
        },
        updateBasket(state, basket) {
            state.basket = basket
        },

        /**
         * Adds an item to the basket or updates its quantity if it already exists.
         * @param {Object} state - The Vuex state.
         * @param {Item} item - The item to add to the basket.
         * @param {number} amount - The quantity of the item to add.
         */
        mutateItemToBasket(state, { item, amount }) {
            const existingItem = state.basket.find(it => it.item._id === item._id);
            console.log('amount from mutation', amount)
            if (existingItem) {
                existingItem.amount += amount;
            } else {
                state.basket.push({ item, amount });
            }
        }
    },
    // actions = fonctions asynchrones pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
    actions: {
        async shopLogin({commit}, data) {
            console.log('login');
            let response = await ShopService.shopLogin(data)
            if (response.error === 0) {
                commit('updateShopUser', response.data)
            } else {
                console.log(response.data)
            }
        },
        /**
         * get all viruses
         * @param commit
         * @returns {Promise<Array<Item>>}
         */
        async getAllViruses({commit}) {
            let response = await ShopService.getAllViruses()
            console.log("récupéré avec succès")
            if (response.error === 0) {
                commit('updateViruses', response.data)
            }
            else {
                console.error(response.data)
            }
        },

        /**
         * get basket
         * @param commit
         * @param state
         * @returns {Promise<Array<Item>>}
         */
        async getBasket({commit, state}) {
            console.log('récupération du panier');
            let response = await ShopService.getBasket(state.shopUser)
            if (response.error === 0) {
                commit('updateBasket', response.data)
            } else {
                console.error(response.data)
            }
        },

        /**
         * add an item to the basket
         * @param commit
         * @param state
         * @returns {Promise<Array<Item>>}
         */
        async resetBasket({commit, state}) {
            console.log('réinitialisation du panier');
            let response = await ShopService.resetBasket(state.shopUser)
            if (response.error === 0) {
                commit('updateBasket', [])
            } else {
                console.error(response.data)
            }
        },

        /**
         * add an item to the basket
         * @param commit
         * @param state
         * @param {Item} item
         * @returns {Promise<Array<Item>>}
         */
        async removeItemFromBasket({commit, state}, item) {
            console.log('suppression d\'un item du panier');
            let response = await ShopService.removeItemFromBasket(state.shopUser, item)
            if (response.error === 0) {
                commit('updateBasket', state.basket.filter(it => it.item._id !== item._id))
            } else {
                console.error(response.data)
            }
        },


        /**
         * add an item to the basket
         * @param commit
         * @param state
         * @param {Item} item
         * @param {number} amount
         * @returns {Promise<void>}
         */
        async addItemToBasket({commit, state}, { item, amount }) {
            console.log('ajout d\'un item au panier');
            let response = await ShopService.addItemToBasket(state.shopUser, {item, amount: +amount})
            if (response.error === 0) {
                commit('mutateItemToBasket', { item, amount: +amount })
                console.log('item ajouté au panier')
            } else {
                console.log("erreur lors de l'ajout de l'item au panier")
                console.error(response.data)
            }
        },

        /**
         * get order from the user
         * @param state
         * @param {String} orderId
         */
        async finalizeOrder({state}, orderId) {
            console.log('récupération de la commande');
            let response = await ShopService.finalizeOrder(state.shopUser, orderId)
            if (response.error === 0) {
                console.log(response.data)
            }
            else {
                console.error(response.data)
            }
        }
    },
}