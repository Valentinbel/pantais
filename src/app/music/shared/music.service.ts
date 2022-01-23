// import { Injectable } from '@angular/core';
// import { ApiService } from './api.service';
// //import { HttpClient } from '@angular/common/http';
// //import { Observable, Subject, of } from 'rxjs';
// import { map , debounceTime, distinctUntilChanged } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class MusicService {

//   audio;

//   constructor ( private apiService: ApiService) { 
//     this.audio = new Audio();
//   }

//   load(url:any) {
//     this.audio.src = this.apiService.prepareUrl(url);
//     this.audio.load();
//   }

//   play(url:any) {
//     this.load(url);
//     this.audio.play()
//   }

//   getPlaylistTracks () {
//       //Request for a playlist via Soundcloud using a client id
//       return this.apiService.get('https//api.soundcloud.com/playlists/1295133985', true)// https//api.soundcloud.com/playlists/1019226721
//         .pipe(map((res:any) => res.json()))  // .pipe(map(res => res.json()))
//         .pipe(map(data => data.tracks));
//   }

//   randomTrack(tracks:any) {
//     const trackLength = tracks.length;
//     // Pick a random number
//     const randomNumber = Math.floor((Math.random() * trackLength) + 1);
//     // Return a random track
//     //return tracks;// 
//     return tracks[randomNumber];
//   }

//   formatTime(seconds:any) {
//     let minutes:any = Math.floor(seconds / 60);
//     minutes = (minutes >= 10) ? minutes : "0" + minutes;
//     seconds = Math.floor(seconds % 60);
//     seconds = (seconds >= 10) ? seconds : "0" + seconds;
//     return minutes + ":" + seconds;
//   }

//   findTracks(value:any) {
//     return this.apiService.get(`${this.apiService.prepareUrl('https://api.soundcloud.com/tracks')}&q=${value}`, false)
//       .pipe(debounceTime(300))
//       .pipe(distinctUntilChanged())
//       .pipe(map((res:any) => res.json()))
//   }

//   xlArtwork(url:any) {
//     return url.replace(/large/, 't500x500');
//   }
// }
