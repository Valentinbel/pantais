import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.css']
})
export class SnippetComponent implements OnInit 
{
    /** YOUTUBE **/
  // public video: any;
  public YT: any;
  public playersnippets: any;
  public playerfilms: any;
  public player: any;
  public reframedsnippets: Boolean = false;
  public reframedfilms: Boolean = false;
  public reframed: Boolean = false;

  constructor() { }
  nativeElement: any;

  ngOnInit(): void {
  }

  init() 
  { 
    // init(dragorigin:any)
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

  startVideo() 
  {
    // startVideo(dragorigin:any) {
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
  
  displaywindow(windowid: any): void  {
    console.log("On est dans snippets component")
  }
}
