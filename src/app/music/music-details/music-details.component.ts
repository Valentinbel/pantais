import { Component, Input} from '@angular/core';

@Component({
  selector: 'music-details',
  templateUrl: './music-details.component.html',
  styleUrls: ['./music-details.component.css']
})

export class MusicDetailsComponent  {
  @Input() title: string;


  constructor() {
    //Cette ligne n'est pas dans le tuto, c'est pôur eviter une erreur.
    this.title="";
  }

}

