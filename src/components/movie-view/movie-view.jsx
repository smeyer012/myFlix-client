import { useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { AddFavs } from "../add-favorites/add-favorites";
import "./movie-view.scss";

export const MovieView = ({ user, token, userFavIDs, logFav }) => {

    const movies = useSelector((state) => state.movies);

    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);

    return (
        <div>
            <img className="movie-img" src={movie.image} />
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <div className="movie_info">
                <p><strong>Director:</strong> {movie.director}</p>
                <p><strong>Genre:</strong> {movie.genre}</p>
            </div>
            <AddFavs
                movieID={movie.id}
                user={user}
                token={token}
                userFavIDs={userFavIDs}
                logFav={logFav}
            />
            <Link to={`/`}>
                <Button className="back-button" variant="outline-secondary">Back</Button>
            </Link>
        </div>
    );
};