import React from "react";
import { useSelector } from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import { MoviesFilter } from "../movies-filter/movies-filter";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MoviesList = ({ user, token, userFavIDs, logFav }) => {
    const movies = useSelector((state) => state.movies.movies);
    const filter = useSelector((state) =>
        state.movies.filter).trim().toLowerCase();
    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(filter)
    );
    return (
        <>
            <Row className="movie-filter">
                <Col>
                    <MoviesFilter />
                </Col>
            </Row>
            <Row>
                {movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                ) : (
                    filteredMovies.map((movie) => (
                        <Col className="mb-4" key={movie.id} md={4} xs={6}>
                            <MovieCard
                                movie={movie}
                                user={user}
                                token={token}
                                userFavIDs={userFavIDs}
                                logFav={logFav}
                            />
                        </Col>
                    ))
                )}
            </Row>
        </>
    );
};