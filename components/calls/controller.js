const store = require('./store');

/*function getCalls(filter){
    return new Promise((resolve, reject) => {
        resolve(store.getC(filter));
        console.log('filter' + filter);

    })
}*/

function getCalls(){
    return new Promise((resolve, reject) => {
         resolve(store.enviarData());


    })
}

module.exports = {
    getCalls
};