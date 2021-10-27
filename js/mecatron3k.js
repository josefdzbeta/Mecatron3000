
/**
 * @author Jose Angel Fernandez Betancourt
 * @license GPL V3
 */
'use strict'

class Juego{
    constructor(){
        this.vista = new Vista()
        this.modelo = new Modelo()
        this.generadorPalabras = null
        this.animador = null
        this.divPrincipal=null
        window.onload = this.iniciar.bind(this)
    }
    iniciar(){
        console.log('iniciando')
        this.divPrincipal = document.getElementById('divPrincipal')
        this.generadorPalabras = window.setInterval(this.generarPalabra.bind(this),1000)
        this.animador = window.setInterval(this.vista.moverPalabras.bind(this.vista),100)
        this.vista.div = this.divPrincipal
    }
    generarPalabra(){
        let nuevaPalabra = this.modelo.crearPalabra()
        this.vista.dibujar(nuevaPalabra)
    }


}

class Vista{
    constructor(){

        this.div=null
    }
    //Dibuja el área del juego
    dibujar(nuevaPalabra){
        let div = document.createElement('div')
        this.div.appendChild(div)
        div.appendChild(document.createTextNode(nuevaPalabra))
        div.classList.add('palabra')
        div.style.top = '0px'
        div.style.left = Math.floor(Math.random()*85)+'%'
    }
    moverPalabras(){
        let palabras = this.div.querySelectorAll('.palabra')
        //Para cada palabra, aumento su atributo top
        for(let palabra of palabras){
            let top = parseInt(palabra.style.top)
            top+=5
            palabra.style.top= `${top}px`
        }
    }
}
class Modelo{
    constructor(){
        this.palabras = ['En', 'un', 'lugar', 'de', 'la', 'Mancha']
    }
    crearPalabra(){
        return this.palabras [Math.floor(Math.random()*this.palabras.length)]
    }
}

var app = new Juego()