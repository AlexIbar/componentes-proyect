let titulo = null,
subtitulo = null,
descripcion = null,
foto = null

class VentanaInit extends HTMLElement {
    constructor(){
        super()
    }
    agregarCambio(){
        let root = this.attachShadow({mode:'closed'})
        root.innerHTML = ventana()
    }
    attributeChangedCallback(nombre, valorAnterior, nuevoValor){
        if(nombre == 'datos'){
            let a = JSON.parse(nuevoValor)
            descripcion = a.descripcion
            foto = a.foto_producto,
            titulo = a.nombre_producto
            subtitulo = a.cliente_producto
            this.agregarCambio()
        }
    }
    static get observedAttributes(){
        return ['datos']
    }
}
window.customElements.define('ventana-init', VentanaInit)