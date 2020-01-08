class VentanaInit extends HTMLElement {
    constructor(){
        super()
        this.titulo = null
        this.subtitulo = null
        this.descripcion = null
        this.foto = null
    }
    agregarCambio(){
        let root = this.attachShadow({mode:'closed'})
        root.innerHTML = ventana(this)
    }
    attributeChangedCallback(nombre, valorAnterior, nuevoValor){
        if(nombre == 'datos'){
            let a = JSON.parse(nuevoValor)
            this.descripcion = a.descripcion
            this.foto = a.foto_producto,
            this.titulo = a.nombre_producto
            this.subtitulo = a.cliente_producto
            this.agregarCambio()
        }
    }
    static get observedAttributes(){
        return ['datos']
    }
}
window.customElements.define('ventana-init', VentanaInit)