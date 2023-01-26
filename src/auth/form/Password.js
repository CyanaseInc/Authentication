import React from 'react';
import { Input, Div, Image, Icon, Container, Button, Row, Col } from "atomize";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, } from "react-router-dom";
import { Iconly } from "react-iconly";
import axios from 'axios';

const Password = ({ nextStep, handleFormData, prevStep, }) => {

    // set states for th required components
    const [inputs, setInputs] = useState({});

    const { register, handleSubmit, formState: { errors } } = useForm();

    // on click submit state

    const myChange = <Icon color="white" name="Loading2" size="20px" />;
    const myOriginal = 'Continue';
    const [buttonText, setButtonText] = useState(myOriginal);
    const [myText, SetText] = useState("Secure your account");
    // handle on change in forms

    // states to handle user country cide
    const [countryCode, setCode] = ("");

    const handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;
        if (value[0] === "0") {
            setCode("+256");

        }
        setInputs(values => ({ ...values, [name]: value }))

    }
    /// when a user starts typing phone number

    const [errorColor, setError] = useState("none");
    // handle submit function
    const onSubmit = (datal) => {

        const P = datal.password;
        const C = datal.cpassword;

       
if(P===C){

 
    const pass = { "password": P };
    localStorage.setItem('Password', JSON.stringify(pass));
    /// Set the default error back to noramal

    /// Set the error color back to default
    setError("none");
    // change the status to laoding
    setButtonText(myChange);
    nextStep();
}else{

    setError("yes");
    setButtonText(myOriginal);
    SetText("Password don't match");
}
       



        // send data to the API




    }

    return (


        <>




            <form className="myform" onSubmit={handleSubmit(onSubmit)}>
                <Div d="flex"  justify="center">
                    <Image w={{ xs: '3rem', md: '3.7rem' }} bg={`#252859;`} src="img/signup.jpg" />

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

                    <Input p={{ x: "2.5rem" }} rounded="circle"
                        w={{ xs: '18rem', md: '24rem' }} m={{ t: "2rem" }}   {...register("password", { required: true, maxLength: 55 })}
                        placeholder="Enter your password" name="password" type="password"
                        nChange={handleChange}
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

                    <Input p={{ x: "2.5rem" }} rounded="circle"
                        w={{ xs: '18rem', md: '24rem' }} m={{ t: "2rem" }}
                        {...register("cpassword", { required: true, maxLength: 55 })}
                        placeholder="confirm your password" name="cpassword" type="password"
                        nChange={handleChange}
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
                    />             {errors.cpassword && <p className="text-error">Your password is required</p>}

                    <Row>
                        <Col>
                            <Button onClick={prevStep}
                             rounded="circle"
                                align="center"
                                shadow="3"
                                hoverShadow="4"
                                bg={`#252859`}
                                m={{ t: "1rem" }}
                                w={{ xs: 'aut', md: 'auto' }}
                            >
                                Previous
                            </Button>
                        </Col>
                        <Col>
                            <Button type='submit' rounded="circle"
                                align="center"
                                shadow="3"
                                hoverShadow="4"
                                bg={`#252859`}
                                m={{ t: "1rem" }}
                                w={{ xs: 'auto', md: 'auto' }}
                            >
                                {buttonText}
                            </Button>
                        </Col>
                    </Row>
                    <span className='dont'>Don't have an account?<a>  <NavLink to="/signup" >
                        Sign Up
                    </NavLink></a></span>
                </Div>



            </form>



        </>
    );
}




export default Password;
