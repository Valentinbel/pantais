import { Component, OnInit } from '@angular/core';
//import * as St from 'page-flip';
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
    //const pageFlip = new PageFlip();

    //or if you're using a script tag and page-flip.browser.js:
    let book: any = null;
    book =document.getElementById('book');
    //const pageFlip = new St.PageFlip(book,
    //{
      //  width: 400, // required parameter - base page width
       // height: 600,  // required parameter - base page height
        //showCover: true
    //});

    //pageFlip.loadFromHTML(document.querySelectorAll('.my-page'));
     
  }

 
  
   closewindow(windowid: any): void
   {
     windowid.classList.add('hide');
   }
}
