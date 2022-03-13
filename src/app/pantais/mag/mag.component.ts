import { Component, OnInit } from '@angular/core';
import { Book, PageType } from '@labsforge/flipbook';


@Component({
  selector: 'app-mag',
  templateUrl: './mag.component.html',
  styleUrls: ['./mag.component.css']
})
export class MagComponent implements OnInit {

  constructor(){}

  nativeElement: any;

  ngOnInit(): void { 
  }
  
  book: Book = {
    width: 1760,
      height: 1250,
      zoom: 1,
      cover: {
        front: {
          imageUrl: 'assets/Images/mag/mag_1.jpg',
        },
        back: {
          imageUrl: 'assets/Images/mag/mag_52.jpg',
        }
      },
      pages: [
        { // start guard section
          imageUrl: 'assets/Images/mag/mag_2.jpg',
          //backgroundColor: '#41473A', // don't use if want to see front-cover inverted image
        },
        {
          imageUrl: 'assets/Images/mag/mag_3.jpg',
        }, // end guard section
        { 
          imageUrl: 'assets/Images/mag/mag_4.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_5.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_6.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_7.jpg',
        }, 
        {
          imageUrl: 'assets/Images/mag/mag_8.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_9.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_10.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_11.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_12.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_13.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_14.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_15.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_16.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_17.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_18.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_19.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_20.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_21.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_22.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_23.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_24.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_25.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_26.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_27.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_28.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_29.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_30.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_31.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_32.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_33.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_34.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_35.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_36.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_37.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_38.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_39.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_40.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_41.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_42.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_43.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_44.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_45.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_46.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_47.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_48.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_49.jpg',
        },
        { // start guard section
          imageUrl: 'assets/Images/mag/mag_50.jpg',
        },
        {
          imageUrl: 'assets/Images/mag/mag_51.jpg',
          //backgroundColor: '#41473A', // don't use if want to see back-cover inverted image
        }, // end guard section
      ],
      pageWidth: 880,
      pageHeight: 1250,
      startPageType: PageType.Double,
      endPageType: PageType.Double
  }

   closewindow(windowid: any): void
   {
     windowid.classList.add('hide');
   }
}
