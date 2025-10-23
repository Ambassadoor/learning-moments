import { IconButton, TextField, InputAdornment } from "@mui/material";
import { AccountBox, Login, Logout } from "@mui/icons-material";
import { useEffect, useState, useRef } from "react";
import { getUserByEmail } from "../../services/userService.js";

export const LoginOutButton = ({ currentUser, setCurrentUser }) => {
  const [loggingIn, setLoggingIn] = useState(false);
  const [email, setEmail] = useState("");
  const inputRef = useRef(null)

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleIconClick = () => {
  inputRef.current?.focus()
  handleLogIn()
  };

  /**
   * A simulated login handler
   */
  const handleLogIn = () => {
    getUserByEmail(email).then((res) =>
      typeof res !== "string"
        ? setCurrentUser(res[0])
        : window.alert("Invalid email"),
    );
  };

  useEffect(() => {
    currentUser.id !== undefined ? setLoggingIn(false) : "";
  }, [currentUser]);

  return (
    <>
      {currentUser.id === undefined ? (
        <IconButton
          aria-label="login"
          onClick={() => {
            setLoggingIn(true);
          }}
        >
          <div>Login</div>
          <Login></Login>
        </IconButton>
      ) : (
        <IconButton
          aria-label="logout"
          onClick={() => {
            setCurrentUser({});
            setEmail("");
          }}
        >
          <div>Logout</div>
          <Logout></Logout>
        </IconButton>
      )}
      {loggingIn ? (
        <>
          <TextField
            inputRef={inputRef}
            placeholder="Email"
            size="medium"
            onChange={(e) => handleInputChange(e)}

            slotProps={{
                input: {
                    endAdornment: (
                                    <InputAdornment position="end">
                <IconButton onClick={() => handleIconClick()}>
                    <AccountBox/>
                </IconButton>
            </InputAdornment>
                    )
                }
            }}
          >

          </TextField>
        </>
      ) : (
        ""
      )}
    </>
  );
};
