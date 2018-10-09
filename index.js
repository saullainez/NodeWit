//Para iniciar un servidor en Express
var express = require('express'); //Llamamos a la librería Express (Importar)
var app = express(); //Ejecutamos la librería Express (Instanciar)
//Es necesario instalar Express por npm, con el comando: npm install express --save (el --save es para que lo escriba en el package.json)
/*bodyParser es un Middleware que nos permite parsear el cuerpo de la solicitud entrante, y exponer esos datos
en req.body, esto nos facilita acceder a esos datos*/
var bodyParser = require('body-parser');
var NodeWit = require('./NodeWit.js');//Importamos el módulo creado por nosotros

//Usamos el framework "static" para usar ficheros estáticos (ejemplo imágenes, css, etc.) en nuestro proyecto
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));//Para procesar las peticiones que vienen en la URL(cuando enviamos los datos con el formulario)
app.use(bodyParser.json());//Para procesar las peticiones que vienen como JSON(cuando usamos ajax)
app.set('views', __dirname + '/public/vistas');//Establecemos el directorio donde estarán las vistas
/*Establecemos a ejs como motor para renderizar las vistas
Debe ser instalado mediante: npm install ejs --save*/
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);//Para renderizar archivos HTML con ejs


//----------------------------------RUTAS-------------------------------------------------------------------
//Rutas del GET y POST utilizando el formulario

/*El servidor muestra el index.ejs cuando se ingresa a la raíz del sitio. Esta vista la utilizamos para
hacer el POST con el formulario*/
app.get('/', function(req, res){
    /*Variable que le pasaremos a la vista, como es el GET y solamente estamos mostrando la vista
    enviamos valores por defecto*/
    var datos = {
        Intencion: "Sin definir",
        Respuesta: "Sin definir"
    };
    //Motramos la vista y le enviamos los valores en la variables datos.
    res.render('index.ejs', datos);
});

//POST utilizando el formulario
app.post('/', function (req, res) {
    //Obtenemos la frase que viene en la petición
    var frase = req.body.Frase
    //Si la frase no está definida, enviamos mensajes de error, en la consola y en el navegador
    if (frase == undefined){
        console.log("Frase sin definir");
        res.send("Frase sin definir");
    } else { //Si la frase está difnida hacemos lo siguiente:
        console.log("Frase:" + frase);//Debug para ver la frase que estamos recibiendo
        /*Llamamos a la función enviarFrase del módulo NodeWit que nosotros creamos
        Esta función tiene un callback que nos retorna la intención encontrada y la respuesta del bot*/
        NodeWit.enviarFrase(frase, function (err) { //A la función le enviamos la frase y la función anónima
            //Si existe error lo mostramos en la consola
            if (err){
                console.log(err);
            }else { //Si no existe error hacemos lo siguiente:
                //Debug para ver la intención encontrada y la respuesta del bot
                console.log("Intencion: " + mejorIntencion);
                console.log("Respuesta: " + respuesta);
                /*Variable que le pasaremos a la vista. 
                mejorIntencion y respuesta son los valores que nos retorna el callback de la función
                enviarFrase*/
                var datos = {       
                    Intencion: mejorIntencion,
                    Respuesta: respuesta
                };
                //Mostramos la vista y le enviamos la variable datos
                res.render('index.ejs', datos);
            }
        });
        
    }
});

//Rutas del GET y POST utilizando ajax y JQuery
//Get para mostrar el index con el que haremos el POST usando ajax, no el formulario
app.get('/jq', function(req, res){
    //Simplemente mostramos la vista
    res.render('index2.html');
});

//POST utilizando ajax, no el formulario
app.post('/jq', function(req, res){
    /*Obtenemos la frase que viene en la petición, en este caso, el JSON que enviamos en el cliente
    con el script postjq.js por esta razón también usamos bodyParser.json()*/
    var frase = req.body.Frase
    /*El proceso es el mismo que seguimos cuando hacemos el POST usando el formulario, salvo una excepción
    que se detalla más adelante*/
    if (frase == undefined){
        console.log("Frase no definida")
    } else {
        console.log("Frase: " + frase)
        NodeWit.enviarFrase(frase, function(err){
            if (err){
                console.log(err);
            } else {
                console.log("Intención: " + mejorIntencion)
                console.log("Respuesta: " + respuesta)
                var datos = {
                    Intencion: mejorIntencion,
                    Respuesta: respuesta
                }
                /*Única diferencia con el proceso usado cuando hacemos POST con el formulario.
                En lugar de mostrar una vista como respuesta, enviamos un JSON con la variable datos, 
                que contiene la intención encontrada y la respuesta del bot.
                Esto es mejor ya que definimos un recurso que luego puede ser consumido por otra aplicación
                o método, al mostrar una vista, la respuesta queda muy estricta ya que no podrá ser consumida
                por otra aplicación o recurso.
                Esta funcionalidad se puede probar utilizando POSTMAN*/
                res.json(datos);
            }
        })
    }
});


//Rutas del GET y POST utilizando Vue y axios
//Get para mostrar el index con el que haremos el POST usando vue, no el formulario,ni JQuery
app.get('/vue', function(req, res){
    //Simplemente mostramos la vista
    res.render('index3.html');
});

//POST utilizando ajax, no el formulario
app.post('/vue', function(req, res){
    console.log("Vue");
    /*Obtenemos la frase que viene en la petición, en este caso, el JSON que enviamos en el cliente
    con el script postjq.js por esta razón también usamos bodyParser.json()*/
    var frase = req.body.frase
    /*El proceso es el mismo que seguimos cuando hacemos el POST usando el formulario, salvo una excepción
    que se detalla más adelante*/
    if (frase == undefined){
        console.log("Frase no definida")
    } else {
        console.log("Frase: " + frase)
        NodeWit.enviarFrase(frase, function(err){
            if (err){
                console.log(err);
            } else {
                console.log("Intención: " + mejorIntencion)
                console.log("Respuesta: " + respuesta)
                var datos = {
                    Intencion: mejorIntencion,
                    Respuesta: respuesta
                }
                /*Única diferencia con el proceso usado cuando hacemos POST con el formulario.
                En lugar de mostrar una vista como respuesta, enviamos un JSON con la variable datos, 
                que contiene la intención encontrada y la respuesta del bot.
                Esto es mejor ya que definimos un recurso que luego puede ser consumido por otra aplicación
                o método, al mostrar una vista, la respuesta queda muy estricta ya que no podrá ser consumida
                por otra aplicación o recurso.
                Esta funcionalidad se puede probar utilizando POSTMAN*/
                res.json(datos);
            }
        })
    }
});

//Ejecutamos el servidor
app.listen(process.env.PORT || 8080, function(){
    console.log("Servidor corriendo en http://localhost:8080");
});

