import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
//import Test from './Test/Test';
import Router from './Router/Router';
import User from './Pages/User.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<User />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

//<<<<<<<TO DO LIST>>>>>>>>>>

//When adding film/tv/anime search using IMDB OR MAl database.
//retrieve them values and use that to display photo
//and the respective databases' photo and ratings

//Page transition

//??Do I need comment section.
//If yes research inline edting for comment.Might need to add that(contenteditable)

//A Netflix availability field on table.
//Maybe only will watch section

//When you click on a value redirect you to page
//showing further info

//So for now we must finish frontend design
//and imdb/MAL api connection

//after all that a login page

//Frontend
//IMDB page

//Backend
//Later on we must store values for each user
//Authenticate google and use user id from google to store their data

//Store info
