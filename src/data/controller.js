import { items, shopusers, bankaccounts, transactions } from './data'
import {v4 as uuidv4} from 'uuid'
import bcrypt from 'bcryptjs'


function shopLogin(data) {
    if ((!data.login) || (!data.password)) return {error: 1, status: 404, data: 'aucun login/pass fourni'}
    // pour simplifier : test uniquement le login
    let user = shopusers.find(e =>
        e.login === data.login && bcrypt.compareSync(data.password, e.password
    ))
    if (!user) return {error: 1, status: 404, data: 'login/pass incorrect'}
    // générer un uuid de session pour l'utilisateur si non existant
    if (!user.session) {
        user.session = uuidv4()
    }
    // retourne uniquement les champs nécessaires
    let u = {
        _id: user._id,
        name: user.name,
        login: user.login,
        email: user.email,
        session: user.session
    }
    return {error: 0, status: 200, data: u}
}

function getAllViruses() {
    return {error: 0, data: items}
}

function getBasket(user) {
    if (!user) return { error: 1, status: 404, data: 'Pas d\'utilisateur actif!' }
    let u = shopusers.find(e => e._id === user._id)
    if (!u) return {error: 1, status: 404, data: 'utilisateur non trouvé'}
    if (!u.basket) {
        u.basket = []
    }
    return {error: 0, status: 200, data: u.basket}
}

function getAccountAmount(number) {
    if (!number) return {error: 1, status: 404, data: 'aucun numéro de compte fourni'}

    let account = bankaccounts.find(e => e.number === number)
    if (account) {
        return {error: 0, status: 200, data: account.amount}
    } else {
        return {error: 1, status: 404, data: 'compte non trouvé'}
    }
}

function getAccountTransactions(number) {
    if (!number) return {error: 1, status: 404, data: 'aucun numéro de compte fourni'}

    let account = bankaccounts.find(e => e.number === number)
    if (!account) {
        return {error: 1, status: 404, data: 'compte non trouvé'}
    }

    let listOfTransaction = transactions.filter(e => e.account === account._id)
    return {error: 0, status: 200, data: listOfTransaction.map(e => { return {amount: e.amount, date: e.date, uuid: e.uuid} })}
}

function setUserBasket(user, basket) {
    let u = shopusers.find(e => e._id === user._id)

    if (!u) return {error: 1, status: 404, data: 'utilisateur non trouvé'}
    if (!basket) return {error: 1, status: 404, data: 'panier non trouvé'}
    u.basket = basket
    return {error: 0, status: 200, data: 'panier mis à jour'}
}

function resetBasket(user) {
    if (!user) return { error: 1, status: 404, data: 'Pas d\'utilisateur actif!' }
    let u = shopusers.find(e => e._id === user._id)
    if (!u) return {error: 1, status: 404, data: 'utilisateur non trouvé'}
    u.basket = []
    return {error: 0, status: 200, data: 'panier réinitialisé'}
}

function removeItemFromBasket(user, item) {
    let u = shopusers.find(e => e._id === user._id)
    console.log(u)
    if (!u) return {error: 1, status: 404, data: 'utilisateur non trouvé'}
    if (!u.basket) return {error: 1, status: 404, data: 'panier non trouvé'}
    let index = u.basket.findIndex(e => e.item._id === item._id)
    if (index === -1) return {error: 1, status: 404, data: 'item non trouvé dans le panier'}
    u.basket.splice(index, 1)
    return {error: 0, status: 200, data: item}
}

function buyBasket(user) {
    let u = shopusers.find(e => e._id === user._id)
    if (!u) return {error: 1, status: 404, data: 'utilisateur non trouvé'}
    if (!u.basket) return {error: 1, status: 404, data: 'panier non trouvé'}

    const uuid = uuidv4()
    u.orders.push({
        items: u.basket,
        date: new Date(),
        total: u.basket.reduce((acc, val) => acc + val.price, 0),
        status: 'waiting_payment',
        uuid
    })

    u.basket = []
    return {error: 0, status: 200, data: {uuid}}
}

function addItemToBasket(user, {amount, item}) {
    let u = shopusers.find(e => e._id === user._id)
    if (!u) return {error: 1, status: 404, data: 'utilisateur non trouvé'}
    if (!u.basket) u.basket = []
    let index = u.basket.findIndex(e => e.item._id === item._id)
    if (index === -1) {
        u.basket.push({item, amount})
    } else {
        u.basket[index].amount += amount
    }
    console.log(u)
    return {error: 0, status: 200, data: 'item ajouté au panier'}
}

function finalizeOrder(user, orderId) {
    let u = shopusers.find(e => e._id === user._id)
    if (!u) return {error: 1, status: 404, data: 'utilisateur non trouvé'}
    if (!u.orders || u.orders.findIndex(e => e.uuid === orderId) === -1)
        return {error: 1, status: 404, data: 'commande non trouvée'}
    return {error: 0, status: 200, data: 'commande finalisée'}
}

export default {
    shopLogin,
    getAllViruses,
    getBasket,
    getAccountAmount,
    getAccountTransactions,
    resetBasket,
    removeItemFromBasket,
    buyBasket,
    addItemToBasket,
    finalizeOrder,
    setUserBasket
}