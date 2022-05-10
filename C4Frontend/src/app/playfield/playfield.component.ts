import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playfield',
  templateUrl: './playfield.component.html',
  styleUrls: ['./playfield.component.css']
})
export class PlayfieldComponent implements OnInit {

  sizeX : number = 7
  sizeY : number = 6
  playField : string[] = []
  gameState : string = "red"
  winner? : string
  
  constructor() { }

  ngOnInit(): void {

    for( let x = 0; x < this.sizeX * this.sizeY; x++) {
      this.playField[x] = "white"
    }
  }

  getFreeSlot(index:number) : number {

    if(index > 34){
      if(this.playField[index] === "white") {
        return index
      }
    } else {
      if(this.playField[index + 7] === "white"){  
        return this.getFreeSlot(index + 7)
      }  
    }
    return index
  }
  public placeChipAtRow(index:number) {

    let lowestIndexAtRow : number = this.getFreeSlot(index)
    this.playField[lowestIndexAtRow] = this.gameState

    this.checkWinCondition()

    if(this.gameState === "red"){
      this.gameState = "yellow"
    } else {
      this.gameState = "red"
    }
  }

  checkHorizontalWin() : boolean {
    let pointCounter : number = 0
    
    for(let x = 0; x < this.playField.length; x++){
      if(x % 7 == 0){
        pointCounter = 0
      }
      if(this.playField[x] == this.gameState){
        pointCounter++
        if(pointCounter >= 4){
          return true
        }
      } else {
        pointCounter = 0
      }
    }
    return false
  }

  checkVerticalWin() : boolean {
    let pointCounter : number = 0
    for(let x = 0; x < this.playField.length; x++){
      if(this.playField[x] == this.gameState){
        if(this.playField[x+7] == this.gameState){
          pointCounter++
          if(pointCounter >= 4){
            return true
          }
        } else {
          pointCounter = 0
        }
      }
    }
    return false
  }

  checkDiaRightWin() : boolean {
    let pointCounter : number = 0

    return false
  }

  checkDiaLeftWin() : boolean {
    let pointCounter : number = 0

    return false
  }

  checkWinCondition(){
    if(this.checkHorizontalWin() || this.checkVerticalWin() || this.checkDiaRightWin() || this.checkDiaLeftWin()){
      this.winner = this.gameState
    }
  }
}
