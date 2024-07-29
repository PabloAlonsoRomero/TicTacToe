import { Component, Input } from "@angular/core";
import { IScore } from "../services/storage.service";

@Component({
    selector: "score",
    template: `
    
    <div class="score-container">
        <h2>Score</h2>
        <p class="player1"><em>Jugador 1:</em> {{ score?.jugador1 }}</p>
        <p class="player2"><em>Jugador 2:</em> {{ score?.jugador2 }} </p>
    </div>
    
    
    
    `,
    styles: [
        `
        .score-container{
            border-radius: 10px;
            border: 1px solid gray;
            padding: 10px;
            margin-bottom: 20px;
            min-width: 350px;
        }

        em{
            font-size: 25px;
            font-weight: bold;
        }

        p{
            font-size: 25px;
        }

        .player1 {
            color: rgb(255,127,80);
        }

        .player2 {
            color: rgb(0,128,0);
        }
        
        `
    ]
})
export class ScoreComponent {

    @Input() score!: IScore;

}