var express = require('express');
var app = express(); 
var server = require('http').Server(app);
const Wit = require('node-wit').Wit;
app.use(express.static('public'));


var ACCESS_TOKEN = "ZBWEIXAHRV7QFSNZCZWL2GTY6DME7CLF";


function listen(frase) {
    console.log('Enviando frase: "'+ frase +'" a Wit.AI');

    const cliente = new Wit({accessToken: ACCESS_TOKEN});
    cliente.message(frase, {})
    .then((data) => {
      console.log('Respuesta: ' + JSON.stringify(data));
    })
    .catch(console.error);
  }

  listen('Hola man');

app.get('/', function(req, res){
    res.render('index.html');
});



server.listen(8080, function(){
    console.log("Servidor corriendo en http://localhost:8080");
});