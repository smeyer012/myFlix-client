import { useState } from "react";
import ToggleButton from 'react-bootstrap/ToggleButton';

export const AddFavs = ({ movieID, user, token, checkedValue }) => {
    const [checked, setChecked] = useState(checkedValue);
    const storedFavs = localStorage.getItem("checkedFav");
    var buttonText;

    if (checkedValue) {
        buttonText = "Remove from Favorites";
    } else {
        buttonText = "Add to Favorites";
    }

    function logFav(theID) {
        var checkBoxGroup = document.getElementById(theID);
        var checkBox = checkBoxGroup.getElementsByTagName("input").item(0);
        var checkLabel = checkBoxGroup.getElementsByTagName("label").item(0);
        var fetchMethod;

        console.log(checkBox.checked);

        if (checkBox.checked) {
            checkLabel.innerText = "Remove from Favorites";
            fetchMethod = "POST";
        } else {
            checkLabel.innerText = "Add to Favorites";
            fetchMethod = "DELETE";
        }

        fetch("https://hidden-sea-19542.herokuapp.com/users/" + user.Username + "/movies/" + theID, {
            method: fetchMethod,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }).then((response) => {
            console.log(response);
            if (response.ok) {
                return;
            } else {
                alert("Update failed");
            }
        });

    }

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
                        setChecked(e.currentTarget.checked);
                        logFav(movieID);
                    }}
                >
                    {buttonText}
                </ToggleButton>
            </div>
        </>
    );

};