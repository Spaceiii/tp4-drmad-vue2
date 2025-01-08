import LocalSource from '@/data/controller';

function getAccountAmount(number) {
    let response = null;
    try {
        response = getAccountAmountFromLocalSource(number);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer les comptes' };
    }
    return response;
}

function getAccountAmountFromLocalSource(number) {
    return LocalSource.getAccountAmount(number);
}

function getAccountTransactions(number) {
    let response = null;
    try {
        response = getAccountTransactionsFromLocalSource(number);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer les transactions' };
    }
    return response;
}


function getAccountTransactionsFromLocalSource(number) {
    return LocalSource.getAccountTransactions(number);
}

export default {
    getAccountAmount,
    getAccountTransactions,
}