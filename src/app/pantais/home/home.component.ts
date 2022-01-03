import { QueryBindingType } from '@angular/compiler/src/core';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicService } from './../../music/shared/music.service';
// import reframe from 'refame.js';
import { YouTubePlayerModule } from "@angular/youtube-player";
//import { Track } from 'ngx-audio-player'; 
//import * as SC from './../../../assets/apisoundcloud.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, ElementRef {

  nativeElement: any;
  public uppedzindexreference: number =1;
  errorView: number | undefined;

  /** YOUTUBE **/
  // public video: any;
  public YT: any;
  public playersnippets: any;
  public playerfilms: any;
  public player: any;
  public reframedsnippets: Boolean = false;
  public reframedfilms: Boolean = false;
  public reframed: Boolean = false;
  
  /** SOUNDCLOUD **/
  declare apisoundcloud: any ;
  declare SC: any;

  title: any;
  position: any;
  elapsed: any;
  duration: any;
  tracks: any[] = [];
  backgroundStyle: any;

  paused = true;

   //public SC: any;
   public soundcloudClient: any;

  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [2,4,6];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = false;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = true;
  


  constructor(private  musicService: MusicService, private activatedroute: ActivatedRoute,) {
    this.soundcloudClient = 264588954; // essayer avec client depuis chqanson de SEC?
    
  }
  

  ngOnInit() {
    this.musicService.getPlaylistTracks().subscribe(tracks => {
      this.tracks = tracks;
      this.handleRandom();
    });
    // On song end
    this.musicService.audio.onended = this.handleEnded.bind(this);
    // On play time update
    this.musicService.audio.ontimeupdate = this.handleTimeUpdate.bind(this);
    
    const data = this.activatedroute.snapshot.data;
    if(data.hasOwnProperty('error')) {
      this.errorView = data.error;
    };
    
    this.soundcloudAuthentication()
  }

  handleEnded(e:any) {
    this.handleRandom();
  }
  
  handleTimeUpdate(e:any) {
    const elapsed =  this.musicService.audio.currentTime;
    const duration =  this.musicService.audio.duration;
    this.position = elapsed / duration;
    this.elapsed = this.musicService.formatTime(elapsed);
    this.duration = this.musicService.formatTime(duration);
  }

   handleRandom() {
    // Pluck a song
    const randomTrack = this.musicService.randomTrack(this.tracks);
    // Play the plucked song
    this.musicService.play(randomTrack.stream_url)
    // Set the title property
    this.title = randomTrack.title;
    // Create a background based on the playing song
    this.backgroundStyle = this.composeBackgroundStyle(randomTrack.artwork_url)
  }

  composeBackgroundStyle(url:any) {
    return {
      width: '100%',
      height: '600px',
      backgroundSize:'cover',
      backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
      ),   
      url(${this.musicService.xlArtwork(url)})`
    }
  }

  handlePausePlay() {
    if(this.musicService.audio.paused) {
      this.paused = true;
      this.musicService.audio.play()
    } else {
      this.paused = false;
      this.musicService.audio.pause()
    }
  }

  handleStop() {
    this.musicService.audio.pause();
    this.musicService.audio.currentTime = 0;
    this.paused = false;
  }

  handleBackward() {
    let elapsed =  this.musicService.audio.currentTime;
    console.log(elapsed);
    if(elapsed >= 5) {
      this.musicService.audio.currentTime = elapsed - 5;
    }
  }

  handleForward() {
    let elapsed =  this.musicService.audio.currentTime;
    const duration =  this.musicService.audio.duration;
    if(duration - elapsed >= 5) {
      this.musicService.audio.currentTime = elapsed + 5;
    }
  }
  
  /*soundcloudAuthentication(){
    this.SC = document.createElement('script');
    this.SC.src="https://connect.soundcloud.com/sdk/sdk-3.3.2.js";
    this.SC.initialize({
      client_id: this.soundcloudClient
    });
  }*/

  /* soundcloudAuthentication(){
    // this.SC = require('soundcloud');

    this.SC.initialize({
      client_id: this.soundcloudClient //'YOUR_CLIENT_ID',
    });
  } */

  // Material Style Advance Audio Player Playlist
  /* 
  msaapPlaylist: Track[] = [
  {
    title: 'Miha',
    link: 'https://api.soundcloud.com/playlists/10657750?access=playable&show_tracks=true',
    artist: 'SEC',
    duration: 247
  } ,

  <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" 
  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/637853880&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/rodiin" title="rodín" target="_blank" style="color: #cccccc; text-decoration: none;">rodín</a> · 
  <a href="https://soundcloud.com/rodiin/pichotaflor" title="pichòta flor" target="_blank" style="color: #cccccc; text-decoration: none;">pichòta flor</a></div>

  pensarai
  {
    title: 'Audio Two Title',
    link: 'Link to Audio Two URL',
    artist: 'Audio Two Artist',
    duration: 100
  },
  {
    title: 'Audio Three Title',
    link: 'Link to Audio Three URL',
    artist: 'Audio Three Artist',
    duration: 110
  },
];*/

  init() { // init(dragorigin:any)
    var tag = document.createElement('script');
    tag.src='http://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);
    /*if (dragorigin==="snippets"){
      var tagsnippet = document.createElement('script');
      tagsnippet.src='http://www.youtube.com/iframe_api';
      var snippetScriptTag = document.getElementsByTagName('script')[0];
      console.log("snippetScriptTag : ",snippetScriptTag);
      snippetScriptTag.parentNode!.insertBefore(tagsnippet, snippetScriptTag);
      window['onYouTubeIframeAPIReady'] = () => this.startVideo("snippets");
      console.log("init snippets works");
    }*/
    /*if (dragorigin==="films"){
      var tagfilms = document.createElement('script');
      tagfilms.src='http://www.youtube.com/iframe_api';
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
    /*else {
      console.log("error in startvideo")
    }*/
    

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
      document.getElementById("quatreponchs")?.setAttribute('src', './assets/Images/crotzponchs/lura_ponchs.png');
      
      document.getElementById("crotzsociau")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png')
      document.getElementById("crotzcredits")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png')
      document.getElementById("crotztv")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png')
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
      document.getElementById("quatreponchs")?.setAttribute('src', './assets/Images/crotzponchs/marselha_ponchs.png');

      document.getElementById("crotzsociau")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png')
      document.getElementById("crotzcredits")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png')
      document.getElementById("crotztv")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png')
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
      document.getElementById("quatreponchs")?.setAttribute('src', './assets/Images/crotzponchs/godas_ponchs.png');

      document.getElementById("crotzsociau")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png')
      document.getElementById("crotzcredits")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png')
      document.getElementById("crotztv")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png')
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
      document.getElementById("quatreponchs")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_ponchs.png');

      document.getElementById("crotzsociau")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png')
      document.getElementById("crotzcredits")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png')
      document.getElementById("crotztv")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png')
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
      document.getElementById("quatreponchs")?.setAttribute('src', './assets/Images/crotzponchs/salagon_ponchs.png');

      document.getElementById("crotzsociau")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png')
      document.getElementById("crotzcredits")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png')
      document.getElementById("crotztv")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png')
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
      document.getElementById("quatreponchs")?.setAttribute('src', './assets/Images/crotzponchs/venturi_ponchs.png');

      document.getElementById("crotzsociau")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png')
      document.getElementById("crotzcredits")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png')
      document.getElementById("crotztv")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png')
      document.getElementById("crotzfilms")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png')
      document.getElementById("crotzradio")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png')
      document.getElementById("crotzlyrics")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png')
      document.getElementById("crotzmag")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png')
      document.getElementById("crotzshop")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png')
      document.getElementById("crotzpro")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png')
      document.getElementById("crotz404")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png')
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
    //if ( windowid.id === "draggabletv" ) { this.init("snippets"); }
    if ( windowid.id === "draggablefilms" ) { this.init(); } // { this.init("films"); }
    if ( windowid.id === "draggableradio" ) { 
      var iframesoundcloud = document.getElementById('iframesoundcloud');
      var widget1         = this.SC.Widget(iframesoundcloud);
      //var widget2         = SC.Widget(iframeElementID);
      widget1.play();
     }
  }

  soundcloudAuthentication(){ // NE MARCHE PAS
    this.SC = document.createElement('script');
    this.SC.src="https://connect.soundcloud.com/sdk/sdk-3.3.2.js";
    //this.SC.src="https://w.soundcloud.com/player/api.js";
    this.SC.initialize({
      client_id: this.soundcloudClient
    });
    var iframesoundcloud:any = document.getElementById('iframesoundcloud');
    var myiframe = document.querySelector('iframe');
    var widget1         = this.SC.Widget(iframesoundcloud);
    var widget2         = this.SC.Widget(myiframe);
    //widget1.play();
    iframesoundcloud.play();
  }

  closewindow(windowid: any): void{
    windowid.classList.add('hide');
    /*if(windowid.id==="draggabletv"){
      this.videoStopper(this.playersnippets); 
    }*/
    if(windowid.id==="draggablefilms"){
      this.videoStopper(this); // this.videoStopper(this.playerfilms); 
    }
  }
}
