import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    // Research React useMemo and determine
    // pros/cons and if it we be beneficial in this scenario
    useEffect(() => {
      const fetchAndFormatMovieMetadata = async () => {
        const URLS = [
          'https://hidden-sea-19542.herokuapp.com/movies',
          'https://hidden-sea-19542.herokuapp.com/directors',
          'https://hidden-sea-19542.herokuapp.com/genres',
        ];

        const fetcedhUrls = URLS.map(async (url) => {
          const resp = await fetch(url);
          return resp.json();
        });

        const [
          moviesData,
          directors,
          genres,
        ] = await Promise.all(fetcedhUrls);

        const moviesFromApi = moviesData.map((movie) => {
          const movieDirector = directors.find(({_id}) => _id ===  movie.Director[0]) || {};
          const movieGenre = genres.find(({_id}) => _id ===  movie.Genre[0]) || {};

          return {
              id: movie._id,
              title: movie.Title,
              director: movieDirector.Name,
              description: movie.Description,
              genre: movieGenre.Name
          };
        });

        setMovies(moviesFromApi);
      }
      fetchAndFormatMovieMetadata();
    }, []);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
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