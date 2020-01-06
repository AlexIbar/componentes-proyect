class Entrada extends HTMLElement{
    constructor(){
        super()
        this.iniciar()
    }
    iniciar(){
        let root = this.attachShadow({mode:'open'})
        root.innerHTML = entradaText()
    }
}
window.customElements.define('entrada-text', Entrada)