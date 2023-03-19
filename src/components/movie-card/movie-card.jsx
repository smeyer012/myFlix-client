import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AddFavs } from "../add-favorites/add-favorites";
export const MovieCard = ({ movie, user, token, userFavIDs }) => {
    return (
        < Card className="h-100" >
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director}</Card.Text>
                <Card.Text>{movie.id}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button>
                        Open
                    </Button>
                </Link>
                <AddFavs
                    movieID={movie.id}
                    user={user}
                    token={token}
                    userFavIDs={userFavIDs}
                //storedFavs={storedFavs}
                />
            </Card.Body>
        </Card >
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        director: PropTypes.string
    }).isRequired
};