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

    for(let x = 0; x < this.sizeX; x++){
      
      if(x % 7 == 0){
        pointCounter = 0
      }

      for(let y = 0; y < this.sizeY; y++){
        let index = y * this.sizeX + x

        if(this.playField[index] == this.gameState){
          pointCounter++
          if(pointCounter === 4){
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
    
    //durchiterieren durch alle felder
    for(let x = 3*this.sizeX; x < this.playField.length; x++){
      if(x % 7 < 4 ){
      //durchiterieren nach rechts oben
      for(let i = 0; i < 4; i++){
        if(this.playField[x-i*6] == this.gameState){
          pointCounter++
          if(pointCounter === 4){
            return true
          }
        } else {
          pointCounter = 0
        }
      }
    }
  }

    return false
}

  checkDiaLeftWin() : boolean {
    let pointCounter : number = 0

        //durchiterieren durch alle felder
        for(let x = 3*this.sizeX; x < this.playField.length; x++){
          if(x % 7 > 3 ){
          //durchiterieren nach links oben
          for(let i = 0; i < 4; i++){
            console.log(x-i*8)
            if(this.playField[x-i*8] == this.gameState){
              pointCounter++
              if(pointCounter === 4){
                return true
              }
            } else {
              pointCounter = 0
            }
          }
          console.log("-----------------------------------------")
        }
      }

    return false
  }

  checkWinCondition(){
    if(this.checkHorizontalWin() || this.checkVerticalWin() || this.checkDiaRightWin() || this.checkDiaLeftWin()){
      this.winner = this.gameState
    }
  }
}
