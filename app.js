//adding express to the application

const express =  require('express');
const app = express();
const shopRoutes=  require('./api/routes/shop');
const bodyParser = require('body-parser');
var maxId = -1;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use('/shop', shopRoutes);

module.exports = maxId;
module.exports = app;