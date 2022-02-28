import React, { useState, useEffect } from "react";
import "./Register.css";
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

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");

  const history = useHistory();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) history.push("/");
  }, [history]);

  const [values, setValues] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = (value) => {
    if (value)
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    else
      setValues({
        ...values,
        showConfirmPassword: !values.showConfirmPassword,
      });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    const userDetail = {
      userName: name,
      email: email,
      password: password,
    };
    try {
      let res = await axios.post(
        "https://we-talks.herokuapp.com/api/user/register",
        {
          userName: name,
          email: email,
          password: password,
          password: password,
        }
      );
      console.log(res);
      if (res) {
        console.log(res.data);
        localStorage.setItem("userInfo", JSON.stringify(res.data));

        history.push("/chats");
      }
    } catch (e) {
      console.log(e);
    }
    console.log(userDetail);
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
        <h1>WE CHAT</h1>
      </Box>
      <Box
        className="Login_fields"
        sx={{
          flex: 1,
          bgcolor: "white",
          //   height: "30vh",
          margin: "10px",
          padding: "45px",
        }}
      >
        <TextField
          fullWidth
          id="standard-basic"
          label="Name *"
          value={name}
          variant="standard"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          id="standard-basic"
          label="Email *"
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
                  onClick={() => handleClickShowPassword(true)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password *"
          />
        </FormControl>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <FilledInput
            id="outlined-adornment-password"
            type={values.showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword(false)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showConfirmPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password *"
          />
        </FormControl>

        <Button variant="contained" onClick={(e) => handleSubmission(e)}>
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
