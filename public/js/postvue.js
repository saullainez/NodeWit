var app = new Vue({
    el: '#formulario',
    data:{
        visible: false,
        frase: '',
        errores: [],
        intencion: '',
        respuesta: '',
    },
    methods: {
        enviarFrase: function(){
            var url = '/vue';
            axios.post(url, {
                frase: this.frase
            }).then(response => {
                this.visible = true;
                this.frase = '';
                this.errores = [];
                intencion = response.data.intencion;
                this.respuesta = response.data.Respuesta;
            }).catch(error => {
                this.errores = error.response.data
            });
        }
    }
})