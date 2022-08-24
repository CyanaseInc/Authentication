import React, { useState } from "react";
import { Text, Input, Div, Row, Col, Anchor, Icon, Container, Button, Image } from "atomize";
import validator from "validator";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";



// creating functional component ans getting props from app.js and destucturing them
const StepOne = ({ nextStep, handleFormData, values }) => {


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

    // handle submit function
    const onSubmit = (e) => {

        // change the status to loading
        setButtonText(myChange);
        // load net step

        nextStep();
    }
    //creating error state for validation
    const [error, setError] = useState(false);


    return (
        <>

            <Div className="auth"

                d="flex"
                flexDir="column"
                justify="center"
                align="center"
                textSize="display2"
                textWeight="500"
                top="50%"
            p={{ x: "1rem", y: "4rem" }}
    >


            <Div className="contact" bg={`#fff`}
                w={{ xs: '80%', md: '80vh' }} h={{ xs: 'auto', md: 'auto' }} p={{ x: "1rem", y: "1rem" }}
                align="center"
                shadow="4">

                <Container>
                    <Image m={{ t: "2rem", l: "37%" }} d="inline-block" w={{ xs: '4rem', md: '7.7rem' }} src="img/vnm.png" />

                    <form className="myform" onSubmit={handleSubmit(onSubmit)}>

                        <Image m={{ l: "45%" }} w={{ xs: '3rem', md: '3.7rem' }} bg={`#252859;`} src="img/signup.jpg" />
                        <p className='dey'>What is your name?</p>
                        <Div

                            d="flex"
                            flexDir="column"
                            justify="center"
                            align="center">

                            <Input onKeyPress w={{ xs: '100%', md: '24rem' }} m={{ t: "2rem" }} {...register("fname", { required: true, maxLength: 15 })}
                                placeholder="Enter your First name" onChange={handleChange} name="fname" type="text"

                                p={{ x: "2.5rem" }}
                                prefix={
                                    <Icon
                                        name="UserSolid"
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

                            {errors.fname && <p className="text-error">Your first name is required</p>}

                            <Input w={{ xs: '100%', md: '24rem' }} m={{ t: "2rem" }}   {...register("lname", { required: true, maxLength: 55 })}
                                placeholder="Enter your last name" onChange={handleChange} name="lname" type="text"

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
                            />             {errors.lname && <p className="text-error">Your last name is required</p>}
                            <Button variant="primary" type='submit'
                                align="center"
                                shadow="3"
                                hoverShadow="4"
                                bg={`#252859`}
                                m={{ t: "1rem" }}
                                w={{ xs: '100%', md: '24rem' }}
                            >
                                {buttonText}
                            </Button>
                            <span className='dont'>Already have an account?<a>  <NavLink to="/login" >
                                Login
                            </NavLink></a></span>
                        </Div>



                    </form>
                    <Div></Div>

                </Container>
            </Div>
        </Div>

</>

  );
};

export default StepOne;