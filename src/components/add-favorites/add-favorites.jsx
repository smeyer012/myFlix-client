import { useState } from "react";
import ToggleButton from 'react-bootstrap/ToggleButton';

export const AddFavs = ({ movieID, logFav, userFavIDs }) => {
    var buttonText;
    console.log("Favs - " + userFavIDs);
    // console.log("before " + JSON.parse(userFavIDs));
    // const [userFavs, setUserFavs] = useState(JSON.parse(userFavIDs));

    // var checkedValue = false;
    // if (userFavs.find(favMovie => favMovie == movieID)) {
    //     checkedValue = true;
    // }
    // const [checked, setChecked] = useState(checkedValue);

    // if (checkedValue) {
    //     buttonText = "Remove from Favorites";
    // } else {
    //     buttonText = "Add to Favorites";
    // }

    return (
        <>
            <div id={movieID}>
                <ToggleButton
                    // className="mb-2"
                    id={"toggle-" + movieID}
                    name="addtofavs"
                    type="checkbox"
                    variant="secondary"
                    checked={checked}
                    value="1"
                    onChange={(e) => {
                        checkedValue = e.currentTarget.checked;
                        setChecked(checkedValue);
                        logFav(movieID);
                    }}
                >
                    {buttonText}
                </ToggleButton>
            </div>
        </>
    );

};