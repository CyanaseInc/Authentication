import React from 'react';
import { Input, Div, Image, Icon, Container, Button } from "atomize";
import './auth.css';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Iconly } from "react-iconly";

function Login() {

    // set states for th required components
    const [inputs, setInputs] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm();

    // on click submit state

    const myChange = <Icon color="white" name="Loading2" size="20px" />;
    const myOriginal = 'Continue';
    const [buttonText, setButtonText] = useState(myOriginal);

    // handle on change in forms
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    /// when a user starts typing phone number

    const handleKeyPress = (event) => {
        const phoneno = document.getElementById('phone').value;
        const firsttext = phoneno[0];

        if (firsttext === "0") {
            const newNumber = phoneno.replace(firsttext, "+256" + "");

            phoneno(newNumber);

        } else if (firsttext === "7") {

            const newNumber = phoneno.replace(firsttext, "+2567" + "");

            phoneno(newNumber);

        }

    }

    // handle submit function
    const onSubmit = (datal) => {

        // change the status to laoding
        setButtonText(myChange);
        console.log(datal);

        // send data to the API

        const API_PATH = 'http://localhost:3000/handler.php';

        // MAKE AN AJAX REQUEST

        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: datal
        })
            .then(resulta => {

                console.log(resulta.result);
            })
            .catch(error => alert(error));
    }

    return (


        <>

            <Div className="auth"
                textColor="black900"
                minH="100vh"

                d="flex"
                flexDir="column"
                justify="center"
                align="center"
                textSize="display2"
                textWeight="500"
                p={{ x: "1rem", y: "4rem" }}
            >


                <Div className="contact" bg={`#fff`}
                    w={{ xs: '80%', md: '80vh' }} h={{ xs: 'auto', md: 'auto' }} p={{ x: "1rem", y: "1rem" }}
                    align="center"
                    shadow="4">

                    <Container>
                        <Image m={{ t: "2rem", l: "37%" }} d="inline-block" w={{ xs: '4rem', md: '7.7rem' }} src="img/vnm.png" />

                        <form className="myform" onSubmit={handleSubmit(onSubmit)}>

                            <Image m={{ l: "45%" }} w={{ xs: '3rem', md: '3.7rem' }} bg={`#252859;`} src="img/login.jpg" />
                            <p className='dey'>Add details to login</p>
                            <Div

                                d="flex"
                                flexDir="column"
                                justify="center"
                                align="center">

                                <Input id="phone" onKeyPress={handleKeyPress} w={{ xs: '100%', md: '24rem' }} m={{ t: "2rem" }} {...register("phone", { required: true, maxLength: 15 })}
                                    placeholder="Enter your Phone number" onChange={handleChange} name="phone" type="tel"

                                    p={{ x: "2.5rem" }}
                                    prefix={
                                       
                                        <Iconly
                                            className="ivn"
                                            name="User"
                                            primaryColor={`#252859`}
                                            set='bulk'
                                            secondaryColor='orange'
                                            stroke='bold'
                                        />
                                    }
                                />

                                {errors.phone && <p className="text-error">Your phone number is required</p>}

                                <Input  p={{ x: "2.5rem" }}
                                    w={{ xs: '100%', md: '24rem' }} m={{ t: "2rem" }}   {...register("password", { required: true, maxLength: 55 })}
                                    placeholder="Enter your password"  name="password" type="password"

                                    prefix={
                                       
                                        <Iconly
                                            className="ivn"
                                            name="Password"
                                            primaryColor={`#252859`}
                                            set='bulk'
                                            secondaryColor='orange'
                                            stroke='bold'
                                        />
                                    }
                                />             {errors.password && <p className="text-error">Your password is required</p>}
                                <p className="forgot"><NavLink to="/forgot"><a>Forgot password?</a></NavLink></p>
                                <Button type='submit'
                                    align="center"
                                    shadow="3"
                                    hoverShadow="4"
                                    bg={`#252859`}
                                    m={{ t: "1rem" }}
                                    w={{ xs: '100%', md: '24rem' }}
                                >
                                    {buttonText}
                                </Button>
                                <span className='dont'>Don't have an account?<a>  <NavLink to="/signup" >
                                    Sign Up
                                </NavLink></a></span>
                            </Div>



                        </form>
                        <Div></Div>

                    </Container>
                </Div>
            </Div>

        </>
    );
}




export default Login;
