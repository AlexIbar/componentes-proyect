class EntradaCheck extends HTMLElement{
    constructor(){
        super()
        this.identificador =''
        this.root = this.attachShadow({mode:'closed'})
    }
    connectedCallback(){
        this.root.innerHTML=entradaCheck(this)
    }
    attributeChangedCallback(name, beforeValue, newValue){
        if(name == 'identificador'){
            this.identificador = newValue
        }
    }
    get valor(){
        let a = this.root.querySelector('input').checked
        if (a == true){
            return true
        }else{
            return false
        }
    }
    static get observedAttributes(){
        return ['identificador']
    }
}
window.customElements.define('entrada-check', EntradaCheck)