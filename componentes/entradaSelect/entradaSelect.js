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
            console.log(newValue)
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