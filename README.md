![Image of project image](https://s3.amazonaws.com/poly-screenshots.angel.co/Project/8f/1016586/290e88cce630907000c22eed24ac7626-original.png)

Small project so users can make a list of movies,anime and TV shows you want to watch and a list storing their personal ratings for one you have watched.

Built using:
* ReactJS
* HTML5 / CSS5
* Google Firebase
* React Router

# ReactJS
  This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). I made use of React Hooks and Context API, two of the new features in ReactJS 16x. Below I've detailed how I used the two features in this project.
## React Hooks
  State Hook:
  Ive used the state hook for controlled forms during authentication and when adding new data to the database
  Effect Hook:
  In order to bind data from the Firebase database, we used to useEffect feature to  to stay up to data with the databse
## Context API
  "Context provides a way to pass data through the component tree without having to pass props down manually at every level."- Facebook.
  Used Context API to share page location and user status throughout the app structure

# Firebase
## Firebase Authentication
  Using Firebase Authentication, the users' login details is stored by Firebase during the signing up process and using Firebase queries, that information is relayed to Firebase. Similarly I used Firebase queries to use the login details typed in by the user(stored in the state using React Hooks) and authenticate the user. When the user is authenticated, using Context Api, we change the global state to allow user to proceed.
 
## Firestore Database
  Firestore Database was used to store the various lists of the user. Firestore queries were used when new data was to be added. 
  
## Firestore Security Rules
"Context provides a way to pass data through the component tree without having to pass props down manually at every level."- Facebook.
Used Context API to share page location and user status throughout the app structure

