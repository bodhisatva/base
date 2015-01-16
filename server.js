var express = require('express');
var path = require('path');//__dirname vaatii
var bodyParser = require('body-parser'); //express tarvitsee jsonin lukemiseen body-parser moduulin
var routerInfo = require('./app/router/main'); //annetaan polku reitityskongiguraatiolle

var app = express(); // käynnistetään express

app.use(bodyParser.json()); //kutsutaan body-parseria jsonille
app.use(bodyParser.urlencoded({
    extended: true
})); //url-parametreille kysymysmerkeillä

app.use(express.static(path.join(__dirname, '/public'))); //määritellään aloituspolku staattisille tiedostoille (bootstrap)
app.use(routerInfo); //annettaan reititystieto expressille

app.set('views', path.join(__dirname, 'app/views')); //määritellään polku views-kansioon
app.set('view engine', 'ejs'); //muutetaan express:in template-engine ejs:si, embedded javascript
app.set('port', process.env.PORT || 3000);//määritellään sovelluksen portti

app.listen(app.get('port'), function() {
    console.log('Server started, ready on port: ' + app.get('port'));
});

exports = module.exports = app;
