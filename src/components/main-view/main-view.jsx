import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";


export const MainView = () => {

    // const [movies, setMovies] = useState([]);
    const movies = useSelector((state) => state.movies.movies);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    const dispatch = useDispatch();

    const [userData] = useState([]);
    const [userFavIDs, setUserFavIDs] = useState([]);
    const [userFavMovies, setUserFavMovies] = useState([]);

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


        // setMovies(moviesFromApi);
        dispatch(setMovies(moviesFromApi));

        setUserFavIDs(userData.Favorites);

        var favIDs = userData.Favorites;

        const favList = moviesFromApi.map(movie => {
            if (favIDs.includes(movie.id)) {
                return movie;
            };
        });

        setUserFavMovies(favList);

    }

    async function logFav(id) {

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

    async function removeAcct() {

        if (window.confirm("Do you really want to delete your account? This cannot be undone.")) {

            const response = await fetch("https://hidden-sea-19542.herokuapp.com/users/" + user.Username, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

        }

    }

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
                <Container className="main_container">
                    <Row>
                        <Routes>
                            <Route
                                path="/login"
                                element={
                                    <>
                                        {user ? (
                                            <Navigate to="/" />
                                        ) : (
                                            <Row className="justify-content-md-center">
                                                <Col md={5} className="py-4 login">
                                                    <LoginView
                                                        onLoggedIn={(user, token) => {
                                                            setUser(user);
                                                            setToken(token);
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
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
                                            <Row className="justify-content-md-center">
                                                <Col md={5} className="py-4">
                                                    <SignupView />
                                                </Col>
                                            </Row>
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
                                            <>
                                                <ProfileView
                                                    user={user}
                                                    token={token}
                                                    userFavIDs={userFavIDs}
                                                    userFavMovies={userFavMovies}
                                                    logFav={logFav}
                                                    removeAcct={removeAcct}
                                                    onLoggedOut={() => {
                                                        setUser(null);
                                                        setToken(null);
                                                        setUserFavIDs([]);
                                                        localStorage.clear();
                                                    }}
                                                />
                                            </>
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
                                            <Row className="justify-content-md-center">
                                                <Col md={6}>
                                                    <MovieView
                                                        user={user}
                                                        token={token}
                                                        userFavIDs={userFavIDs}
                                                        logFav={logFav}
                                                    />
                                                </Col>
                                            </Row>
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
                                                    <Col md={4} xs={6} className="mb-4" key={movie.id}>
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
                </Container>
            </BrowserRouter>
        </>
    );
};