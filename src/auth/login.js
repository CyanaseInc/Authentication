import React from "react";
import { Input, Div, Image, Icon, Container, Button } from "atomize";
import "./auth.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Iconly } from "react-iconly";
import axios from "axios";

function Login() {
  // set states for th required components
  const [inputs, setInputs] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // on click submit state

  const myChange = <Icon color="white" name="Loading2" size="20px" />;
  const myOriginal = "Continue";
  const [buttonText, setButtonText] = useState(myOriginal);
  const [myText, SetText] = useState("Add details to login");
  const [ShowPassword, hidePassword] = useState(false);
  // handle on change in forms

  // states to handle user country cide
  const [countryCode, setCode] = "+256";

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };
  /// when a user starts typing phone number

  const [errorColor, setError] = useState("none");
  // handle submit function
  const onSubmit = (datal) => {
    /// Set the default error back to noramal
    SetText("Add details to continue");

    /// Set the error color back to default
    setError("none");
    // change the status to laoding
    setButtonText(myChange);

    // send data to the API

    const API_PATH = "https://api.cyanase.com/api/login.php";

    // MAKE AN AJAX REQUEST
    let dataz = JSON.stringify({ datal });

    axios({
      method: "POST",
      url: `${API_PATH}`,
      headers: { "content-type": "application/json" },
      data: dataz,
    })
      .then((result) => {
        const message = result.data.message;
        const stateMe = result.data.error;

        if (stateMe == 200) {
          setButtonText(myOriginal);
          SetText(message);
          setError("yes");
        } else if (message === "success") {
          const ID = result.data;

          localStorage.setItem("loginData", JSON.stringify(result.data));
          const xcxvxfsye = { qewwrueu: result.data.id };
          localStorage.setItem("loginID", JSON.stringify(xcxvxfsye));


          const win = document.getElementById("ifr").contentWindow;
          win.postMessage(ID, "https://platform.cyanase.com");

          setTimeout(() => {
            window.location.replace("https://platform.cyanase.com");
          }, 3000);
        }
      })
      .catch((error) => {
        setError("yes");
        SetText("Check your internet connection");
        setButtonText(myOriginal);
        console.log(error.data);
      });
  };

  return (
    <>
      <Div
        p="3rem"
        className="contact"
        m={{
          t: { xs: "10%", md: "3rem" },
        }}
        w={{ xs: "95%", md: "80vh" }}
        h={{ xs: "30rem", md: "auto" }}
      >
        <Div d="flex" align="center" justify="center">
          <Image
            d="inline-block"
            w={{ xs: "4rem", md: "7.7rem" }}
            src="img/vnm.png"
          />
        </Div>
        <Div m={{ t: "1rem" }} d="flex" justify="center">
          <p className={` ${errorColor === "none" ? "dey" : "deye"}`}>
            {myText}
          </p>
        </Div>
        <form className="myform" onSubmit={handleSubmit(onSubmit)}>
          <Div d="flex" justify="center" align="center">
            <Input
              rounded="circle"
              id="phone"
              w={{ xs: "18rem", md: "24rem" }}
              m={{ t: "2rem" }}
              {...register("phone", {
                required: true,
                minLength: 6,
                maxLength: 15,
              })}
              placeholder=" Phone number with code"
              onChange={handleChange}
              name="phone"
              type="tel"
              defaultValue="+256"
              p={{ x: "2.5rem" }}
              prefix={
                <Iconly
                  className="ivn"
                  name="User"
                  primaryColor={`#252859`}
                  set="bulk"
                  secondaryColor="orange"
                  stroke="bold"
                />
              }
            />
          </Div>
          <Div d="flex" justify="center">
            {errors.phone && (
              <p className="text-error">Your phone number is required</p>
            )}
          </Div>

          <Div d="flex" justify="center" align="center">
            <Input
              p={{ x: "2.5rem" }}
              rounded="circle"
              w={{ xs: "18rem", md: "24rem" }}
              m={{ t: "2rem" }}
              {...register("password", { required: true, maxLength: 55 })}
              placeholder="Enter your password"
              name="password"
              type={ShowPassword ? "text" : "password"}
              prefix={
                <Iconly
                  className="ivn"
                  name="Password"
                  primaryColor={`#252859`}
                  set="bulk"
                  secondaryColor="orange"
                  stroke="bold"
                />
              }
            />
          </Div>
          <Div d="flex" align="center" justify="center">
            {errors.password && (
              <p className="text-error">Your password is required</p>
            )}
          </Div>

          <p className="forgot">
            <NavLink to="/forgot">
              <a>Forgot password?</a>
            </NavLink>
          </p>
          <Div d="flex" justify="center">
            <Button
              type="submit"
              p="1rem"
              rounded="circle"
              align="center"
              shadow="3"
              hoverShadow="4"
              bg={`#252859`}
              m={{ t: "1rem" }}
              w={{ xs: "100%", md: "24rem" }}
            >
              {buttonText}
            </Button>
          </Div>
        </form>
        <span className="dont">
          Don't have an account?
          <a>
            {" "}
            <NavLink to="/signup">Sign Up</NavLink>
          </a>
        </span>
      </Div>
    </>
  );
}

export default Login;
