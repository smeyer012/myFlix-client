import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {

    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    const URLS = [
        'https://hidden-sea-19542.herokuapp.com/movies',
        'https://hidden-sea-19542.herokuapp.com/directors',
        'https://hidden-sea-19542.herokuapp.com/genres',
    ];

    const datafromAPI = async () => {

        const fetchedUrls = URLS.map(async (url) => {
            const resp = await fetch(url);
            return resp.json();
        });

        const [
            movies,
            directors,
            genres,
        ] = await Promise.all(fetchedUrls);

        const moviesFromApi = movies.map((movie) => {

            // const movieDirector = directors.find(({ _id }) => _id === movie.Director[0]) || {};
            let movieDirector, directorList, addDirectors = "";
            if (movie.Director.length == 1) {
                directorList = directors.find(({ _id }) => _id === movie.Director[0]).Name;
            }
            else {
                movie.Director.forEach((director) => {
                    movieDirector = directors.find(({ _id }) => _id === director);
                    addDirectors += movieDirector.Name + ', ';
                });
                directorList = addDirectors.replace(/, $/, '');
            }

            let movieGenre, genreList, addGenres = "";
            if (movie.Genre.length == 1) {
                genreList = genres.find(({ _id }) => _id === movie.Genre[0]).Name;
            }
            else {
                movie.Genre.forEach((genre) => {
                    movieGenre = genres.find(({ _id }) => _id === genre);
                    addGenres += movieGenre.Name + ', ';
                });
                genreList = addGenres.replace(/, $/, '');
            }

            return {
                id: movie._id,
                title: movie.Title,
                director: directorList,
                description: movie.Description,
                genre: genreList
            };
        });

        setMovies(moviesFromApi);
    }

    useEffect(() => {
        datafromAPI();
    }, []);

    if (selectedMovie) {
        return (
            <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
            />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    } else {
        return (
            <div>
                {
                    movies.map((movie) => (
                        <MovieCard
                            key={movie._id}
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }}
                        />
                    ))
                }
            </div>
        );
    }
};