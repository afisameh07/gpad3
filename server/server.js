const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');

const api = require('./routes/api');

const utilisateursController = require('./controllers/utilisateursController');
const vehiculesController = require('./controllers/vehiculesController');

const typesvehiculesController = require('./controllers/typesvehiculesController');
const marquesvehiculesController = require('./controllers/marquesvehiculesController');
const modelesvehiculesController = require('./controllers/modelesvehiculesController');
const servicesvehiculesController = require('./controllers/servicesvehiculesController');


const fournisseursController = require('./controllers/fournisseursController');
const depencesController = require('./controllers/depencesController');



const excelController = require('./controllers/excelController');


const port = 5000;


const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json()); 

app.use('/api', api);
app.use('/typesvehicules', typesvehiculesController);
app.use('/marquesvehicules', marquesvehiculesController);
app.use('/modelesvehicules', modelesvehiculesController);
app.use('/servicesvehicules', servicesvehiculesController);
app.use('/utilisateurs', utilisateursController);

app.use('/vehicules', vehiculesController);
app.use('/depences', depencesController);
app.use('/fournisseurs', fournisseursController);

app.use('/excel', excelController);


app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});