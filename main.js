let process = require('process'),
    path = require('path'),
    fs = require('fs')
var javascript = null,
    html = null,
    archivos;
a = process.argv[2].split(':')
//console.log(a)
//console.log(path.join(__dirname, a[0]))
setInterval(()=>{
    fs.readdir(path.join(__dirname, a[0]), (err, data) => {
        data.forEach(element => {
            if (element.search('.html') !== -1) {
                fs.readFile(path.join(__dirname, a[0], element), 'utf-8', (err, successful) => {
                    if (err) {
                        console.log(err)
                    } else {
                        html = successful.split('\n').join('').split('    ').join('')
                        if (javascript !== null) {
                            crearArchivo()
                        }
                    }
                })
            }
            if (element.search('.js') !== -1) {
                fs.readFile(path.join(__dirname, a[0], element), 'utf-8', (err, successful) => {
                    if (err) {
                        console.log(err)
                    } else {
                        archivos = element
                        javascript = successful
                        if (html !== null) {
                            crearArchivo()
                        }
                    }
                })
            }
        })
    })
},2000)

function crearArchivo() {
    var newArchivo;
    fs.readFile(path.join(__dirname, a[1],archivos), 'utf-8', (err, data)=>{
        newArchivo = "function "+archivos.split('.')[0]+"(){ return'"+html+"'} \n"+javascript
        if(data !== newArchivo){
            fs.writeFile(path.join(__dirname, a[1], archivos), newArchivo, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('creado')
                }
            })
        }
    })
}