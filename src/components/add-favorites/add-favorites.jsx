import { useState } from "react";
import ToggleButton from 'react-bootstrap/ToggleButton';

export const AddFavs = ({ movieID, logFav, userFavIDs }) => {

    const isFavorite = userFavIDs.includes(movieID)
    const buttonText = isFavorite ? "Remove from Favorites" : "Add to Favorites";

    return (
        <>
            <div id={movieID}>
                <ToggleButton
                    id={"toggle-" + movieID}
                    name="addtofavs"
                    type="checkbox"
                    variant="secondary"
                    checked={isFavorite}
                    value="1"
                    onChange={(e) => {
                        logFav(movieID);
                    }}
                >
                    {buttonText}
                </ToggleButton>
            </div>
        </>
    );

};