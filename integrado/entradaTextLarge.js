function entradaTextLarge(){ return `<div class="entrada-parrafo-principal"><div class="entrada-parrafo" contenteditable="true"></div>${label}</div><style>.entrada-parrafo-principal{position: relative;margin-top: 20px;}.entrada-parrafo-principal label{position: absolute;bottom: 10px;}.entrada-parrafo{border-bottom: 1px solid black;background-color:transparent;outline: none;max-height:200px;overflow-y: scroll;overflow-x: none;min-height: 1.7rem;font-family: Arial, Helvetica, sans-serif !important;text-decoration: none !important;font-size: 16px !important;color: black;}.entrada-parrafo:focus~label{font-size: 12px;top: -14px;color: #49ab00;}.datos-correctos{font-size: 12px;top: -14px;}.entrada-parrafo::-webkit-scrollbar{width: 10px;/* background-color: #49ab00; */border-radius: 10px;} .entrada-parrafo::-webkit-scrollbar-thumb {  background-color: #49ab00;   height:50px;  border-radius: 10px;}.entrada-parrafo:focus{border-bottom:1px solid #49ab00;}</style>`} 
let label = ''
class EntradaParrafo extends HTMLElement{
    constructor(){
        super()
    }
    iniciar(){
            this.root = this.attachShadow({mode:'open'})
            this.root.innerHTML = entradaTextLarge()
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
            label = '<label>'+newValue+'</label>'
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