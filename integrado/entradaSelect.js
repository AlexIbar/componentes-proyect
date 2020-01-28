function entradaSelect(e){ return `<div class="btn-select"><div id="indentificado">${e.label}</div><svg width="16" height="10" id="indentificado"><path d="M0 0 L8 7 L16 0" fill="black" stroke="black" stroke-width="3" /></svg><div id="flotante"></div><style>.flotante {box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);padding: 5px;}.notSelect{color: #C0BFBF;}#flotante {position: absolute;background-color: white;left: 0px;width: 100%;box-sizing: border-box;}.flotante div {padding: 5px 0px 5px 5px;border-bottom: 1px solid #C0BFBF;}.flotante div:hover {background-color: rgba(231, 231, 231, 0.801);}.btn-select {display: grid;grid-template-columns: 1fr 20px;font-size: 18px;border-bottom: 1px solid;padding: 5px;box-sizing: border-box;cursor: pointer;position: reltive;width: 100%;user-select: none;}.btn-select>*:nth-child(2) {align-self: center}</style></div>`} 
class EntradaSelect extends HTMLElement{
    constructor(){
        super()
        this.root = this.attachShadow({mode:'closed'})
        this.activo = false
        this.label = 'Ingresar nombre'
        this.lista ='<div class="flotante">'
        this.valor = ''
    }
    connectedCallback(){
        this.root.innerHTML = entradaSelect(this)
        this.root.querySelectorAll('#indentificado')[0].addEventListener('click', ()=>{
            this.listar()
        })
        this.root.querySelectorAll('#indentificado')[1].addEventListener('click', () => {
            this.listar()
        })
    }
    listar(){
        this.lista += '</div>'
        this.root.querySelector('#flotante').innerHTML=this.lista
        //console.log(this.root.querySelector('#flotante'))
        this.pendiente()
        this.root.querySelector('#quitar').addEventListener('click', ()=>{
            this.ocultar()
        })
    }
    pendiente(){
        let a = this.root.querySelector('.flotante').childNodes
        a.forEach((item)=>{
            if(item.classList[0] !== 'notSelect'){
                item.addEventListener('click', (e)=>{
                    this.agregar(item.getAttribute('id'), item.textContent)
                })
            }
        })
    }
    ocultar(){
        this.root.querySelector('#flotante').innerHTML = ''
    }
    agregar(id, nombre){
        this.valor = id
        this.ocultar()
        this.root.querySelector('#indentificado').innerHTML = nombre
    }
    attributeChangedCallback(name, beforeValue, newValue){
        if(name == 'label'){
            this.label =  newValue
        }
        if(name == 'listaselect'){
            let a = JSON.parse(newValue)
            this.lista += '<div class="notSelect" id="quitar">'+this.label+'</div>'
            a.forEach((item) =>{
                this.lista += '<div id="'+item.identificador+'">'+item.nombre+'</div>'
            })
        }

    }
    static get observedAttributes(){
        return ['listaselect', 'label']
    }
}
window.customElements.define('entrada-select', EntradaSelect)