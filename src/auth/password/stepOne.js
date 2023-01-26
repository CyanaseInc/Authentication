import React from 'react';
import { Text, Input, Div, Row, Col, Anchor, Image, Icon, Container, Button } from "atomize";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink } from "react-router-dom";


function Forgot({ nextStep }) {

    // set states for th required components
    const [inputs, setInputs] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm();

    // on click submit state

    const myChange = <Icon color="white" name="Loading2" size="20px" />;
    const myOriginal = 'Continue';
    const [buttonText, setButtonText] = useState(myOriginal);
    const [myText, SetText] = useState("Change password");
    const [errorColor, setError] = useState("none");
    const [Code, setCode] = useState(Math.round(Math.random() * (900000 - 99999) + 1000));
    // handle on change in forms

    // hnadle on change in forms
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    /// when a user starts typing phone number


    // handle submit function
    const onSubmit = (datal) => {

        // change the status to laoding
        setButtonText(myChange);
        // send data to the API
       
        const API_PATH = 'https://api.cyanase.com/api/check_email.php';

        // MAKE AN AJAX REQUEST

        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: datal
        })
            .then(resulta => {

                if (resulta.data.code === "100") {


                    const MyCode = { "code": Code };
                    localStorage.setItem('Code', JSON.stringify(MyCode));
                    localStorage.setItem('email', JSON.stringify(datal));
                    const EMAIL_PATH = 'https://cyanase.com/savers/email/api_send_password_recover.php';

                    axios({
                        method: 'POST',
                        url: `${EMAIL_PATH}`,
                        headers: { 'content-type': 'application/json' },
                        data: { email: datal.email, code: Code }
                    })
                        .then(result => {
                            console.log(result.data);
                            nextStep();


                        })
                        .catch(error => {
                            setError("yes");
                            SetText("Check your internet connection");
                            setButtonText(myOriginal);
                            console.log(error.data)
                        }
                        );

                } else {

                    setError("Yes");
                    SetText("Account not found check your email address");
                    setButtonText(myOriginal);
                }
            })
            .catch(error => {
                setError("yes");
                SetText("Check your internet connection");
                setButtonText(myOriginal);
                console.log(error.data)
            }
            );
    }

    return (


        <>
        
            <form className="myform" onSubmit={handleSubmit(onSubmit)}>

                <Div d="flex" align="center" justify="center">
                    <Image
                        w={{ xs: '3rem', md: '3.7rem' }}
                        bg={`#252859;`} src="img/login.jpg" />

                </Div>
                <Div d="flex" justify="center">
                    <p className={` ${errorColor === "none" ? 'dey' : 'deye'}`}>
                        {myText}
                    </p>
                </Div>
                <Div

                    d="flex"
                    flexDir="column"
                    justify="center"
                    align="center">

                    <Input w={{ xs: '18rem', md: '24rem' }} m={{ t: "2rem" }}
                        rounded="circle"
                        {...register("email", { required: true, maxLength: 55, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                        placeholder="Email address" onChange={handleChange} name="email" type="text"

                        p={{ x: "2.5rem" }}
                        prefix={
                            <Icon
                                name="Email"
                                color="warning800"
                                size="16px"
                                cursor="pointer"
                                pos="absolute"
                                top="50%"
                                left="0.75rem"
                                transform="translateY(-50%)"
                            />
                        }
                    />
                    {errors.email && <p className="text-error">Please enter the right email address</p>}

                    <Button type='submit'

                        align="center"
                        shadow="3" rounded="circle"
                        hoverShadow="4"
                        bg={`#252859`}
                        m={{ t: "1rem" }}
                        w={{ xs: '18rem', md: '24rem' }}
                    >
                        {buttonText}
                    </Button>

                </Div>

            </form>
            <Div></Div>




        </>
    );
}




export default Forgot;
