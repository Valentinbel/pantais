import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, ElementRef{

  constructor() { }
  nativeElement: any;
  public uppedzindexreference: number =1;
  public uppedzindexcredit: number=0;
  public uppedzindexsociau: number=0;
  
  ngOnInit(): void {
  }

  addzindex(windowid: any){
    this.uppedzindexreference ++;
    windowid.style.zIndex=this.uppedzindexreference;
    return this.uppedzindexreference;
  }

  displaywindow(windowid:any): void  {
    this.addzindex(windowid);
    if (windowid.classList.contains('hide') ) {
      windowid.classList.remove('hide');
    }
  }
   
closewindow(windowid: any): void{
  windowid.classList.add('hide');
  }
   
}
