var app = new Vue({
    el: '#formulario',
    data:{
        visible: false,
        verror: false,
        frase: '',
        errores: [],
        error: '',
        intencion: '',
        respuesta: '',
    },
    methods: {
        enviarFrase: function(){
            if(this.frase){
                var url = '/vue';
                axios.post(url, {
                    frase: this.frase
                }).then(response => {
                    this.visible = true;
                    this.verror = false;
                    this.frase = '';
                    this.errores = [];
                    intencion = response.data.intencion;
                    this.respuesta = response.data.Respuesta;
                }).catch(error => {
                    this.errores = error.response.data
                });           
            }else {
                this.error = "No seas como el maestro, escribí algo para enviar al Bot";    
                this.visible = false;
                this.verror = true; 
            }
            
        }
    }
})