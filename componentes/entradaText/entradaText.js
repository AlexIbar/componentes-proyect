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