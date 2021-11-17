const express = require('express');
const bodyParser = require('body-parser');
const router = require('./network/routes');
const parse = require('csv-parse');
const fs = require('fs');
const store = require('./components/calls/store');


//const csvData = [];

var app = express();
app.use(bodyParser.json());

router(app);

app.use('/app', express.static('public'));


store.getC();

app.listen(3000);
console.log('app esta escuchando en http://localhost:3000');

/*fs.createReadStream(__dirname + '/log.practica.2.csv')
    .pipe(
        parse({
            delimiter:','
        })
    )
    .on('data', function (dataRow) {
            if(!csvData.includes(dataRow[0])){
                csvData.push(dataRow[0]);
            }
    })
    .on('end', function () {
        console.log(csvData);
    });*/
