import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, ElementRef {

  nativeElement: any;
  public uppedzindexreference: number =1;
  errorView: number | undefined;

  // 1. Some required variables which will be used by YT API
  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;
  

  constructor(private activatedroute: ActivatedRoute) {
  }
  

  ngOnInit() {
    const data = this.activatedroute.snapshot.data;
    if(data.hasOwnProperty('error')) {
      this.errorView = data.error;
    }
    //this.video = 'nHP4GznSV0U';
  }


  init() {
    var tag = document.createElement('script');
    tag.src='http://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);
     window['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }

  startVideo() {
    this.reframed = false;
    this.player = new window['YT'].Player('player', {
      //videoId: this.video,  
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        controls: 0,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1, list:'PL81csO796eDB_jrvC1As4g4LHHxd7RYry',
        listType: 'player'
      },
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onError': this.onPlayerError.bind(this),
        'onReady': this.onPlayerReady.bind(this),
      }
    });
  }

  onPlayerReady(event:any) {
    event.target.playVideo();
  }

  onPlayerStateChange(event:any) {
    console.log(event)
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime())
        };
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        };
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        break;
    }
  }
      
  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  }

  onPlayerError(event:any) {
    switch (event.data) {
      case 2:
        console.log('' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }
  }
  
  changetheme(theme:any):void{
    //document.documentElement.style.setProperty('--your-variable', '#YOURCOLOR');
    let root = document.documentElement;
    if(theme=="lura"){
      root.style.setProperty('--bgimg', 'url(./assets/Images/backgrounds/lura.jpg)');
    }
    if(theme=="marselha"){
      root.style.setProperty('--bgimg', 'url(./assets/Images/backgrounds/marselha.jpg)');
    }
    if(theme=="godas"){
      root.style.setProperty('--bgimg', 'url(./assets/Images/backgrounds/godas.jpg)');
    }
    if(theme=="vitrolas"){
      root.style.setProperty('--bgimg', 'url(./assets/Images/backgrounds/vitrolas.jpg)');
    }
    if(theme=="salagon"){
      root.style.setProperty('--bgimg', 'url(./assets/Images/backgrounds/salagon.jpg)');
    }
    if(theme=="venturi"){
      root.style.setProperty('--bgimg', 'url(./assets/Images/backgrounds/venturi.jpg)');
    }
  }

  addzindex(windowid: any){
    this.uppedzindexreference ++;
    windowid.style.zIndex=this.uppedzindexreference;
    return this.uppedzindexreference;
  }

  displaywindow(windowid: any): void  {
    this.addzindex(windowid);

    if ( windowid.classList.contains('hide') ) { windowid.classList.remove('hide'); }
    if ( windowid.id === "draggabletv" ) { this.init(); }
  }

  videoStopper(event:any):void {
    event.player.pauseVideo();
  }

  closewindow(windowid: any): void{
    windowid.classList.add('hide');
    if(windowid.id==="draggabletv"){
      this.videoStopper(this); 
    }
  }
}
