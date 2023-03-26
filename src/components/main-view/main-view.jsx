import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { objectOf } from "prop-types";


export const MainView = () => {

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    // const storedFavs = JSON.parse(localStorage.getItem("userFavIDs"));
    const [userData] = useState([]);
    const [userFavIDs, setUserFavIDs] = useState([]);

    // console.log("stored " + storedFavs);
    // console.log("main 1 " + userFavIDs);

    const URLS = [
        'https://hidden-sea-19542.herokuapp.com/movies',
        'https://hidden-sea-19542.herokuapp.com/directors',
        'https://hidden-sea-19542.herokuapp.com/genres'
    ];

    if (user) {
        URLS.push('https://hidden-sea-19542.herokuapp.com/users/' + user.Username);
    }

    const datafromAPI = async () => {

        const fetchedUrls = URLS.map(async (url) => {
            const resp = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return resp.json();
        });

        const [
            movies,
            directors,
            genres,
            userData
        ] = await Promise.all(fetchedUrls);

        const getList = (movie, typeProp, typeArray) => {
            let listItem, printList, buildList = "";
            if (movie[typeProp].length == 1) {
                printList = typeArray.find(({ _id }) => _id === movie[typeProp][0]).Name;
            }
            else {
                movie[typeProp].forEach((itemID) => {
                    listItem = typeArray.find(({ _id }) => _id === itemID);
                    buildList += listItem.Name + ', ';
                });
                printList = buildList.replace(/, $/, '');
            }
            return printList;
        }

        const moviesFromApi = movies.map((movie) => {

            let movieDirectors = getList(movie, "Director", directors);
            let movieGenres = getList(movie, "Genre", genres);

            return {
                id: movie._id,
                title: movie.Title,
                director: movieDirectors,
                description: movie.Description,
                genre: movieGenres,
                image: movie.ImagePath
            };
        });

        setMovies(moviesFromApi);

        // userFavIDs = userData.Favorites;
        // var userFavMovies = []

        // userFavIDs.forEach((favMovie) => {
        //     var favObj = movies.find(movie => movie._id == favMovie);
        //     userFavMovies.push(favObj)
        // });

        // userFavIDs = JSON.stringify(userData.Favorites);
        setUserFavIDs(userData.Favorites);

    }

    async function logFav(id) {
      /* 
      Example of way to do this in memory.
      Can you think of a way to optimize this code to run in batches using localStorage as an intermediary data structure?

      const updatedUserFavIds = userFavIDs.includes(id) 
        ? userFavIDs.filter((currId) => currId !== id) 
        : [...userFavIDs, id];
      setUserFavIDs(updatedUserFavIds); 
      */

      const isFavorite = userFavIDs.includes(id);
      const method = isFavorite ? "DELETE" : "POST";

      const response = await fetch("https://hidden-sea-19542.herokuapp.com/users/" + user.Username + "/movies/" + id, {
          method,
          headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token
          }
      })

      datafromAPI();
    }

    console.log("main 2 " + userFavIDs);

    useEffect(() => {
        if (!token) {
            return;
        }
        datafromAPI();
    }, [token]);

    return (
        <>
            <BrowserRouter>
                <NavigationBar
                    user={user}
                    onLoggedOut={() => {
                        setUser(null);
                        setToken(null);
                        setUserFavIDs([]);
                        localStorage.clear();
                    }}
                />
                <Row className="justify-content-md-center">
                    <Routes>
                        <Route
                            path="/login"
                            element={
                                <>
                                    {user ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Col md={5} className="py-4">
                                            <LoginView
                                                onLoggedIn={(user, token) => {
                                                    setUser(user);
                                                    setToken(token);
                                                }}
                                            />
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <>
                                    {user ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Col md={5} className="py-4">
                                            <SignupView />
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" />
                                    ) : (
                                        <Col md={5} className="py-4">
                                            <ProfileView
                                                user={user}
                                                token={token}
                                                movies={movies}
                                                userFavIDs={userFavIDs}
                                            />
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/movies/:movieId"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : movies.length === 0 ? (
                                        <Col>The list is empty!</Col>
                                    ) : (
                                        <Col md={6}>
                                            <MovieView
                                                movies={movies}
                                                user={user}
                                                token={token}
                                                userFavIDs={userFavIDs}
                                                logFav={logFav}
                                            />
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : movies.length === 0 ? (
                                        <Col>The list is empty!</Col>
                                    ) : (
                                        <>
                                            {movies.map((movie) => (
                                                <Col md={4} className="mb-4" key={movie.id}>
                                                    <MovieCard
                                                        movie={movie}
                                                        user={user}
                                                        token={token}
                                                        userFavIDs={userFavIDs}
                                                        logFav={logFav}
                                                    />
                                                </Col>
                                            ))}
                                        </>
                                    )}
                                </>
                            }
                        />
                    </Routes>
                </Row>
            </BrowserRouter>
        </>
    );
};