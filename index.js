var express = require('express');
var app = express(); 
var server = require('http').Server(app);
const Wit = require('node-wit').Wit;
app.use(express.static('public'));


var ACCESS_TOKEN = "ZBWEIXAHRV7QFSNZCZWL2GTY6DME7CLF";


function enviarFrase(frase) {
    console.log('Enviando frase: "'+ frase +'" a Wit.AI');

    const cliente = new Wit({accessToken: ACCESS_TOKEN});
    cliente.message(frase, {})
    .then((data) => {
      console.log('Respuesta: ' + JSON.stringify(data));
      procesarFrase(data);
    })
    .catch(console.error);
  }
 
function procesarFrase(data){
    console.log("Procesando la data");
    console.log('Mensaje recibido: "'+ data._text +'"');
    var intenciones = data.entities.intent;
    var maxConf = 0;
    var mejorIntencion = "";
    for (i = 0; i < intenciones.length; i++){
        var confianza = intenciones[i].confidence;
        if (confianza > maxConf) {
            maxConf = confianza;
            mejorIntencion = intenciones[i].value;
        }
    }
    console.log("Intención identificada: " + mejorIntencion);
    responder(mejorIntencion);
}

function responder(intencion){
    switch(intencion) {
        case "Saludo":
            console.log("Respuesta del bot: Hola, qué tal");
            break;
    }
}
app.get('/', function(req, res){
    res.render('index.html');
});




server.listen(8080, function(){
    console.log("Servidor corriendo en http://localhost:8080");
});
enviarFrase('Hola man');