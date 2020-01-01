let process = require('process'),
    path = require('path'),
    fs = require('fs')
var javascript = null,
    html = null,
    archivos;
a = process.argv[2].split(':')
//console.log(a)
//console.log(path.join(__dirname, a[0]))
fs.readdir(path.join(__dirname, a[0]), (err, data) => {
    data.forEach(element => {
        if (element.search('.html') !== -1) {
            fs.readFile(path.join(__dirname, a[0], element), 'utf-8', (err, successful) => {
                if (err) {
                    console.log(err)
                } else {
                    html = successful
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
function crearArchivo() {
    fs.writeFile(path.join(__dirname, a[1], archivos), `let ${archivos.split('.')[0]} = '${html}'` + '\n' + javascript, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('creado')
        }
    })
}