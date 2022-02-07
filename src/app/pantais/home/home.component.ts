import { QueryBindingType } from '@angular/compiler/src/core';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MagComponent } from '../mag/mag.component';
// import reframe from 'refame.js';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { Track , AudioPlayerComponent} from 'ngx-audio-player'; 
import { map , debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, ElementRef {

  nativeElement: any;
  public uppedzindexreference: number =1;
  errorView: number | undefined;
  public magView: Boolean = false;
  public snippetView: Boolean = false;

  /** YOUTUBE **/
  // public video: any;
  public YT: any;
  public playersnippets: any;
  public playerfilms: any;
  public player: any;
  public reframedsnippets: Boolean = false;
  public reframedfilms: Boolean = false;
  public reframed: Boolean = false;


  title: any;
  position: any;
  elapsed: any;
  duration: any;
  tracks: any[] = [];
  backgroundStyle: any;

  paused = true;

   // ngx-audio-player
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [2,4,6];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = false;
  msaapDisplayArtist = false;
  msaapDisplayDuration = true;
  msaapDisablePositionSlider = false;  
  autoPlay : boolean = false;
  //autoPlay: false;
  // voir: AudioPlayerComponent
 

  constructor(private activatedroute: ActivatedRoute) 
  {
    window.addEventListener('resize', () => 
    {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  }
  
  ngOnInit() 
  { 
    const theme = ["lura", "marselha", "godas", "vitrolas", "salagon", "venturi",];
    const random = Math.floor(Math.random() * theme.length);
    this.changetheme(theme[random]);
    console.log("theme on init:", theme[random]);
  }

  msaapPlaylist: Track[] = 
  [
    {
      title: 'pichòta flor',
      link: './assets/audio/1_pichota_flor.mp3',
      artist: 'Rodín',
      duration: 248
    },
    {
      title: 'rei de la luna',
      link: './assets/audio/2_rei_de_la_luna.mp3',
      artist: 'Rodín',
      duration: 259
    },
    {
      title: 'leis alas dau temps',
      link: './assets/audio/3_leis_alas_dau_temps.mp3',
      artist: 'Rodín',
      duration: 230
    },
    {
      title: 'pensarai en tu',
      link: './assets/audio/4_pensarai_en_tu.mp3',
      artist: 'Rodín',
      duration: 228
    },
    {
      title: 'ma cançon',
      link: './assets/audio/5_ma_cançon.mp3',
      artist: 'Rodín',
      duration: 283
    },
    {
      title: 'temps dei sòmis',
      link: './assets/audio/6_temps_dei_somis.mp3',
      artist: 'Rodín',
      duration: 324
    },
    {
      title: 'me\'n vau',
      link: './assets/audio/7_me_n_vau.mp3',
      artist: 'Rodín',
      duration: 415
    },
  ];
  
  init() { // init(dragorigin:any)
    var tag = document.createElement('script');
    tag.src='https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);
    /*if (dragorigin==="snippets"){
      var tagsnippet = document.createElement('script');
      tagsnippet.src='https://www.youtube.com/iframe_api';
      var snippetScriptTag = document.getElementsByTagName('script')[0];
      console.log("snippetScriptTag : ",snippetScriptTag);
      snippetScriptTag.parentNode!.insertBefore(tagsnippet, snippetScriptTag);
      window['onYouTubeIframeAPIReady'] = () => this.startVideo("snippets");
      console.log("init snippets works");
    }*/
    /*if (dragorigin==="films"){
      var tagfilms = document.createElement('script');
      tagfilms.src='https://www.youtube.com/iframe_api';
      var filmScriptTag = document.getElementsByTagName('script')[0];*/
      console.log("firstScriptTag : ", firstScriptTag);
      window['onYouTubeIframeAPIReady'] = () => this.startVideo();
      //firstScriptTag.parentNode!.insertBefore(tagfilms, filmScriptTag);
      //window['onYouTubeIframeAPIReady'] = () => this.startVideo("films");
      console.log("init films works");
    //}
     
  }

  startVideo() { // startVideo(dragorigin:any) {
    //this.reframed = false;
    /*if (dragorigin==="snippets"){
      this.reframedsnippets = false;
      this.playersnippets = new window['YT'].Player('player', {
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
          'onStateChange': this.onPlayerStateChange.bind(this.playersnippets),
          'onError': this.onPlayerError.bind(this.playersnippets),
          'onReady': this.onPlayerReady.bind(this.playersnippets),
        }
      });
      console.log("this is snippets : ", this.playersnippets);
    }*/
    //if(dragorigin==="films"){ //else if
      this.reframed = false;
      this.player = new window['YT'].Player('player', {
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          controls: 0,
          disablekb: 1,
          rel: 0,
          showinfo: 0,
          fs: 0,
          playsinline: 1, list:'PL81csO796eDDUIqRMau1niRxqHLrXAVJz',
          listType: 'player'
        },
        events: {
          'onStateChange': this.onPlayerStateChange.bind(this), // .bind(this.playerfilms),
          'onError': this.onPlayerError.bind(this),
          'onReady': this.onPlayerReady.bind(this),
        }
      });
      console.log("this is films : ", this);
    //}
  }

  onPlayerReady(event:any) {
    event.target.playVideo();
  }

  videoStopper(event:any):void {
    event.player.pauseVideo();
  }

  onPlayerStateChange(event:any) {
    console.log(event)
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) { // if (this.cleanTime(event) == 0) {
          console.log('started ' + this.cleanTime()); //console.log('started ' + this.cleanTime(event));
        } else {
          console.log('playing ' + this.cleanTime()) //console.log('playing ' + this.cleanTime(event))
        };
        break;
      case window['YT'].PlayerState.PAUSED:
       /* if(event=== this.playersnippets){
          if (this.playersnippets.getDuration() - this.playersnippets.getCurrentTime() != 0) {
            console.log('paused' + ' @ ' + this.cleanTime()); //console.log('paused' + ' @ ' + this.cleanTime(event));
          };
        }*/
        //if (event===this.playerfilms){
          if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
            console.log('paused' + ' @ ' + this.cleanTime()); // console.log('paused' + ' @ ' + this.cleanTime(event));
          };
        //}
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        break;
    }
  }
      
  cleanTime() { // cleanTime(player:any) {
    return Math.round(this.player.getCurrentTime()) //return Math.round(this.playerfilms.getCurrentTime())
    
   /* if (player=== this.playerfilms){
      return Math.round(this.playersnippets.getCurrentTime())
    }
     else if(player=== this.playersnippets){
      return Math.round(this.playerfilms.getCurrentTime())
    }
    else{return console.log("error in CleanTime")}*/
  }

  onPlayerError(event:any) {
    switch (event.data) {
      case 2:
        console.log('')
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
      root.style.setProperty('--bordFenetre', '#39378e');
      root.style.setProperty('--typoPonchs', '#ec7744');
      root.style.setProperty('--fonsFenestra', 'url(./assets/Images/fonsfenestra/fenestra_lura.jpg)');
      document.getElementById("quatreponchs")?.setAttribute('src', './assets/Images/crotzponchs/lura_ponchs.png');
      document.getElementById("crotzsociau")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png')
      document.getElementById("crotzcredits")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png')
      document.getElementById("crotzsnippet")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png')
      document.getElementById("crotzfilms")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png')
      document.getElementById("crotzradio")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png')
      document.getElementById("crotzlyrics")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png')
      document.getElementById("crotzmag")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png')
      document.getElementById("crotzshop")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png')
      document.getElementById("crotzpro")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png')
      document.getElementById("crotz404")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png')
    }
    if(theme=="marselha"){
      root.style.setProperty('--bgimg', 'url(./assets/Images/backgrounds/marselha.jpg)');
      root.style.setProperty('--bordFenetre', '#b7e1ff');
      root.style.setProperty('--typoPonchs', '#11584d');
      root.style.setProperty('--fonsFenestra', 'url(./assets/Images/fonsfenestra/fenestra_marselha.jpg)');
      document.getElementById("quatreponchs")?.setAttribute('src', './assets/Images/crotzponchs/marselha_ponchs.png');
      document.getElementById("crotzsociau")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png')
      document.getElementById("crotzcredits")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png')
      document.getElementById("crotzsnippet")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png')
      document.getElementById("crotzfilms")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png')
      document.getElementById("crotzradio")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png')
      document.getElementById("crotzlyrics")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png')
      document.getElementById("crotzmag")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png')
      document.getElementById("crotzshop")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png')
      document.getElementById("crotzpro")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png')
      document.getElementById("crotz404")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png')
    }
    if(theme=="godas"){
      root.style.setProperty('--bgimg', 'url(./assets/Images/backgrounds/godas.jpg)');
      root.style.setProperty('--bordFenetre', '#b55c5c');
      root.style.setProperty('--typoPonchs', '#ffba00');
      root.style.setProperty('--fonsFenestra', 'url(./assets/Images/fonsfenestra/fenestra_godas.jpg)');
      document.getElementById("quatreponchs")?.setAttribute('src', './assets/Images/crotzponchs/godas_ponchs.png');
      document.getElementById("crotzsociau")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png')
      document.getElementById("crotzcredits")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png')
      document.getElementById("crotzsnippet")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png')
      document.getElementById("crotzfilms")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png')
      document.getElementById("crotzradio")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png')
      document.getElementById("crotzlyrics")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png')
      document.getElementById("crotzmag")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png')
      document.getElementById("crotzshop")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png')
      document.getElementById("crotzpro")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png')
      document.getElementById("crotz404")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png')
    }
    if(theme=="vitrolas"){
      root.style.setProperty('--bgimg', 'url(./assets/Images/backgrounds/vitrolas.jpg)');
      root.style.setProperty('--bordFenetre', '#ffe400');
      root.style.setProperty('--typoPonchs', '#476d55');
      root.style.setProperty('--fonsFenestra', 'url(./assets/Images/fonsfenestra/fenestra_vitrolas.jpg)');
      document.getElementById("quatreponchs")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_ponchs.png');
      document.getElementById("crotzsociau")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png')
      document.getElementById("crotzcredits")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png')
      document.getElementById("crotzsnippet")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png')
      document.getElementById("crotzfilms")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png')
      document.getElementById("crotzradio")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png')
      document.getElementById("crotzlyrics")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png')
      document.getElementById("crotzmag")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png')
      document.getElementById("crotzshop")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png')
      document.getElementById("crotzpro")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png')
      document.getElementById("crotz404")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png')
    }
    if(theme=="salagon"){
      root.style.setProperty('--bgimg', 'url(./assets/Images/backgrounds/salagon.jpg)');
      root.style.setProperty('--bordFenetre', '#3b8b7f');
      root.style.setProperty('--typoPonchs', '#ffffff');
      root.style.setProperty('--fonsFenestra', 'url(./assets/Images/fonsfenestra/fenestra_salagon.jpg)');
      document.getElementById("quatreponchs")?.setAttribute('src', './assets/Images/crotzponchs/salagon_ponchs.png');
      document.getElementById("crotzsociau")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png')
      document.getElementById("crotzcredits")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png')
      document.getElementById("crotzsnippet")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png')
      document.getElementById("crotzfilms")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png')
      document.getElementById("crotzradio")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png')
      document.getElementById("crotzlyrics")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png')
      document.getElementById("crotzmag")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png')
      document.getElementById("crotzshop")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png')
      document.getElementById("crotzpro")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png')
      document.getElementById("crotz404")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png')
    }
    if(theme=="venturi"){
      root.style.setProperty('--bgimg', 'url(./assets/Images/backgrounds/venturi.jpg)');
      root.style.setProperty('--bordFenetre', '#b085cc');
      root.style.setProperty('--typoPonchs', '#3e4abb');
      root.style.setProperty('--fonsFenestra', 'url(./assets/Images/fonsfenestra/fenestra_venturi.jpg)');
      document.getElementById("quatreponchs")?.setAttribute('src', './assets/Images/crotzponchs/venturi_ponchs.png');
      document.getElementById("crotzsociau")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png')
      document.getElementById("crotzcredits")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png')
      document.getElementById("crotzsnippet")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png')
      document.getElementById("crotzfilms")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png')
      document.getElementById("crotzradio")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png')
      document.getElementById("crotzlyrics")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png')
      document.getElementById("crotzmag")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png')
      document.getElementById("crotzshop")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png')
      document.getElementById("crotzpro")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png')
      document.getElementById("crotz404")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png')
    }
  }

  addzindex(windowid: any)
  {
    this.uppedzindexreference ++;
    windowid.style.zIndex=this.uppedzindexreference;
    return this.uppedzindexreference;
  }

  displaywindow(windowid: any): void  
  {
    this.addzindex(windowid);

    if ( windowid.classList.contains('hide') ) 
    { 
      windowid.classList.remove('hide'); 
    }
    if ( windowid.id === "draggablefilms" ) 
    { 
      this.init(); // this.init("films")
    } 
    if ( windowid.id === "draggablemag" ) 
    { 
      this.magView = true; 
    }
      //if ( windowid.id === "draggablesnippet" ) { this.init("snippets"); } 
      // if ( windowid.id === "draggablesnippet" ) 
      // { 
      //   this.snippetView = true; 
      // } 
    if ( windowid.id === "draggableradio" ) 
    { 
      const self = this
      const players = document.querySelectorAll('audio');
      players.forEach(element => 
      {
          element.play();
      });
    }
  }   

  closewindow(windowid: any): void{
    windowid.classList.add('hide');
    /*if(windowid.id==="draggablesnippet"){
      this.videoStopper(this.playersnippets); 
    }*/
    if(windowid.id==="draggablefilms")
    {
      this.videoStopper(this); // this.videoStopper(this.playerfilms); 
    }
    if(windowid.id==="draggableradio")
    {
      const self = this
      const players = document.querySelectorAll('audio');
      players.forEach(element => 
      {
          element.pause();
      });
    }
  }
}
