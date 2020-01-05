function ventana(){ return'<section class="ventana"><article class="inicial-img"><img class="producto"src="'+foto+'" alt=""><div class="titulo-ge"><div class="titulo">'+titulo+'</div><!--Slot para dar la funcionalidad--><slot name="icon-plus"></slot></div></article><article class="contenido-dos"><div class="subtitulo">'+subtitulo+'</div><div class="descripccion">'+descripcion+'</div></article></section><style>* {margin: 0px;padding: 0px;}.ventana {width: 300px;height: 350px;border-radius: 10px;-webkit-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);-moz-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);}.producto {width: 300px;height: 180px;object-fit: cover;object-position: top left;border-top-right-radius: 10px;border-top-left-radius: 10px;}.inicial-img {position: relative;}.titulo {font-weight: bold;text-transform: uppercase;bottom: 0px;padding-left: 10px;font-size: 20px;box-sizing: content-box;}.titulo-ge {position: absolute;top: 150px;display: grid;grid-template-columns: 1fr 60px;width: 100%;}.contenido-dos{margin: 10px 15px 0px 15px;text-align: justify;height: 135px;overflow: hidden;}.subtitulo{font-size: 12px;margin-bottom: 10px;}</style>'} 
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