import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            Title: "The Silence of the Lambs",
            ImagePath:
                "https://m.media-amazon.com/images/I/411K6E7KRDL._AC_.jpg",
            Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
            Director: "Jonathan Demme",
            Genre: "Thriller"
        },
        {
            id: 2,
            Title: "Fight Club",
            ImagePath:
                "https://m.media-amazon.com/images/I/51D6HRAMBSL.jpg",
            Description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
            Director: "David Fincher",
            Genre: "Action"
        },
        {
            id: 3,
            Title: "Pulp Fiction",
            ImagePath:
                "https://m.media-amazon.com/images/I/5117V75KYYL._AC_.jpg",
            Description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
            Director: "Quentin Tarantino",
            Genre: "Action"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

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
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                    />
                ))}
            </div>
        );
    }
};