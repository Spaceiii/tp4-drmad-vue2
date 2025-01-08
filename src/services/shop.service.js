import LocalSource from "@/data/controller";

async function shopLoginFromLocalSource(data) {
    // récupération auprès de la source locale
    return LocalSource.shopLogin(data)
}
/*
async function shopLoginFromAPI(data) {
  // a écrire quand l'API est fonctionnelle
  return {}
}
 */

async function getAllVirusesFromLocalSource() {
    // récupération auprès de la source locale
    return LocalSource.getAllViruses()
}

/*
async function getAllVirusesFromAPI() {
  // a écrire quand l'API est fonctionnelle
  return {}
}
*/

async function shopLogin(data) {
    let response = null;
    try {
        // changer la méthode appelée quand cette fonctionnalité l'API est prête
        response = await shopLoginFromLocalSource(data)
    }
    // NB : le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur réseau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de se loguer'  }
    }
    return response
}


async function getAllViruses() {
    let response = null;
    try {
        // changer la méthode appelée quand cette fonctionnalité l'API est prÃªte
        response = await getAllVirusesFromLocalSource()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur réseau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des viruses'  }
    }
    return response
}


async function getBasketFromLocalSource(user) {
    return LocalSource.getBasket(user);
}

async function removeItemFromBasketFromLocalSource(user, item) {
    return LocalSource.removeItemFromBasket(user, item);
}

async function resetBasketFromLocalSource(user) {
    return LocalSource.resetBasket(user);
}

async function getBasket(user) {
    let response = null;
    try {
        response = await getBasketFromLocalSource(user)
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer le panier'  }
    }
    return response
}

async function resetBasket(user) {
    let response = null;
    try {
        response = await resetBasketFromLocalSource(user)
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de réinitialiser le panier'  }
    }
    return response
}

async function removeItemFromBasket(user, item) {
    let response = null;
    try {
        response = await removeItemFromBasketFromLocalSource(user, item)
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de supprimer l\'item du panier'  }
    }
    return response
}

async function buyBasketBasketFromLocalSource(user) {
    return LocalSource.buyBasket(user);
}

async function buyBasket(user) {
    let response = null;
    try {
        response = await buyBasketBasketFromLocalSource(user)
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible d\'acheter le panier'  }
    }
    return response
}

async function finalizeOrderFromLocalSource(user, orderId) {
    return LocalSource.finalizeOrder(user, orderId);
}

async function finalizeOrder(user, orderId) {
    let response = null;
    try {
        response = await finalizeOrderFromLocalSource(user, orderId)
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la commande'  }
    }
    return response
}

export default {
    shopLogin,
    getAllViruses,
    getBasket,
    resetBasket,
    removeItemFromBasket,
    buyBasket,
    finalizeOrder
}