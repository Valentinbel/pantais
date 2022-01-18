import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mag',
  templateUrl: './mag.component.html',
  styleUrls: ['./mag.component.css']
})
export class MagComponent implements OnInit {

  constructor() { }
  nativeElement: any;

  ngOnInit(): void {
  }
  
  // closewindow(windowid: any): void
  // {
  //   windowid.classList.add('hide');
  // }
}
