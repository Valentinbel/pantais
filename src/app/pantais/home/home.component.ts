import { Component, OnInit, ElementRef,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Track } from 'ngx-audio-player';
import { CookieService } from 'ngx-cookie-service';
import { Book, FlipbookService, PageType } from '@labsforge/flipbook';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, ElementRef {

  nativeElement: any;
  public uppedzindexreference: number =1;
  errorView: number | undefined;
  public magView: boolean = false;

  /** YOUTUBE **/
  // public video: any;
  public YT: any;
  public playersnippets: any;
  public playerfilms: any;
  public player: any;
  public reframedsnippets: boolean = false;
  public reframedfilms: boolean = false;
  public reframed: boolean = false;


  title: any;
  position: any;
  duration: any;
  tracks: any[] = [];
  paused = true;

   // ngx-audio-player
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = false;
  msaapDisplayArtist = false;
  msaapDisplayDuration = true;
  msaapDisablePositionSlider = false;
  autoPlay : boolean = false;

  //Cookies
  private cookie_name = '';
  private all_cookies : any = '';

  get magazine() {
    return this.flipService.book;
  }

  constructor(
    private elr: ElementRef,
    private activatedroute: ActivatedRoute,
    private cookieService:CookieService,
    private flipService: FlipbookService)
  {

    window.addEventListener('resize', () =>
    {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      this.magDimensions();
    });
  }

  ngOnInit()
  {
    this.launchbook();
    const theme = ["lura", "marselha", "godas", "vitrolas", "salagon", "venturi",];
    const random = Math.floor(Math.random() * theme.length);
    this.changetheme(theme[random]);
    console.log("theme on init:", theme[random]);
    this.all_cookies=this.cookieService.getAll();

  }

  msaapPlaylist: Track[] =
  [
    {
      title: 'pichòta flor',
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
      title: 'leis alas dau temps [amb Max Rouquette]',
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
      title: 'ma cançon',
      link: './assets/audio/5_ma_cançon.mp3',
      artist: 'Rodín',
      duration: 283
    },
    {
      title: 'temps dei sòmis',
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
    {
      title: 'leis alas dau temps [version alternativa]',
      link: './assets/audio/leis_alas_dau_temps-version_alternativa.mp3',
      artist: 'Rodín',
      duration: 393
    },
    {
      title: 'pensarai en tu [version alternativa]',
      link: './assets/audio/pensarai_en_tu-version_alternativa.mp3',
      artist: 'Rodín',
      duration: 328
    },
    {
      title: 'vòli [amb uèi]',
      link: './assets/audio/voli-feat_uei.mp3',
      artist: 'Rodín',
      duration: 422
    },
    {
      title: 'lo bauç',
      link: './assets/audio/lo_bauc.mp3',
      artist: 'Rodín',
      duration: 346
    },
    {
      title: 'camin de l\'estela [inedit]',
      link: './assets/audio/camin_del_estela-inedit.mp3',
      artist: 'Rodín',
      duration: 221
    },
  ];

  init()
  {
    let tag = document.createElement('script');
    tag.src='https://www.youtube.com/iframe_api';
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);
    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
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
        'onStateChange': this.onPlayerStateChange.bind(this), // .bind(this.playerfilms),
        'onError': this.onPlayerError.bind(this),
        'onReady': this.onPlayerReady.bind(this),
      }
    });
    console.log("this is films : ", this);
  }

  onPlayerReady(event:any)
  {
    event.target.playVideo();
  }

  videoStopper(event:any):void
  {
    event.player.pauseVideo();
  }

  onPlayerStateChange(event:any)
  {
    console.log(event)
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) { // if (this.cleanTime(event) == 0) {
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

  cleanTime()
  {
    return Math.round(this.player.getCurrentTime())
  }

  onPlayerError(event:any)
  {
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

  magDimensions()
  {
    const windowWidth = this.elr.nativeElement.getBoundingClientRect().width * 0.95;
    const windowHeight = this.elr.nativeElement.getBoundingClientRect().height * 0.95;
    console.log("windowWidth: "+windowWidth)

    this.flipService.book.zoom = Math.min(windowWidth / this.flipService.book.width, windowHeight / this.flipService.book.height);
    console.log("this.flipService.book.width : "+this.flipService.book.width )
  }

  changetheme(theme:any):void
  {
    let root = document.documentElement;
    if(theme=="lura")
    {
      root.style.setProperty('--bgimg', 'url(./assets/Images/backgrounds/lura.jpg)');
      root.style.setProperty('--bordFenetre', '#39378e');
      root.style.setProperty('--typoPonchs', '#ec7744');
      root.style.setProperty('--fonsFenestra', 'url(./assets/Images/fonsfenestra/fenestra_lura.jpg)');
      root.style.setProperty('--apple', 'url(./assets/Images/sociau/lura/apple_link.png');
      root.style.setProperty('--appleHover', 'url(./assets/Images/sociau/lura/apple_hover.png');
      root.style.setProperty('--bandcamp', 'url(./assets/Images/sociau/lura/bc_link.png');
      root.style.setProperty('--bandcampHover', 'url(./assets/Images/sociau/lura/bc_hover.png');
      root.style.setProperty('--facebook', 'url(./assets/Images/sociau/lura/fb_link.png');
      root.style.setProperty('--facebookHover', 'url(./assets/Images/sociau/lura/fb_hover.png');
      root.style.setProperty('--instagram', 'url(./assets/Images/sociau/lura/insta_link.png');
      root.style.setProperty('--instagramHover', 'url(./assets/Images/sociau/lura/insta_hover.png');
      root.style.setProperty('--soundcloud', 'url(./assets/Images/sociau/lura/sound_link.png');
      root.style.setProperty('--soundcloudHover', 'url(./assets/Images/sociau/lura/sound_hover.png');
      root.style.setProperty('--spotify', 'url(./assets/Images/sociau/lura/spot_link.png');
      root.style.setProperty('--spotifyHover', 'url(./assets/Images/sociau/lura/spot_hover.png');
      root.style.setProperty('--twitter', 'url(./assets/Images/sociau/lura/twitter_link.png');
      root.style.setProperty('--twitterHover', 'url(./assets/Images/sociau/lura/twitter_hover.png');
      root.style.setProperty('--youtube', 'url(./assets/Images/sociau/lura/ytb_link.png');
      root.style.setProperty('--youtubeHover', 'url(./assets/Images/sociau/lura/ytb_hover.png');
      document.getElementById("quatreponchs")?.setAttribute('src', './assets/Images/crotzponchs/lura_ponchs.png');
      document.getElementById("crotzsociau")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png');
      document.getElementById("crotzcredits")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png');
      document.getElementById("crotzsnippet")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png');
      document.getElementById("crotzfilms")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png');
      document.getElementById("crotzradio")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png');
      document.getElementById("crotzlyrics")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png');
      document.getElementById("crotzmag")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png');
      document.getElementById("crotzshop")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png');
      document.getElementById("crotzfriends")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png');
      document.getElementById("crotztour")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png');
      document.getElementById("crotzlive")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png');
      document.getElementById("crotzpro")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png');
      document.getElementById("crotz404")?.setAttribute('src', './assets/Images/crotzponchs/lura_crotz.png');
    }
    if(theme=="marselha")
    {
      root.style.setProperty('--bgimg', 'url(./assets/Images/backgrounds/marselha.jpg)');
      root.style.setProperty('--bordFenetre', '#b7e1ff');
      root.style.setProperty('--typoPonchs', '#11584d');
      root.style.setProperty('--fonsFenestra', 'url(./assets/Images/fonsfenestra/fenestra_marselha.jpg)');
      root.style.setProperty('--apple', 'url(./assets/Images/sociau/marselha/apple_link.png');
      root.style.setProperty('--appleHover', 'url(./assets/Images/sociau/marselha/apple_hover.png');
      root.style.setProperty('--bandcamp', 'url(./assets/Images/sociau/marselha/bc_link.png');
      root.style.setProperty('--bandcampHover', 'url(./assets/Images/sociau/marselha/bc_hover.png');
      root.style.setProperty('--facebook', 'url(./assets/Images/sociau/marselha/fb_link.png');
      root.style.setProperty('--facebookHover', 'url(./assets/Images/sociau/marselha/fb_hover.png');
      root.style.setProperty('--instagram', 'url(./assets/Images/sociau/marselha/insta_link.png');
      root.style.setProperty('--instagramHover', 'url(./assets/Images/sociau/marselha/insta_hover.png');
      root.style.setProperty('--soundcloud', 'url(./assets/Images/sociau/marselha/sound_link.png');
      root.style.setProperty('--soundcloudHover', 'url(./assets/Images/sociau/marselha/sound_hover.png');
      root.style.setProperty('--spotify', 'url(./assets/Images/sociau/marselha/spot_link.png');
      root.style.setProperty('--spotifyHover', 'url(./assets/Images/sociau/marselha/spot_hover.png');
      root.style.setProperty('--twitter', 'url(./assets/Images/sociau/marselha/twitter_link.png');
      root.style.setProperty('--twitterHover', 'url(./assets/Images/sociau/marselha/twitter_hover.png');
      root.style.setProperty('--youtube', 'url(./assets/Images/sociau/marselha/ytb_link.png');
      root.style.setProperty('--youtubeHover', 'url(./assets/Images/sociau/marselha/ytb_hover.png');
      document.getElementById("quatreponchs")?.setAttribute('src', './assets/Images/crotzponchs/marselha_ponchs.png');
      document.getElementById("crotzsociau")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png');
      document.getElementById("crotzcredits")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png');
      document.getElementById("crotzsnippet")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png');
      document.getElementById("crotzfilms")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png');
      document.getElementById("crotzradio")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png');
      document.getElementById("crotzlyrics")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png');
      document.getElementById("crotzmag")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png');
      document.getElementById("crotzshop")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png');
      document.getElementById("crotzfriends")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png');
      document.getElementById("crotztour")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png');
      document.getElementById("crotzlive")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png');
      document.getElementById("crotzpro")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png');
      document.getElementById("crotz404")?.setAttribute('src', './assets/Images/crotzponchs/marselha_crotz.png');
    }
    if(theme=="godas")
    {
      root.style.setProperty('--bgimg', 'url(./assets/Images/backgrounds/godas.jpg)');
      root.style.setProperty('--bordFenetre', '#b55c5c');
      root.style.setProperty('--typoPonchs', '#ffba00');
      root.style.setProperty('--fonsFenestra', 'url(./assets/Images/fonsfenestra/fenestra_godas.jpg)');
      root.style.setProperty('--apple', 'url(./assets/Images/sociau/godas/apple_link.png');
      root.style.setProperty('--appleHover', 'url(./assets/Images/sociau/godas/apple_hover.png');
      root.style.setProperty('--bandcamp', 'url(./assets/Images/sociau/godas/bc_link.png');
      root.style.setProperty('--bandcampHover', 'url(./assets/Images/sociau/godas/bc_hover.png');
      root.style.setProperty('--facebook', 'url(./assets/Images/sociau/godas/fb_link.png');
      root.style.setProperty('--facebookHover', 'url(./assets/Images/sociau/godas/fb_hover.png');
      root.style.setProperty('--instagram', 'url(./assets/Images/sociau/godas/insta_link.png');
      root.style.setProperty('--instagramHover', 'url(./assets/Images/sociau/godas/insta_hover.png');
      root.style.setProperty('--soundcloud', 'url(./assets/Images/sociau/godas/sound_link.png');
      root.style.setProperty('--soundcloudHover', 'url(./assets/Images/sociau/godas/sound_hover.png');
      root.style.setProperty('--spotify', 'url(./assets/Images/sociau/godas/spot_link.png');
      root.style.setProperty('--spotifyHover', 'url(./assets/Images/sociau/godas/spot_hover.png');
      root.style.setProperty('--twitter', 'url(./assets/Images/sociau/godas/twitter_link.png');
      root.style.setProperty('--twitterHover', 'url(./assets/Images/sociau/godas/twitter_hover.png');
      root.style.setProperty('--youtube', 'url(./assets/Images/sociau/godas/ytb_link.png');
      root.style.setProperty('--youtubeHover', 'url(./assets/Images/sociau/godas/ytb_hover.png');
      document.getElementById("quatreponchs")?.setAttribute('src', './assets/Images/crotzponchs/godas_ponchs.png');
      document.getElementById("crotzsociau")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png');
      document.getElementById("crotzcredits")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png');
      document.getElementById("crotzsnippet")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png');
      document.getElementById("crotzfilms")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png');
      document.getElementById("crotzradio")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png');
      document.getElementById("crotzlyrics")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png');
      document.getElementById("crotzmag")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png');
      document.getElementById("crotzshop")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png');
      document.getElementById("crotzfriends")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png');
      document.getElementById("crotztour")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png');
      document.getElementById("crotzlive")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png');
      document.getElementById("crotzpro")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png');
      document.getElementById("crotz404")?.setAttribute('src', './assets/Images/crotzponchs/godas_crotz.png');
    }
    if(theme=="vitrolas")
    {
      root.style.setProperty('--bgimg', 'url(./assets/Images/backgrounds/vitrolas.jpg)');
      root.style.setProperty('--bordFenetre', '#ffe400');
      root.style.setProperty('--typoPonchs', '#476d55');
      root.style.setProperty('--fonsFenestra', 'url(./assets/Images/fonsfenestra/fenestra_vitrolas.jpg)');
      root.style.setProperty('--apple', 'url(./assets/Images/sociau/vitrolas/apple_link.png');
      root.style.setProperty('--appleHover', 'url(./assets/Images/sociau/vitrolas/apple_hover.png');
      root.style.setProperty('--bandcamp', 'url(./assets/Images/sociau/vitrolas/bc_link.png');
      root.style.setProperty('--bandcampHover', 'url(./assets/Images/sociau/vitrolas/bc_hover.png');
      root.style.setProperty('--facebook', 'url(./assets/Images/sociau/vitrolas/fb_link.png');
      root.style.setProperty('--facebookHover', 'url(./assets/Images/sociau/vitrolas/fb_hover.png');
      root.style.setProperty('--instagram', 'url(./assets/Images/sociau/vitrolas/insta_link.png');
      root.style.setProperty('--instagramHover', 'url(./assets/Images/sociau/vitrolas/insta_hover.png');
      root.style.setProperty('--soundcloud', 'url(./assets/Images/sociau/vitrolas/sound_link.png');
      root.style.setProperty('--soundcloudHover', 'url(./assets/Images/sociau/vitrolas/sound_hover.png');
      root.style.setProperty('--spotify', 'url(./assets/Images/sociau/vitrolas/spot_link.png');
      root.style.setProperty('--spotifyHover', 'url(./assets/Images/sociau/vitrolas/spot_hover.png');
      root.style.setProperty('--twitter', 'url(./assets/Images/sociau/vitrolas/twitter_link.png');
      root.style.setProperty('--twitterHover', 'url(./assets/Images/sociau/vitrolas/twitter_hover.png');
      root.style.setProperty('--youtube', 'url(./assets/Images/sociau/vitrolas/ytb_link.png');
      root.style.setProperty('--youtubeHover', 'url(./assets/Images/sociau/vitrolas/ytb_hover.png');
      document.getElementById("quatreponchs")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_ponchs.png');
      document.getElementById("crotzsociau")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png')
      document.getElementById("crotzcredits")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png');
      document.getElementById("crotzsnippet")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png');
      document.getElementById("crotzfilms")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png');
      document.getElementById("crotzradio")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png');
      document.getElementById("crotzlyrics")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png');
      document.getElementById("crotzmag")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png');
      document.getElementById("crotzshop")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png');
      document.getElementById("crotzfriends")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png');
      document.getElementById("crotztour")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png');
      document.getElementById("crotzlive")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png');
      document.getElementById("crotzpro")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png');
      document.getElementById("crotz404")?.setAttribute('src', './assets/Images/crotzponchs/vitrolas_crotz.png');
    }
    if(theme=="salagon")
    {
      root.style.setProperty('--bgimg', 'url(./assets/Images/backgrounds/salagon.jpg)');
      root.style.setProperty('--bordFenetre', '#3b8b7f');
      root.style.setProperty('--typoPonchs', '#ffffff');
      root.style.setProperty('--fonsFenestra', 'url(./assets/Images/fonsfenestra/fenestra_salagon.jpg)');
      root.style.setProperty('--apple', 'url(./assets/Images/sociau/salagon/apple_link.png');
      root.style.setProperty('--appleHover', 'url(./assets/Images/sociau/salagon/apple_hover.png');
      root.style.setProperty('--bandcamp', 'url(./assets/Images/sociau/salagon/bc_link.png');
      root.style.setProperty('--bandcampHover', 'url(./assets/Images/sociau/salagon/bc_hover.png');
      root.style.setProperty('--facebook', 'url(./assets/Images/sociau/salagon/fb_link.png');
      root.style.setProperty('--facebookHover', 'url(./assets/Images/sociau/salagon/fb_hover.png');
      root.style.setProperty('--instagram', 'url(./assets/Images/sociau/salagon/insta_link.png');
      root.style.setProperty('--instagramHover', 'url(./assets/Images/sociau/salagon/insta_hover.png');
      root.style.setProperty('--soundcloud', 'url(./assets/Images/sociau/salagon/sound_link.png');
      root.style.setProperty('--soundcloudHover', 'url(./assets/Images/sociau/salagon/sound_hover.png');
      root.style.setProperty('--spotify', 'url(./assets/Images/sociau/salagon/spot_link.png');
      root.style.setProperty('--spotifyHover', 'url(./assets/Images/sociau/salagon/spot_hover.png');
      root.style.setProperty('--twitter', 'url(./assets/Images/sociau/salagon/twitter_link.png');
      root.style.setProperty('--twitterHover', 'url(./assets/Images/sociau/salagon/twitter_hover.png');
      root.style.setProperty('--youtube', 'url(./assets/Images/sociau/salagon/ytb_link.png');
      root.style.setProperty('--youtubeHover', 'url(./assets/Images/sociau/salagon/ytb_hover.png');
      document.getElementById("quatreponchs")?.setAttribute('src', './assets/Images/crotzponchs/salagon_ponchs.png');
      document.getElementById("crotzsociau")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png');
      document.getElementById("crotzcredits")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png');
      document.getElementById("crotzsnippet")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png');
      document.getElementById("crotzfilms")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png');
      document.getElementById("crotzradio")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png');
      document.getElementById("crotzlyrics")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png');
      document.getElementById("crotzmag")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png');
      document.getElementById("crotzshop")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png');
      document.getElementById("crotzfriends")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png');
      document.getElementById("crotztour")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png');
      document.getElementById("crotzlive")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png');
      document.getElementById("crotzpro")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png');
      document.getElementById("crotz404")?.setAttribute('src', './assets/Images/crotzponchs/salagon_crotz.png');
    }
    if(theme=="venturi")
    {
      root.style.setProperty('--bgimg', 'url(./assets/Images/backgrounds/venturi.jpg)');
      root.style.setProperty('--bordFenetre', '#b085cc');
      root.style.setProperty('--typoPonchs', '#3e4abb');
      root.style.setProperty('--fonsFenestra', 'url(./assets/Images/fonsfenestra/fenestra_venturi.jpg)');
      root.style.setProperty('--apple', 'url(./assets/Images/sociau/venturi/apple_link.png');
      root.style.setProperty('--appleHover', 'url(./assets/Images/sociau/venturi/apple_hover.png');
      root.style.setProperty('--bandcamp', 'url(./assets/Images/sociau/venturi/bc_link.png');
      root.style.setProperty('--bandcampHover', 'url(./assets/Images/sociau/venturi/bc_hover.png');
      root.style.setProperty('--facebook', 'url(./assets/Images/sociau/venturi/fb_link.png');
      root.style.setProperty('--facebookHover', 'url(./assets/Images/sociau/venturi/fb_hover.png');
      root.style.setProperty('--instagram', 'url(./assets/Images/sociau/venturi/insta_link.png');
      root.style.setProperty('--instagramHover', 'url(./assets/Images/sociau/venturi/insta_hover.png');
      root.style.setProperty('--soundcloud', 'url(./assets/Images/sociau/venturi/sound_link.png');
      root.style.setProperty('--soundcloudHover', 'url(./assets/Images/sociau/venturi/sound_hover.png');
      root.style.setProperty('--spotify', 'url(./assets/Images/sociau/venturi/spot_link.png');
      root.style.setProperty('--spotifyHover', 'url(./assets/Images/sociau/venturi/spot_hover.png');
      root.style.setProperty('--twitter', 'url(./assets/Images/sociau/venturi/twitter_link.png');
      root.style.setProperty('--twitterHover', 'url(./assets/Images/sociau/venturi/twitter_hover.png');
      root.style.setProperty('--youtube', 'url(./assets/Images/sociau/venturi/ytb_link.png');
      root.style.setProperty('--youtubeHover', 'url(./assets/Images/sociau/venturi/ytb_hover.png');
      document.getElementById("quatreponchs")?.setAttribute('src', './assets/Images/crotzponchs/venturi_ponchs.png');
      document.getElementById("crotzsociau")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png');
      document.getElementById("crotzcredits")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png');
      document.getElementById("crotzsnippet")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png');
      document.getElementById("crotzfilms")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png');
      document.getElementById("crotzradio")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png');
      document.getElementById("crotzlyrics")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png');
      document.getElementById("crotzmag")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png');
      document.getElementById("crotzshop")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png');
      document.getElementById("crotzfriends")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png');
      document.getElementById("crotztour")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png');
      document.getElementById("crotzlive")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png');
      document.getElementById("crotzpro")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png');
      document.getElementById("crotz404")?.setAttribute('src', './assets/Images/crotzponchs/venturi_crotz.png');
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
      this.init();
    }
    if ( windowid.id === "draggablemag" )
    {
      this.magView = true;
      this.magDimensions();
    }
    if ( windowid.id === "draggableradio" )
    {
      const players = document.querySelectorAll('audio');
      players.forEach(element =>
      {
          element.play();
      });
    }
    if ( windowid.id === "draggablelive" )
    {
      document.getElementById("palomasrc")?.setAttribute('src', 'https://www.youtube.com/embed/qEpcCirzkoo'+ '?autoplay=1');
    }
    if ( windowid.id === "draggablesnippet" )
    {
      document.getElementById("televisionsrc")?.setAttribute('src', 'https://www.youtube.com/embed/videoseries?list=PL81csO796eDB_jrvC1As4g4LHHxd7RYry');
    }
  }

  closewindow(windowid: any): void {
    windowid.classList.add('hide');
    if(windowid.id==="draggablefilms")
    {
      this.videoStopper(this);
    }
    if(windowid.id==="draggableradio")
    {
      const players = document.querySelectorAll('audio');
      players.forEach(element =>
      {
          element.pause();
      });
    }
    if(windowid.id==="draggablelive")
    {
      document.getElementById("palomasrc")?.setAttribute('src', '');
    }
    if(windowid.id==="draggablesnippet")
    {
      document.getElementById("televisionsrc")?.setAttribute('src', '');
    }
  }

  launchbook()
  {
    this.flipService.book = {
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
          {
            imageUrl: 'assets/Images/mag/mag_2.jpg',
          },
          {
            imageUrl: 'assets/Images/mag/mag_3.jpg',
          },
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
          {
            imageUrl: 'assets/Images/mag/mag_50.jpg',
          },
          {
            imageUrl: 'assets/Images/mag/mag_51.jpg',
          },
        ],
        pageWidth: 880,
        pageHeight: 1250,
        startPageType: PageType.Double,
        endPageType: PageType.Double
    } as Book;
  }
}

