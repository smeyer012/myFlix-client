import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);
    console.log(movies);
    return (
        <div>
            <img className="movie-img" src={movie.image} />
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <div>
                <span>Director: </span>
                <span>{movie.director}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre}</span>
            </div>
            <Link to={`/`}>
                <Button className="back-button">Back</Button>
            </Link>
        </div>
    );
};