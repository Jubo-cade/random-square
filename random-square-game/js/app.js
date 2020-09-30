"use strict";

class Cube {
    constructor(rect, ground, countdown, startButton, time, score) {
        this.rect = rect;
        this.ground = ground;
        this.countdown = countdown;
        this.startButton = startButton;
        this.time = time;
        this.score = score;
    }

    bgColors = ["orangered","rgb(121, 255, 77)", "rgb(230, 0, 0)", "rgb(255, 128, 255)"];
    squareColors = ["rgb(218, 0, 0)", "rgb(179, 0, 134)", "rgb(255, 255, 0)", "rgb(0, 230, 230)"];


    gameEngine() {
           this.startAndStopGame();
           let index = 0;
           this.rect.addEventListener("click", () => {
           this.time += 2;
           this.countdown.innerHTML = 'Timer:' + ' ' + this.time;
           this.score++;
           document.querySelector("#score").innerHTML = 'Score:' + ' ' + this.score;           
           if(this.score % 5 == 0) {
               index++;
               if(index > 3) index = 0;
               console.log(index);
               this.ground.style.backgroundColor = this.bgColors[index];
               this.rect.style.backgroundColor = this.squareColors[index];
           } 
           let randX = Math.floor(Math.random() * 550);
           let randY = Math.floor(Math.random() * 520);
           let size = Math.floor(Math.random() * (40-20) + 20);
           console.log(this.rect.getBoundingClientRect());
           if((randX + size) > 630) {
               while((randX + size) > 630) {
                   randX = randX - 20;
               }
           }
           else if((randX + size) < 0) {
            while((randX + size) < 0) {
                randX = randX + 20;
            }
        }
        else if((randY + size) > 520) {
            while((randY + size) > 520) {
                randY = randY - 20;
            }
        }

           console.log("margin-top" + randY);
           console.log("size" + size);
           console.log("sum" + (randY + size));
           this.rect.style.marginLeft = randX + 'px';
           this.rect.style.marginTop = randY + 'px';
           this.rect.style.height = size + 'px';
           this.rect.style.width = size + 'px';
        });
    }

    startAndStopGame() {
        this.startButton.addEventListener("click", () => {
            document.querySelector('#pregame').style.display = "none";
            this.ground.style.display = 'block';
            let interval = setInterval(() => {
             this.time--;
             this.countdown.innerHTML = 'Timer:' + ' ' + this.time;
             if(this.time <= 0){
                clearInterval(interval);
                swal('Game over! Your score is:' + ' ' + this.score);
             } 
         }, 700);
        });
    }
}

let cube = document.querySelector('#cube');
let playground = document.querySelector("#playground");
let timer = document.querySelector('#timer');
let start = document.querySelector('#start-button');
let cubeGame = new Cube(cube, playground, timer, start, 21, 0);
cubeGame.gameEngine();