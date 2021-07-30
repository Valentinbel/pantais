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
  public playlist: any;
  public player: any;
  public reframed: Boolean = false;
  
  
  constructor(private activatedroute: ActivatedRoute) {
  }
  
  ngOnInit() {
    const data = this.activatedroute.snapshot.data;
    if(data.hasOwnProperty('error')) {
      this.errorView = data.error;
    }

    this.video = 'nHP4GznSV0U';//'nHP4GznSV0U'; 'PL81csO796eDB_jrvC1As4g4LHHxd7RYry'
    this.playlist = 'playlist'
  }
  //Comme dan cet exemple essayer une seule partie de l'id. et aussi avec listType
  // Sachez que vous devez ajouter les lettres PL au début de l'ID de playlist, tel qu'illustré dans l'exemple ci-dessous :
  // listType=playlist&list=PLC77007E23FF423C6

  // 2. Initialize method for YT IFrame API 
  init() {
    var tag = document.createElement('script');
    tag.src='http://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);
    // 3. startVideo() will create an <iframe> (and YouTube player) after the API code downloads. 
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
        listType: 'player'//this.playlist
      },
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onError': this.onPlayerError.bind(this),
        'onReady': this.onPlayerReady.bind(this),
      }
    });
  }

  // 4. It will be called when the Video Player is ready 
  onPlayerReady(event:any) {
    event.target.playVideo();
  }

  // 5. API will call this function when Player State changes like PLAYING, PAUSED, ENDED 
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
        //this.player.cuePlaylist({listType:'playlist',list:'PL81csO796eDB_jrvC1As4g4LHHxd7RYry',index:1});
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

  /*var tag:any = document.createElement('script');
  tag.src = "https://www.youtube.com/watch?v=nHP4GznSV0U&list=PL81csO796eDB_jrvC1As4g4LHHxd7RYry";
  var firstScriptTag:any = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var player;

  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: 'p2FZvPLWf_M',
      playerVars: { 'autoplay': 1, 'controls': 1 },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }*/
  
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
    //this.playthevideo(windowid)
    
    if (windowid.classList.contains('hide') ) {
      windowid.classList.remove('hide');
    }
    if(windowid.id==="draggabletv"){
      this.init();
    }
    // this.onPlayerReady(event)
  }
 
  // playthevideo(windowid: any){

    // if(windowid.id==="draggabletv"){

      // var videoContainer: any = document.getElementById("videoContainer");
      // var myIframe:any = document.getElementById("myIframe");
      // videoContainer.playVideo();      
      // myIframe?.play();

      /* var ifrm = document.createElement('iframe');
      ifrm.setAttribute('id', 'ifrm'); // assign an id
      videoContainer.appendChild(ifrm); // to place at end of document
      ifrm.setAttribute('src', 'https://www.youtube.com/embed/nHP4GznSV0U?controls=0&rel=0&showinfo=0&modestbranding=0');*/
    // }
  // }

  videoStopper(id:any, event:any):void {
    //const containerElement = document.getElementById(id);
    event.player.pauseVideo();
    const iframe_tag = id.querySelector( 'player');
    const video_tag = id.querySelector( 'player' );
    if ( iframe_tag) {
        let iframeSrc = iframe_tag.src;
        iframe_tag.src = iframeSrc; 
    }
    if ( video_tag) {
        video_tag.pause();
    }
  }

  closewindow(windowid: any): void{
    windowid.classList.add('hide');
    if(windowid.id==="draggabletv"){
      let videoContainer= document.getElementById("player");
      this.videoStopper(videoContainer, this); 
    }
  }
}
