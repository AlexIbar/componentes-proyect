function entradaText(){ return `<div class="entrada"><input type="${tipo}" ${holder !== "" ? holder : ""} required id="${forId}">${label}</div><style>.entrada input{width: 100%;background-color: transparent;border: none;outline: none;border-bottom:1px solid black;font-size: 16px;height: 2rem;font-family: Arial, Helvetica, sans-serif;}.entrada input:focus{border-bottom:1px solid #49ab00}.entrada input:focus~label{font-size: 12px;bottom: 28px;color: #49ab00;}.entrada input:valid~label{font-size: 12px;bottom: 28px;}.error-label{color:#F44336}.error-input{border-bottom: 1px solid #F44336 !important}.entrada{position: relative;}.entrada label{font-size: 18px;position: absolute;left: 2px;bottom: 7px;user-select: none;}</style>`} 
var tipo = 'text',
label = '',
forId = '',
holder = ''

class Entrada extends HTMLElement{
    constructor(){
        super()
        this.iniciar()
    }
    attributeChangedCallback(name, beforeValue, newValue){
        console.log(newValue)
        if(name == 'tipo'){
            tipo = newValue
        }
        if(name == 'label'){
            let identificador = newValue
            forId = newValue.split(' ').join('')
            label = `<label for="${forId}">${identificador}</label>`
            holder=''
        }
        if(name == 'placeholder'){
            holder = "placeholder='"+newValue+"'"
            label=''
        }
    }
    connectedCallback(){
        this.root.innerHTML = entradaText()
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