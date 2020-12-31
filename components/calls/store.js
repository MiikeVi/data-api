const parse = require('csv-parse');
const fs = require('fs');
const Call = require('./model');

//=================================================
const companies = [];
const users = [];
const date = [];
const data = [];
const sesionesPorUsuario = [];
const fullData = [];

//=================================================

function enviarData(){
    return data;
}

function enviarFullData(){
    return fullData;
}

function enviarDataFiltrada(filter){
    return contarSesionesUsuario(filter);
}

/*Métodos para retornar sesiones separadas según años, -
meses o días, dependiendo del tiempo entre los filtros startDate y endDate*/
//nota: el array enviado debe ser
function sessionsByYear(){}
function sessionsByMonth(){}
function sessionsByDays(){}
function sessionsAndDates(){

}

/* Lee archivo csv y llena array fullData, además de filtrar los usuarios, 
compañias, fechas existentes guardandolos en distintos array */
function getCalls(){
    //return new Promise(function(resolve, reject){
        fs.createReadStream(__dirname + '../../../test.csv')
        .pipe(
            parse({
                delimiter:','
            })
        )
        .on('data', function (dataRow) {

                if(!companies.includes(dataRow[0])){
                    companies.push(dataRow[0]);     
                }
                if(!users.includes(dataRow[1])){
                    users.push(dataRow[1]);
                }

                date.push(dataRow[4]);
                fullData.push(new Call (dataRow[0], dataRow[1], new Date(dataRow[4])));
        })
        .on('end', function () {
            console.log(data);
            console.log(fullData);
        });

        data.push(companies);
        data.push(users);
        data.push(date);
        
       // })
}

//comprueba si la fecha está entre los intervalos definidos en el filtro del front
function filtroFechas(date, filter){
    firstDate = convertDate(filter.startDate);
    lastDate = convertDate(filter.endDate);
    newDate = convertDate(splitDate(date));

    if(newDate >= firstDate && newDate <= lastDate){
        return true;
    }
    return false;
}

//recibe objeto Date y lo convierte a string
function splitDate(date){
    var stringDate = date.toISOString(),
        dateSplit  = stringDate.split("T"),
        newDate = dateSplit[0];

    return newDate;
}

//Recibe fecha en formato string y la retorna en obj Date
function convertDate(date){
    var newDate = new Date(date);
    return newDate;
}

//retorna array de todos los datos, filtrado
function filtrar(filter){
    if(filter.user !== "ALL" && filter.user !== null){
        var dataFiltrada = fullData.filter( x => x.userId === filter.user);
    }else{
        var dataFiltrada = fullData;
    }
    if(filter.company !== "ALL" && filter.company !== null){
        var aux= [];
        aux= dataFiltrada.filter(x => x.companyId === filter.company);
    }else{
        var aux= [];
        aux= dataFiltrada;
    }
    
    aux2 = aux.filter(x => filtroFechas(x.date, filter) === true);
    return aux2;
}

/* Calcula sesiones de un usuario guardandolas en un nuevo array- 
junto con fechas de primera y última sesión *modularizar* */ 
function contarSesionesUsuario(filter){ 
    arrayFiltrado = filtrar(filter);
    let arraySessions = [];

    if(filter.user !== "ALL"){
        let contador = 0;
        let acum = 0;
        let len = arrayFiltrado.length;
        let firstDate = arrayFiltrado[0].date;
        let lastDate = arrayFiltrado[len-1].date;

        for(let i = 0; i<arrayFiltrado.length ; i++){
            if(filter.user == arrayFiltrado[i].userId){
                if(arrayFiltrado[i+1]){
                    minutos = ((arrayFiltrado[i+1].date - arrayFiltrado[i].date)/60000) + acum
                    if(minutos < filter.interval){
                        acum = minutos;
                    }else 
                    if(minutos >= filter.interval){
                        contador +=1;
                        acum = 0;
                    }
                }else{
                    contador +=1;
                    acum = 0;
                }
            }
        }
        arraySessions.push({usuario : filter.user, sesiones : contador, firstDate : firstDate, lastDate : lastDate});
        return arraySessions;
        
//PENDIENTE        
    }/*else{
        for(let i =0; i<users.length ; i++){
            let contador = 0;
            let acum= 0;
            let firstDate = arrayFiltrado[0].date;
            let lastDate = arrayFiltrado[arrayFiltrado.length-1].date;

            for(let j = 0 ; j < arrayFiltrado.length ; j++){
                    for(let k= 0 ; k < arrayFiltrado.length ; k++){
                        if(users[k] === arrayFiltrado[k+1].userId){
                            if(arrayFiltrado.date[k]){
                                minutos = ((arrayFiltrado[k].date - arrayFiltrado[j].date)/60000) + acum
        
                                if(minutos < filter.interval){     
                                    acum = minutos;
                                }else 
                                if(minutos >= filter.interval){
                                    contador +=1;
                                    acum = 0;
                                }
                            }
                        }
                        
                    }      
            }
            arraySesiones.push({usuario : users[i], sesiones : contador, firstDate : firstDate, lastDate : lastDate});

        }
    }*/
}

//=================================================

module.exports = {
    getC: getCalls,
    enviarData,
    enviarFullData,
    enviarDataFiltrada
}
