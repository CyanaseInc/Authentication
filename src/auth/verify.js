import React from 'react';
import { Text, Input, Div, Row, Col, Anchor, Image, Icon, Container, Button } from "atomize";
import './auth.css';
import { useState } from "react";
import { useForm } from "react-hook-form";
import Signup from "./signup";
import { NavLink } from "react-router-dom";


function   Verify() {

    // set states for th required components
    const [inputs, setInputs] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm();

    // on click submit state

    const myChange = <Icon color="white" name="Loading2" size="20px" />;
    const myOriginal = 'Continue';
    const [buttonText, setButtonText] = useState(myOriginal);

    // hnadle on change in forms
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

        const API_PATH = 'https://api.cyanase.com:3000/handler.php';

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
                fontFamily="secondary"
                textWeight="500"
                p={{ x: "1rem", y: "4rem" }}
            >


                <Div className="contact" bg={`#fff`} 
                    w={{ xs: '80%', md: '80vh' }} h={{ xs: 'auto', md: 'auto' }}     p={{ x: "1rem", y: "4rem" }}
align="center"
                    shadow="4">

                    <Container>
                        <Image m={{ t: "2rem", l: "37%" }} d="inline-block" w={{ xs: '4rem', md: '7.7rem' }} src="img/vnm.png" />

                        <form className="myform" onSubmit={handleSubmit(onSubmit)}>
                          
                            <p className='dey'>Verify  your account</p>
                            <Div

                                d="flex"
                                flexDir="column"
                                justify="center"
                                align="center">

<Input w={{ xs: '100%', md: '24rem' }} m={{ t: "2rem" }}   {...register("code", { required: true, maxLength: 55,  })}
                    placeholder="Verification code" onChange={handleChange} name="code" type="text"

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
                  {errors.code && <p className="text-error">Please enter verification code</p>}

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
                               
                            </Div>
                        </form>
                        <Div></Div>

                    </Container>
                </Div>
            </Div>

        </>
    );
}




export default Verify;
