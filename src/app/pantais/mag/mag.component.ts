import { Component, OnInit } from '@angular/core';
// import {PageFlip} from 'page-flip';


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

  //const pageFlip = new PageFlip(htmlParentElement, settings);

// or if you're using a script tag and page-flip.browser.js:
 //const pageFlip = new St.PageFlip(htmlParentElement, settings);
  
  // closewindow(windowid: any): void
  // {
  //   windowid.classList.add('hide');
  // }
}
