$(document).ready(function(){
    //alert("Hola");
    $(".formulario").submit(function(event){
        event.preventDefault();
        ajaxPost();
    });

    function ajaxPost(){
        var formData = {
            Frase : $(".Frase").val()
        }
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