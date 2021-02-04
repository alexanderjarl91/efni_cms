import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./styles/login.css";
import matterLogoDark from "../images/logo_dark.svg";

//getting props
export default function Login({
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  handleLogin,
  handleSignup,
  hasAccount,
  setHasAccount,
  emailError,
  passwordError,
}) {
  //styling

  return (
    <div className="loginContainer">
      <img src={matterLogoDark} />
      {hasAccount ? (
        <div>
          {/* <h1>Log in</h1> */}
          <p className="loginText">Log in</p>
        </div>
      ) : (
        <div>
          {/* <h1>Sign up</h1> */}
          <p className="loginText">Sign up</p>
          <TextField
            style={{ color: "white" }}
            id="outlined-basic"
            autoFocus
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              console.log(name);
            }}
            label="Name"
            style={{ width: "100%" }}
          ></TextField>
        </div>
      )}
      <TextField
        id="outlined-basic"
        autoFocus
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
      ></TextField>
      <p className="errorMsg">{emailError}</p>

      <TextField
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="outlined-basic"
        label="Password"
      ></TextField>
      <p className="errorMsg">{passwordError}</p>

      <div className="btnContainer">
        {/* render different stuff depending if user has account or not */}

        {hasAccount ? (
          <div>
            <Button type="submit" color="primary" onClick={handleLogin}>
              Log in
            </Button>
            <p className="footerText">
              Don't have an account?{" "}
              <Button onClick={() => setHasAccount(!hasAccount)}>
                Sign up
              </Button>
            </p>
          </div>
        ) : (
          <div>
            <Button type="submit" color="primary" onClick={handleSignup}>
              Sign Up
            </Button>
            <p>
              Already have an account?{" "}
              <Button onClick={() => setHasAccount(!hasAccount)}>
                Click here
              </Button>
            </p>
          </div>
        )}
      </div>
    </div>
    // </form>
  );
}
