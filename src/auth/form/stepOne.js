import React, { useState, useEffect } from "react";
import { Text, Input, Div, Row, Col, Anchor, Icon, Container, Button, Image } from "atomize";
import validator from "validator";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Iconly } from "react-iconly";
import '../auth.css';

// creating functional component ans getting props from app.js and destucturing them
const StepOne = ({ nextStep, handleFormData, values }) => {


    // set states for th required components
    const [inputs, setInputs] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm();

    // on click submit state

    const myChange = <Icon color="white" name="Loading2" size="20px" />;
    const myOriginal = 'Continue';
    const [buttonText, setButtonText] = useState(myOriginal);

    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    // handle submit function
    const onSubmit = (el) => {

        // change the status to loading
        setButtonText(myChange);
        // load net step

       
        localStorage.setItem('LoginNames', JSON.stringify(el));
         nextStep();
    }
    //creating error state for validation
    const [error, setError] = useState(false);


    return (
        <>


            <form className="myform" onSubmit={handleSubmit(onSubmit)}>

            <Div d="flex" align="center" justify="center">
                    <Image  w={{ xs: '3rem', md: '3.7rem' }} bg={`#252859;`} src="img/signup.jpg" />

                </Div>
                <Div d="flex" justify="center">
                    <p className='dey'>
                        What is your name?
                    </p>
                </Div>
                <Div

                    d="flex"
                    flexDir="column"
                    justify="center"
                    align="center">

                    <Input w={{ xs: '18rem', md: '24rem' }} rounded="circle"  m={{ t: "2rem" }}
                        {...register("fname", { required: true, maxLength: 15 })}
                        placeholder="First name" name="fname" type="text"
                        defaultValue={values.fname}
                        onChange={handleChange}
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

                    {errors.fname && <p className="text-error">Your first name is required</p>}

                    <Input w={{ xs: '18rem', md: '24rem' }} rounded="circle" m={{ t: "2rem" }}
                        {...register("lname", { required: true, maxLength: 55 })}
                        placeholder="last name" name="lname" type="text"
                        defaultValue={values.lname}
                        onChange={handleChange}
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
                    />             {errors.lname && <p className="text-error">Your last name is required</p>}
                    <Button variant="primary" type='submit'
                        align="center"rounded="circle" 
                        shadow="3"
                        hoverShadow="4"
                        bg={`#252859`}
                        m={{ t: "1rem" }}
                        w={{ xs: '18rem', md: '24rem' }}
                    >
                        {buttonText}
                    </Button>
                    <span className='dont'>Already have an account?<a>  <NavLink to="/login" >
                        Login
                    </NavLink></a></span>
                </Div>



            </form>


        </>

    );
};

export default StepOne;