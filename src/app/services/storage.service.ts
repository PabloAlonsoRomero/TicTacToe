import { Injectable } from "@angular/core";

export interface IScore {
    jugador1: number; // Las veces que gano el jugador X
    jugador2: number; // Las veces que gano el jugador O
}

@Injectable({
    providedIn: "root"
})
export class StorageService{

    // Nombre de la clave que voy a guardar en localStorage
    claveScore = 'score';

    constructor(){
        console.log('Se creo el servicio en automatico');
        this.inicializarScore();
    }

    guardarGanador(player: number) {
        let score = this.obtenerScore();
        if (score !== null){
            if (player === 1){ 
                score.jugador1++;
            }
            if (player === 2){
                score.jugador2++;
            }
            localStorage.setItem(this.claveScore, JSON.stringify(score))
        }
    }

    obtenerScore(): IScore | null{
        const scoreString = localStorage.getItem(this.claveScore);
        if (scoreString !== null){
            // Aqui va a entrar solo si la clave "score" EXISTE
            return JSON.parse(scoreString)
        }
        return null;
    }

    inicializarScore(){
        if (localStorage.getItem(this.claveScore) === null) {
            // Aqui va a entrar solo SI NO existe la clave "score"
            // Voy a crear un objeto con los valores iniciales
            let scoreinicial:IScore = {
                jugador1: 0,
                jugador2: 0
            };
            localStorage.setItem(this.claveScore, JSON.stringify(scoreinicial));
        }
    }

    saludar() {
        alert("Hola desde un servicio de Angular");
        // Set Item ocupa dos parametros
        // El primero es una clave o key (String)
        // La segunda parte, es el valor que se va a guardar (string | numbers | any*)
        let objeto = {
            propiedad1: "un valor",
            propiedad2: 283,
            propiedad3: false,
            propiedad4: {}
        }
        // Convierte un objeto a string
        let objetoString = JSON.stringify(objeto); 
        localStorage.setItem('clave','valor');
        localStorage.setItem('número','100');
        localStorage.setItem('objeto',objetoString);
    }

}