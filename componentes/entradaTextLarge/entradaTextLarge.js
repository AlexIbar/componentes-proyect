class EntradaParrafo extends HTMLElement{
    constructor(){
        super()
        this.label
    }
    iniciar(){
            this.root = this.attachShadow({mode:'open'})
            this.root.innerHTML = entradaTextLarge(this)
            this.verificarLabel()
            this.root.querySelector('.entrada-parrafo').addEventListener('blur', ()=>{
                this.verificarDatos()
            })
    }
    verificarDatos(){
        this.valor = this.root.querySelector('.entrada-parrafo').textContent
        if(this.valor !== ""){
            this.root.querySelector('label').classList.add('datos-correctos')
        }else{
            this.root.querySelector('label').classList.remove('datos-correctos')
        }
    }
    verificarLabel(){
        this.root.querySelector('label').addEventListener('click', () => {
            this.root.querySelector('.entrada-parrafo').focus()
        })
    }
    attributeChangedCallback(nombre, beforeValue, newValue){
        if(nombre == 'label'){
            this.label = '<label>'+newValue+'</label>'
        }
    }
    connectedCallback(){
        this.iniciar()
    }
    static get observedAttributes(){
        return ['label']
    }
}
window.customElements.define('entrada-parrafo', EntradaParrafo)