import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    const URLS = [
        'https://hidden-sea-19542.herokuapp.com/movies',
        'https://hidden-sea-19542.herokuapp.com/directors',
        'https://hidden-sea-19542.herokuapp.com/genres',
    ];

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
    }

    useEffect(() => {
        if (!token) {
            return;
        }
        datafromAPI();
    }, [token]);

    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <>
                    <Col md={5}>
                        <LoginView
                            onLoggedIn={(user, token) => {
                                setUser(user);
                                setToken(token);
                            }}
                        />
                    </Col>
                    <Col md={1}></Col>
                    <Col md={5}>
                        <SignupView />
                    </Col>
                </>
            ) : selectedMovie ? (
                <Col md={6}>
                    <MovieView
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)}
                    />
                </Col>
            ) : movies.length === 0 ? (
                <>
                    <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
                    <p>The list is empty!</p>
                </>
            ) : (
                <>
                    <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
                    {
                        movies.map((movie) => (
                            <Col md={4} className="mb-4">
                                <MovieCard
                                    key={movie._id}
                                    movie={movie}
                                    onMovieClick={(newSelectedMovie) => {
                                        setSelectedMovie(newSelectedMovie);
                                    }}
                                />
                            </Col>
                        ))
                    }
                </>
            )}
        </Row>
    );
};