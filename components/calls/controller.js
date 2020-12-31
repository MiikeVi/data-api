const store = require('./store');

function getCalls(){
    return new Promise((resolve, reject) => {
         resolve(store.enviarData());
    })
}

module.exports = {
    getCalls
};