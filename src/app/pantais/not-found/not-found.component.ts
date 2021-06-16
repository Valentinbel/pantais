import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor() { }
  nativeElement: any;
   

  ngOnInit(): void {
  let draggablenotfound:any= document.getElementById("draggablenotfound");
    if (draggablenotfound.classList.contains('hide') ) {
      draggablenotfound.classList.remove('hide');
    }
  }
  closewindow(windowid: any): void{
    windowid.classList.add('hide');
    }

}
