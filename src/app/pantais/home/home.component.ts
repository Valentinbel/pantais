import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, ElementRef{

  nativeElement: any;
  public uppedzindexreference: number =1;
  errorView: number | undefined;
  
  constructor(private activatedroute: ActivatedRoute) {}
  
  
  ngOnInit() {
    const data = this.activatedroute.snapshot.data;
      if(data.hasOwnProperty('error')) {
        this.errorView = data.error;
      }
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
