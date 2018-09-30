//Para iniciar un servidor en Express
var express = require('express'); //Llamamos a la librería Express (Importar)
var app = express(); //Ejecutamos la librería Express (Instanciar)
//Es necesario instalar Express por npm, con el comando: npm install express --save (el --save es para que lo escriba en el package.json)
var server = require('http').Server(app);//Creamos el servidor http y le pasamos la aplicación Express creada (app)
var bodyParser = require('body-parser');
var NodeWit = require('./NodeWit.js');

//Usamos el framework "static" para usar ficheros estáticos (ejemplo imágenes, css, etc.) en nuestro proyecto
app.use(express.static('public'));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.set('views', __dirname + '/public/vistas');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//El servidor muestra el index.html cuando se ingresa a la raíz del sitio
app.get('/', function(req, res){
    var datos = {
        Intencion: "",
        Respuesta: ""
    };
    res.render('index.ejs', datos);
});
app.get('/jq', function(req, res){
    res.render('index2.html');
});

app.post('/jq', function(req, res){
    var frase = req.body.Frase
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
                res.json(datos);
            }
        })
    }
});

app.post('/', function (req, res) {
    var frase = req.body.Frase
    if (frase == undefined){
        console.log("Frase sin definir");
        res.send("Frase indefinida");
    } else {
        console.log("Frase:" + frase);
        NodeWit.enviarFrase(frase, function (err) {
            if (err){
                console.log(err);
            }else {
                console.log("Intencion: " + mejorIntencion);
                console.log("Respuesta: " + respuesta);
                var datos = {       
                    Intencion: mejorIntencion,
                    Respuesta: respuesta
                };
                res.render('index.ejs', datos);
                console.log(datos);
            }
        });
        
    }
    


});

//Ejecutamos el servidor
server.listen(8080, function(){
    console.log("Servidor corriendo en http://localhost:8080");
});

