import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.css']
})
export class SnippetComponent implements OnInit
{
    /** YOUTUBE **/
  public player: any;
  public reframed: boolean = false;

  constructor() { }
  nativeElement: any;

  ngOnInit(): void {
  }

  init()
  {
    let tag = document.createElement('script');
    tag.src='http://www.youtube.com/iframe_api';
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);
      console.log("firstScriptTag : ", firstScriptTag);
      window['onYouTubeIframeAPIReady'] = () => this.startVideo();
      console.log("init films works");
  }

  startVideo()
  {
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
          'onStateChange': this.onPlayerStateChange.bind(this),
          'onError': this.onPlayerError.bind(this),
          'onReady': this.onPlayerReady.bind(this),
        }
      });
      console.log("this is films : ", this);
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
          console.log('playing ' + this.cleanTime());
        }
        break;
      case window['YT'].PlayerState.PAUSED:
          if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
            console.log('paused' + ' @ ' + this.cleanTime());
          }
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
        console.log('')
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }
  }
}
