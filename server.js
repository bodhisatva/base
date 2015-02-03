var express = require('express');
var path = require('path');//__dirname vaatii
var bodyParser = require('body-parser'); //express tarvitsee jsonin lukemiseen body-parser moduulin
var routerInfo = require('./app/router/main'); //annetaan polku reitityskongiguraatiolle

var app = express(); // käynnistetään express

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, '/public'))); //määritellään aloituspolku staattisille tiedostoille
app.use(routerInfo); //annettaan reititystieto expressille

app.set('views', path.join(__dirname, 'app/views')); //määritellään polku views-kansioon
app.set('view engine', 'ejs'); //määritellään expressin template-engine ejs:si
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
    console.log('Server started, ready on port: ' + app.get('port'));
});

exports = module.exports = app;
