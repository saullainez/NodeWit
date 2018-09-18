const Wit = require('node-wit').Wit;//Llamamos a la librería Wit


//Token de acceso de nuestra aplicación en Wit
var ACCESS_TOKEN = "ZBWEIXAHRV7QFSNZCZWL2GTY6DME7CLF";

//Este método envía la frase a nuestra aplicación en Wit para obtener la data procesada por el PLN
exports.enviarFrase = function (frase) {
    console.log('Enviando frase: "'+ frase +'" a Wit.AI');
//Instanciamos un nuevo cliente de Wit
    const cliente = new Wit({accessToken: ACCESS_TOKEN}); //Creamos el cliente con el Token de nuestra app
    cliente.message(frase, {}) //Mediante el método "message" enviamos la frase a Wit, usando la instancia de nuestra app recién creada
    .then((data) => { //En data obtenemos la respuesta de Wit (o sea la frase procesada por PLN)
      console.log('Respuesta: ' + JSON.stringify(data)); //Mostramos el JSON "raw" o crudo
      procesarFrase(data); //Llamamos al método que nos va a procesar esa respuesta para obtener la intención identificada por el PLN
    })
    .catch(console.error);
  }

   //Esta función recibe la data de Wit, cruda, y la procesa para sacar la intención identificada por el PLN
function procesarFrase(data){
    console.log("Procesando la data");
    console.log('Mensaje recibido: "'+ data._text +'"');//En data._text viene el texto o la frase que Wit ha procesado
    var intenciones = data.entities.intent;//En intenciones almacenamos todas las intenciones que Wit ha identificado y almacenado en la entidad "intent"
    /*Las dos líneas siguientes las escribimos porque Wit muchas veces identifica más de una intención, cada intención
    tiene un valor de confianza que determina qué tan acertada es esa intención respecto a la frase enviada,
    entonces necesitamos obtener la intención con mayor grado de confianza porque esta sería la intención que
    más se acerque a lo que buscamos con el entrenamiento*/
    var maxConf = 0;//Variable para identificar la máxima confianza de una intención
    var mejorIntencion = "";//Variable para almacenar la intención que tiene la mayor confianza
    /*En este ciclo recorremos las intenciones que Wit ha identificado, para poder obtener lo descrito 
    en la parte de arriba (La intención con mayor grado de confianza)*/
    for (i = 0; i < intenciones.length; i++){
        var confianza = intenciones[i].confidence;//Obtenemos el grado de confianza para esa entidad
        /*Si la confianza en la intención actual es mayor que la confianza máxima encontrada hasta el momento,
        entonces esa confianza pasa a ser la confianza máxima y la intención que tenga ese grado de confianza,
        pasa a ser la mejor intención*/
        if (confianza > maxConf) { 
            maxConf = confianza;
            mejorIntencion = intenciones[i].value;
        }
    }
    //Debug para identificar que sea la mejor intención, con el grado de confianza más alta
    console.log("Intención identificada: " + mejorIntencion);
    //Llamamos a la función que va a responder al usuario, según la intención identificada
    responder(mejorIntencion);
}

//Esta función responde al usuario, según la intención identificada
function responder(intencion){
    //Switch que va a responder según la intención
    switch(intencion) {
        case "Saludo":
            console.log("Respuesta del bot: Hola, qué tal");
            break;
    }
}

