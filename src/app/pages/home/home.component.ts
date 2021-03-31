import { JsonpClientBackend } from '@angular/common/http';
import { JSDocCommentStmt } from '@angular/compiler';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueryService } from 'src/app/services/query.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // empty variable to be filled with online user name
  userName = '';
  userEmail = '';
  userData = {};
  // empty array for movies list
  movies = [];
  // loading flag 
  loading = true;
  // error flag 
  apiError = false;
  // empty array for our consuming
  moviesData = [];
  // boolean flag to show btns for like and fav
  showBtns = true;


  constructor(
    private router: Router,
    private http: QueryService
  ) { }

  ngOnInit() {



    // getting user name
    this.userEmail = localStorage.getItem('onlineUser');
    this.userData = JSON.parse(localStorage.getItem(this.userEmail));
    this.userName = this.userData['name'];

    // checking if user logine before or not
    if (!this.userData['moviesData']) {
      this.getAllMovies();
    } else {
      this.loading = false;
      this.moviesData = this.userData['moviesData'];
    }

  }

  // method to request movies list
  getAllMovies() {
    //prepare api headers
    const headers = {
      __site: 'popcornflix',
      __source: 'web',
      page: 0,
      pageSize: 20

    }
    this.http.getReq('https://api.unreel.me/v2/sites/popcornflix/channels/actionthrillers/movies', headers).subscribe(
      (res: any) => {

        // fill the empty array with data and stop loading flag
        this.movies = res.items;
        this.loading = false;

        this.movies.forEach((movie, index) => {
          this.moviesData.push({
            poster: movie.movieData.poster,
            title: movie.title,
            description: movie.description,
            fav: false,
            liked: false,
            id: index
          })
        });

        // add data to local storage
        this.userData['moviesData'] = this.moviesData;

        localStorage.setItem(this.userEmail, JSON.stringify(this.userData));

      },
      (err: any) => {
        // enable error flag and stop loading
        this.apiError = true;
        this.loading = false;
      }
    )
  }

  // method to handle the like or fav process
  likeFavUpdate(event, index) {
    if (event.target.id === 'unliked' || event.target.id === 'liked') {
      this.moviesData[index].liked = !this.moviesData[index].liked;
    }
    if (event.target.id === 'notfav' || event.target.id === 'fav') {
      this.moviesData[index].fav = !this.moviesData[index].fav;
    }
    this.userData['moviesData'] = this.moviesData;
    localStorage.setItem(this.userEmail, JSON.stringify(this.userData))

  }

  // method to filter movies
  filterMovies(event) {
    // disable the show btn in order to not affect the original local stored array
    this.showBtns = false;
    // get the movies from the original ocal stored array
    let StoredMovies = JSON.parse(localStorage.getItem(this.userEmail)).moviesData;
    this.moviesData = StoredMovies;
    if (event.target.id === 'liked') {
      this.moviesData = this.moviesData.filter(e => e.liked === true);
    }
    else if (event.target.id === 'fav') {
      this.moviesData = this.moviesData.filter(e => e.fav === true);
    } else {
      this.showBtns = true;
    }
  }
}
