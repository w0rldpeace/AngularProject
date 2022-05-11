import { Component, OnInit, Input, Host } from '@angular/core';
import { PlayfieldComponent } from '../playfield/playfield.component';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  
  @Input()
  index : number = 0;

  xPos : number = 0;
  yPos : number = 0;
  @Input() 
  color : string = "white";
  playField : PlayfieldComponent


  constructor(@Host() playField : PlayfieldComponent) { 
    this.playField = playField
  }

  ngOnInit(): void {
    this.xPos = (this.index % 7 ) + 1
    this.yPos = Math.floor((this.index) / 7) + 1

  }

  hasBottomField() : boolean {
    
    return this.index > 34
  }
  getBottomField() {
    
  }

  placeChip(): void {
    this.playField.placeChipAtRow(this.index)
  }
}
