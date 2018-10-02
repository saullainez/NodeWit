//Esperamos a que cargue todo el DOM
$(document).ready(function(){
    /*Capturamos el evento submit que genera el formulario, cuando el usuario presiona el botón de enviar.
    En vez de que el submit envía la información al POST, nosotros ejecutamos la función ajaxPost.*/
    $(".formulario").submit(function(event){
        /*Esto lo hacemos para que el formulario no realice su acción por defecto, cuando el usuario
        presione el botón de enviar*/
        event.preventDefault();
        ajaxPost();//En lugar de la acción por defecto (enviar los datos), se ejecuta esta función
    });

    function ajaxPost(){
        //Obtenemos la frase que está en el HTML
        var formData = {
            Frase : $(".Frase").val()
        }
        //Ejecutamos la petición ajax
        $.ajax({
            type: "POST", 
            contentType : "application/json",
            url : "/jq",
            data : JSON.stringify(formData),
            dataType : 'json',
            success : function(resp){
                $("#intencion").html("<span>" + "Intención identificada: " + "<span style='color: goldenrod;'>"+ resp.Intencion + "</span></span>")
                $("#respuesta").html("<span>" + "Respuesta del bot: " + "<span style='color: green;'>"+ resp.Respuesta + "</span></span>")
            },
            error : function(e) {
                //alert("¡Error!");    
                console.log("ERROR: ", e);
            }
        });
    }


})