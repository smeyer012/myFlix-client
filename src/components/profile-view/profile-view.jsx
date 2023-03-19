import { useState } from "react";
import moment from "moment";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const ProfileView = ({ user, token }) => {

    // let userName = user.Username;
    // let userPW = "passwordplaceholder";
    // let userEM = user.Email;
    // let userBD = moment(user.Birthday).utc().format('yyyy-MM-DD');

    // console.log(user);

    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(moment(user.Birthday).utc().format('yyyy-MM-DD'));

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
            Favorites: favorites
        };

        fetch("https://hidden-sea-19542.herokuapp.com/users/" + user.Username, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }).then((response) => {
            console.log(response);
            if (response.ok) {
                alert("Update successful");
                localStorage.setItem("user", JSON.stringify(data));
                window.location.reload();
            } else {
                alert("Update failed");
            }
        });

    };

    return (
        <Card>
            <Card.Body>
                <h2>Your Profile</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formAddUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="3"
                        />
                    </Form.Group>

                    <Form.Group controlId="formAddPassword">
                        <Form.Label>New Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            autoComplete="newpassword"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formAddEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formAddBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) =>
                                setBirthday(e.target.value)
                            }
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Update Profile
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );

};