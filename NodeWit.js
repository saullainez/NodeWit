const Wit = require('node-wit').Wit;//Llamamos a la librería Wit


//Token de acceso de nuestra aplicación en Wit
var ACCESS_TOKEN = "ZBWEIXAHRV7QFSNZCZWL2GTY6DME7CLF";
exports.respuesta = "";
exports.mejorIntencion = "";


//Este método envía la frase a nuestra aplicación en Wit para obtener la data procesada por el PLN
exports.enviarFrase = function (frase, callback) {
    console.log('Enviando frase: "'+ frase +'" a Wit.AI');
//Instanciamos un nuevo cliente de Wit
    const cliente = new Wit({accessToken: ACCESS_TOKEN}); //Creamos el cliente con el Token de nuestra app
    cliente.message(frase, {}) //Mediante el método "message" enviamos la frase a Wit, usando la instancia de nuestra app recién creada
    .then((data) => { //En data obtenemos la respuesta de Wit (o sea la frase procesada por PLN)
      console.log('Respuesta: ' + JSON.stringify(data)); //Mostramos el JSON "raw" o crudo
      console.log("Procesando la data");
      console.log('Mensaje recibido: "'+ data._text +'"');
      var intenciones = data.entities.intent;
      var maxConf = 0;
      //var mejorIntencion = "";
      for (i = 0; i < intenciones.length; i++) {
        var confianza = intenciones[i].confidence;
        if (confianza > maxConf) {
            maxConf = confianza;
            mejorIntencion = intenciones[i].value;
        }
      }
      console.log("Intención identificada: " + mejorIntencion);
      switch(mejorIntencion){
        case "Saludo":
          respuesta = "Hola, qué tal";
          break;
        case "Saludo matutino":
          respuesta = "Buen día";
          break;
        case "Saludo vespertino":
          respuesta = "Buenas tardes";
          break;
        case "Saludo nocturno":
          respuesta = "Buenas noches";
          break;
        case "Insulto":
          respuesta = "Así me hizo Dios";
          break;
        case "Identidad":
          respuesta = "Soy el bot más mera verga";
          break;
        case "Nombre":
          respuesta = "Me llamo HectorBot";
          break;
        case "Miguel":
          respuesta = "Uyy Miguelito, me gusta su pitido";
          break;
      }
      console.log("Respuesta del bot: " + respuesta);
      return callback(null, respuesta, mejorIntencion);
      
      //procesarFrase(data); //Llamamos al método que nos va a procesar esa respuesta para obtener la intención identificada por el PLN
    })
    .catch(console.error);
    
  }
