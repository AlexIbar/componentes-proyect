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