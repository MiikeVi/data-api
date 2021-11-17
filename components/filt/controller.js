const store = require('../../components/calls/store');

function getAllData(filter){
    return new Promise((resolve,reject) => {
        resolve(store.enviarDataFiltrada(filter));
    })
    /*let array= [123,3445,6543,234];
    return new Promise((resolve,reject) => {
        resolve(array);
    })*/

}

module.exports = {
    //getFilteredData
    getAllData
};