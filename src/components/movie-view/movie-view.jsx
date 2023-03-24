import { useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { AddFavs } from "../add-favorites/add-favorites";
import "./movie-view.scss";

export const MovieView = ({ movies, user, token, userFavIDs, logFav }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);

    console.log("View - " + userFavIDs);

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
            <AddFavs
                movieID={movie.id}
                user={user}
                token={token}
                userFavIDs={userFavIDs}
                logFav={logFav}
            />
            <Link to={`/`}>
                <Button className="back-button">Back</Button>
            </Link>
        </div>
    );
};