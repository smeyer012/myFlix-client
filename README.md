# myFlix - movie front-end app

## Purpose

This project is a single-page app built with React components and utilizes Parcel, source routing, Bootstrap, and Redux. It serves as the front-end user interface for the movie REST API that I created in the previous project and demonstrates my experience with full-stack (MERN) Javascript development. The app displays movie data, filters movies by title, and allows for the creation of user accounts to log in and save favorites.

## Requirements

Main view
- Returns ALL movies to the user (each movie item with an image, title, and description)
- Filtering the list of movies with a “search” feature
- Ability to select a movie for more details
- Ability to log out
- Ability to navigate to Profile view

Single Movie view
- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites

Login view
- Allows users to log in with a username and password

Signup view
- Allows new users to register (username, password, email, date of birth)

Profile view
- Displays user registration details
- Allows users to update their info (username, password, email, date of birth)
- Displays favorite movies
- Allows users to remove a movie from their list of favorites
- Allows existing users to deregister

## Setup

Initiate transpilation with the following command executed from the project directory:
parcel src/index.html