import { useState } from "react";
import ToggleButton from 'react-bootstrap/ToggleButton';

export const AddFavs = ({ movieID, user, token, userFavIDs }) => {
    // const [checked, setChecked] = useState(checkedValue);
    var buttonText;
    // console.log(checkedValue);
    const [userFavs, setUserFavs] = useState(JSON.parse(userFavIDs));
    console.log("here " + JSON.stringify(userFavs));
    var checkedValue = false;
    if (userFavs.find(favMovie => favMovie == movieID)) {
        checkedValue = true;
    }
    const [checked, setChecked] = useState(checkedValue);

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

        if (checkBox.checked) {
            checkLabel.innerText = "Remove from Favorites";
            fetchMethod = "POST";
            action = "add";
        } else {
            checkLabel.innerText = "Add to Favorites";
            fetchMethod = "DELETE";
            action = "remove";
        }

        fetch("https://hidden-sea-19542.herokuapp.com/users/" + user.Username + "/movies/" + theID, {
            method: fetchMethod,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }).then((response) => {
            // console.log(response);
            if (response.ok) {
                console.log(action + ' ' + theID);
                if (action == "add") {
                    setUserFavs(userFavs.concat([theID]));
                }
                else if (action == "remove") {
                    setUserFavs(userFavs.filter((item) => item != theID));
                }
                localStorage.setItem("userFavIDs", JSON.stringify(userFavs));
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