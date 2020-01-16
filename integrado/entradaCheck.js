function entradaCheck(e){ return `<div><input type="checkbox" name="" id="${e.identificador}"><label for="${e.identificador}">${e.identificador}</label><style>input[type="checkbox"] {display: none;}input[type="checkbox"]~label::before {content: "✓";display: block;width: 14px;height: 14px;border: 2px solid rgb(83, 83, 83);margin-right: 10px;color: white;border-radius: 2px;}label {user-select: none;padding-bottom: 5px;display: flex;align-items: center;font-size: 16px;color: rgb(83, 83, 83);cursor: pointer;margin-top: 5px;margin-bottom: 5px;}input[type="checkbox"]:checked~label {color: #49ab00;}input[type="checkbox"]:checked~label::before {border: 2px solid #49ab00;color: #49ab00;font-size: 20px;display: flex;justify-content: center;align-items: center;}</style></div>`} 
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