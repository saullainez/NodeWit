var app = new Vue({
    el: '#formulario',
    data:{
        visible: false,
        verror: false,
        agregarFrase: false,
        habFrase: true,
        frase: '',
        errores: [],
        error: '',
        intencion: '',
        respuesta: '',
        intenciones: [],
        seleccionado: '',
        msgIntencion: '',
        response: '',
    },
    methods: {
        enviarFrase: function(){
            if(this.frase){
                var url = '/vue';
                axios.post(url, {
                    frase: this.frase
                }).then(response => {
                    this.verror = false;
                    this.agregarFrase = false;
                    this.errores = [];
                    this.intencion = response.data.Intencion;
                    if (this.intencion){
                        this.visible = true;
                        this.respuesta = response.data.Respuesta;
                    }else {
                        this.error = "Intención no identificada";
                        this.visible = false;
                        this.verror = true;
                        this.agregarFrase = true;
                        this.habFrase = false;
                        this.seleccionado = "";
                        this.response = "";
                        this.obtenerIntenciones();
                        /*if(this.seleccionado){
                            this.msgIntencion = "Intención seleccionada" + seleccionado;
                        } else {
                            this.msgIntencion = "Seleccione una intención";
                        }*/
                    }

                    //this.frase = '';

                }).catch(error => {
                    this.errores = error.response.data
                });           
            }else {
                this.error = "No seas como el maestro, escribí algo para enviar al Bot";    
                this.visible = false;
                this.verror = true; 
                this.agregarFrase = false;
            }
            
        },
        habilitar: function(){
            this.habFrase = true;
            this.agregarFrase = false;
            this.verror = false;
            this.frase = "";
        },
        obtenerIntenciones: function(){
            this.intenciones = [];
            var url = 'https://api.wit.ai/entities/intent?v=20181011';
            axios.get(url, {
                'headers': {'Authorization': 'Bearer ZBWEIXAHRV7QFSNZCZWL2GTY6DME7CLF'}
            }).then(response =>{
                for (var i = 0; i < response.data.values.length; i++){
                    this.intenciones.push(response.data.values[i].value); 
                    //this.pre = response.data.values[i].value;
                }
                //this.pre = response.data.values[1].value;
            }).catch(error => {
                this.errores = error.response.data
            });   
        },
        anadirIntencion: function(){
            var url = 'https://api.wit.ai/samples?v=20181011';
            var body = [{
                text: this.frase,
                entities: [
                  {
                    entity: "intent",
                    value: this.seleccionado
                  }
                ]
            }]
            var config = {
                headers: {
                    'Authorization': 'Bearer ZBWEIXAHRV7QFSNZCZWL2GTY6DME7CLF',
                    'Content-Type': 'application/json'
                }
            }
            axios.post(url, body, config
            ).then(response =>{
                this.response = response.data;
                //this.response = response.data.error;
                //console.log(response.data.sent);
            }).catch(error => {
                this.errores = error.response.data
            }); 
            
        }

    }

})