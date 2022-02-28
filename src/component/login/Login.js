import React, { useState, useEffect } from "react";
import "./Login.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import axios from "axios";
import { useHistory } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const users = JSON.parse(localStorage.getItem("userInfo"));
  console.log(users);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) history.push("/");
  }, [history]);

  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmission = async (e) => {
    e.preventDefault();
    const userDetail = {
      email: email,
      password: password,
    };
    console.log(userDetail);
    try {
      let res = await axios.post("http://localhost:5000/api/user/login", {
        email: email,
        password: password,
      });
      console.log(res);
      if (res) {
        console.log(res.data);
        localStorage.setItem("userInfo", JSON.stringify(res.data));

        history.push("/chats");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container
      maxWidth="sm"
      sx={{ padding: "45px" }}
      className="login_container"
    >
      <Box
        sx={{
          bgcolor: "white",
          height: "5vh",
          margin: "10px",
          padding: "15px",
        }}
      >
        WE CHAT
      </Box>
      <Box
        className="Login_fields"
        sx={{
          flex: 1,
          bgcolor: "white",
          height: "30vh",
          margin: "10px",
          padding: "25px",
        }}
      >
        <TextField
          fullWidth
          id="standard-basic"
          label="Email"
          value={email}
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <FilledInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button variant="contained" onClick={(e) => handleSubmission(e)}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
