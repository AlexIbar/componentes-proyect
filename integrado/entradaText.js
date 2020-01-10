function entradaText(e){ return `<div class="entrada"><input type="${e.tipo}" ${e.holder !== "" ? e.holder : ""} required id="${e.forId}">${e.label}</div><style>.entrada input{width: 100%;background-color: transparent;border: none;outline: none;border-bottom:1px solid black;font-size: 16px;height: 2rem;font-family: Arial, Helvetica, sans-serif;}.entrada input:focus{border-bottom:1px solid #49ab00}.entrada input:focus~label{font-size: 12px;bottom: 28px;color: #49ab00;}.entrada input:valid~label{font-size: 12px;bottom: 28px;}.error-label{color:#F44336}.error-input{border-bottom: 1px solid #F44336 !important}.entrada{position: relative;margin-top: 15px;}.entrada label{font-size: 16px;position: absolute;left: 2px;bottom: 7px;user-select: none;}</style>`} 
class Entrada extends HTMLElement{
    constructor(){
        super()
        this.tipo = 'text'
        this.label = ''
        this.forId = ''
        this.holder = '';
        this.iniciar()
    }
    attributeChangedCallback(name, beforeValue, newValue){
        if(name == 'tipo'){
            this.tipo = newValue
        }
        if(name == 'label'){
            let identificador = newValue
            this.forId = newValue.split(' ').join('')
            this.label = `<label for="${this.forId}">${identificador}</label>`
            this.holder=''
        }
        if(name == 'placeholder'){
            this.holder = "placeholder='"+newValue+"'"
            this.label=''
        }
    }
    connectedCallback(){
        this.root.innerHTML = entradaText(this)
        this.root.querySelector('input').addEventListener('blur', ()=>{
            this.verificar()
        })
    }
    verificar(){
        let entradaDom = this.root.querySelector('input');
        this.valor = entradaDom.value
        if(this.valor !== ""){
            entradaDom.classList.remove('error-input')
            this.root.querySelector('label').classList.remove('error-label')
        }else{
            entradaDom.classList.add('error-input')
            this.root.querySelector('label').classList.add('error-label')
        }

    }
    iniciar(){
        this.root = this.attachShadow({mode:'closed'})
    }
    static get observedAttributes(){
        return ['tipo', 'label', 'placeholder']
    }
}
window.customElements.define('entrada-text', Entrada)