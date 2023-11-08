import * as web3 from 'web3'

// Passing in the eth or web3 package is necessary to allow retrieving chainId, gasPrice and nonce automatically
// for accounts.signTransaction().
function getRandomString(length = 32) {
    let arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        num = "";
    for (let i = 0; i < length; i++) {
        num += arr[parseInt(Math.random() * 36)];
    }
    return num;
}

function getKey() {
    return web3.eth.accounts.create(getRandomString(32))
}

export {
    getKey
}
