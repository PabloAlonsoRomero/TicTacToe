import { Component } from '@angular/core';
import { IScore, StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  score!: IScore;
  estadoJuego!: 'jugando' | 'empate' | 'ganador'
  tablero = [0,0,0,
             0,0,0,
             0,0,0];
  jugador!: number; // 1 -> X, 2 -> O
  jugadorGanador!: number;
  mostrarscore: boolean = false;

  constructor(
    private storageService: StorageService
  ){
    this.score = this.storageService.obtenerScore() as IScore;
    console.log("Se ejecuto en automatico")
    this.nuevoJuego();
  }

  cambiarEstadoScore(){
    this.mostrarscore =!this.mostrarscore;
  }

  nuevoJuego(){
  this.jugador = 1
  this.jugadorGanador;
  this.estadoJuego = 'jugando'
  this.tablero = [0,0,0,0,0,0,0,0,0];
  }

  mostrarMensaje(){
    this.storageService.saludar();
  }

  seleccionarCelda(indice: number){    
    // Comprobar si la celda esta ocupada
    if (this.tablero[indice] !== 0){
      return;
    }
    // console.log("Le di click a la celda: ", indice)
    // console.log("El jugador actual es:", this.jugador)
    // console.log(this.tablero)
    this.tablero[indice] = this.jugador;
    this.jugador = this.jugador === 1 ? 2 : 1
    // console.log("El tablero cambio a", this.tablero)
    this.comprobarReglas();
  }

  comprobarReglas(){
    this.comprobarFilas();
    this.comprobarColumnas();
    this.comprobarDiagonales();
    this.comprobarEmpate();
  }

  comprobarFilas(){
    for(let i = 0; i < 9; i+=3) {
      if(
        this.tablero[i] !== 0 &&
        this.tablero[i] === this.tablero[i+1] &&
        this.tablero[i+1] === this.tablero[i+2] 
      ){
        this.definirganador(this.tablero[i]);
      }
    }
  }

  comprobarColumnas(){
    for (let i = 0; i < 3; i++){
      console.log("Iteración fila: ", i)
      if(
        this.tablero[i] !== 0 &&
        this.tablero[i] === this.tablero[i+3] &&
        this.tablero[i+3] === this.tablero[i+6] 
      ){
        this.definirganador(this.tablero[i]);
      }
    }
  }

  comprobarDiagonales(){
    if(
      (this.tablero[0] !== 0 &&
        this.tablero[0] === this.tablero[4] &&
        this.tablero[4] === this.tablero[8]
        )
    ){
      this.definirganador(this.tablero[0]);
    }
    if(
      (this.tablero[2] !== 0 &&
        this.tablero[2] === this.tablero[4] &&
        this.tablero[4] === this.tablero[6])
    ){
      this.definirganador(this.tablero[2]);
    }
  }

  comprobarEmpate(){
    // IndexOf --> Busca un elemento en el arreglo
    // Si lo encuentra, devuelve el indice,
    // Si no lo encuentra, devuelve -1
    if (this.tablero.indexOf(0) === -1) {
      this.definirEmpate();
    }
  }

  definirganador(player: number){
    this.estadoJuego = 'ganador';
    this.jugadorGanador = player;
    this.storageService.guardarGanador(player);
    this.score = this.storageService.obtenerScore() as IScore;
    alert(`El jugador ${player} ha ganado`);
  }

  definirEmpate(){
    this.estadoJuego = 'empate';
    alert(`Ninguno ganó. Es un empate`)
  }
}
