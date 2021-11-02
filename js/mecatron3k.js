/**
 * @author Jose Angel Fernandez Betancourt
 * @license GPL V3
 */
"use strict";

class Juego {
  constructor() {
    this.vista = new Vista();
    this.modelo = new Modelo();
    this.generadorPalabras = null;
    this.animador = null;
    this.divPrincipal = null;
    window.onload = this.iniciar.bind(this);
  }
  iniciar() {
    console.log("iniciando");
    this.divPrincipal = document.getElementById("divPrincipal");
    this.generadorPalabras = window.setInterval(
      this.generarPalabra.bind(this),
      1000
    );
    this.animador = window.setInterval(
      this.vista.moverPalabras.bind(this.vista),
      100
    );
    this.vista.div = this.divPrincipal;
    window.onkeypress = this.pulsar.bind(this);
  }
  generarPalabra() {
    let nuevaPalabra = this.modelo.crearPalabra();
    this.vista.dibujar(nuevaPalabra);
  }
  pulsar(evento) {
    let letraPulsada = evento.key;
    console.log(`Has pulsado la letra ${letraPulsada}`);
    let palabras = this.divPrincipal.querySelectorAll(".palabra");
    let puntuacion = 0;
    for (let palabra of palabras) {
        let span = palabra.children.item(0);
        let nodoTexto = palabra.childNodes[1];
        let textoRestante = nodoTexto.nodeValue;
        let primeraLetraTextoRestante = textoRestante.charAt(0);
        let suma = 0

        if (letraPulsada == primeraLetraTextoRestante) {
            span.textContent += letraPulsada;
            nodoTexto.nodeValue = textoRestante.substring(1)
            if (nodoTexto.nodeValue.length == 0) {
            palabra.remove()
            this.modelo.sumarPunto()
            }
      }
    }
  }
}

class Vista {
  constructor() {
    this.div = null;
  }
  //Dibuja el área del juego
  dibujar(nuevaPalabra) {
    let div = document.createElement("div");
    this.div.appendChild(div);

    let span = document.createElement("span");
    div.appendChild(span);

    div.appendChild(document.createTextNode(nuevaPalabra));
    div.classList.add("palabra");
    div.style.top = "0px";
    div.style.left = Math.floor(Math.random() * 85) + "%";
  }
  moverPalabras() {
    let palabras = this.div.querySelectorAll(".palabra");
    //Para cada palabra, aumento su atributo top
    for (let palabra of palabras) {
      let top = parseInt(palabra.style.top);
      top += 3;
      palabra.style.top = `${top}px`;

      if (top > 470){
          palabra.remove()
      }
    }
  }
}
class Modelo {
  constructor() {
    this.palabras = ["En", "un", "lugar", "de", "la", "Mancha"];
  }
  crearPalabra() {
    return this.palabras[Math.floor(Math.random() * this.palabras.length)];
  }
}

var app = new Juego();
