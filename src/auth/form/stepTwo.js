import React, { useEffect, useState } from 'react';
import { Input, Div, Row, Col, Icon, Container, Button, Image } from "atomize";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import '../auth.css';

import { Iconly } from "react-iconly";
// creating functional component ans getting props from app.js and destructuring them
const StepTwo = ({ nextStep, prevStep }) => {
    const [countryState, setCountryState] = useState({
        loading: false,
        countries: [],
        errorMessage: "",
    });
    // on click submit state

    const myChange = <Icon color="white" name="Loading2" size="20px" />;
    const myOriginal = 'Continue';
    const [buttonText, setButtonText] = useState(myOriginal);

    const [inputs, setInputs] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm();

    // hnadle on change in forms
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // fetch spinner
                setCountryState({
                    ...countryState,
                    loading: true,
                });

                //  fetch data
                const dataUrl = `/country.json`;
                const response = await axios.get(dataUrl);
                setCountryState({
                    ...countryState,
                    countries: response.data,
                    loading: false,
                });
            } catch (error) {
                setCountryState({
                    ...countryState,
                    loading: false,
                    errorMessage: "Sorry Something went wrong",
                });
            }
        };

        fetchData();
    }, []);
    const { loading, errorMessage, countries } = countryState;

    const [selectedCountry, setSelectedCountry] = useState();


    //   find selected country data
    //search selected country
    const searchSelectedCountry = countries.find((obj) => {
        if (obj.country_name === selectedCountry) {
            return true;
        }
        return false;
    });
    const dialCode = searchSelectedCountry && searchSelectedCountry.dial_code;
    // handle submit function
    const onSubmit = () => {
        // change the status to loading
        setButtonText(myChange);
        // load net step

        nextStep();


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
                p={{ x: "1rem", y: "1rem" }}
            >


                <Div className="contact" bg={`#fff`}
                    w={{ xs: '80%', md: '80vh' }} h={{ xs: 'auto', md: 'auto' }} p={{ x: "1rem", y: "1rem" }}
                    align="center"
                    shadow="4">

                    <Container>
                        <Image m={{ t: "2rem", l: "37%" }} d="inline-block" w={{ xs: '4rem', md: '7.7rem' }} src="img/vnm.png" />

                        <form className="myform" onSubmit={handleSubmit(onSubmit)}>

                            <Image m={{ l: "45%" }} w={{ xs: '3rem', md: '3.7rem' }} bg={`#252859;`} src="img/signup.jpg" />
                            <p className='dey'>Tell us how we should contact you.</p>
                            <Div
                                m={{ t: "2rem" }}
                                d="flex"
                                flexDir="column"
                                justify="center"
                                align="center">

                                <section>
                                    <Div className="">

                                        <div>

                                            <div>

                                            </div>
                                            <div className="grid justify-center mt-14 mx-10 space-y-10">

                                                <Div d="flex"
                                                    flexDir="column"
                                                    justify="center"
                                                    align="center" >
                                                    <select
                                                        value={selectedCountry}
                                                        onChange={(e) => setSelectedCountry(e.target.value)}
                                                        className="myOptions"
                                                    >
                                                        <option className='select'>--Select Country--</option>

                                                        {countries.map((item) => {
                                                            return (
                                                                <option name="country" key={uuidv4()} value={item.country_name}>
                                                                    {item.country_name}
                                                                </option>
                                                            );
                                                        })}
                                                        {errors.country && <p className="text-error">Select country to continue</p>}
                                                    </select>
                                                </Div>
                                                <div>

                                                    <div className="flex space-x-4">

                                                        <div>
                                                        <Input   defaultValue={dialCode} w={{ xs: '100%', md: '24rem' }}
                                                                m={{ t: "2rem" }}
                                                                {...register("phone", { required: true, minLength: 5, maxLength: 55 })}
                                                                placeholder="Enter your phone number"
                                                                name="phone" type="tel"
                                                                p={{ x: "2.5rem" }}
                                                                prefix={

                                                                    <Iconly
                                                                        className="ivn"
                                                                        name="Call"
                                                                        primaryColor={`#252859`}
                                                                        set='bulk'
                                                                        secondaryColor='orange'
                                                                        stroke='bold'
                                                                    />
                                                                }
                                                            />

                                                            {errors.phone && <p className="text-error">Your phone number is required</p>}
                                                            

                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                    </Div>
                                </section>
                                <Input onKeyPress w={{ xs: '100%', md: '24rem' }} m={{ t: "2rem" }} {...register("email", { required: true, maxLength: 15 })}
                                    placeholder="Enter email" onChange={handleChange} name="email" type="text"

                                    p={{ x: "2.5rem" }}
                                    prefix={

                                        <Iconly
                                            className="ivn"
                                            name="Message"
                                            primaryColor={`#252859`}
                                            set='bulk'
                                            secondaryColor='orange'
                                            stroke='bold'
                                        />
                                    }
                                />

                                {errors.email && <p className="text-error">Check your email</p>}
                                <Row flexDir={{ xs: 'row', lg: 'row' }}>
                                    <Col>
                                        <Button onClick={prevStep}
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
                                    <Col><Button type='submit'
                                        align="center"
                                        shadow="3"
                                        hoverShadow="4"
                                        bg={`#252859`}
                                        m={{ t: "1rem" }}
                                        w={{ xs: 'auto', md: 'auto' }}
                                    >
                                        {buttonText}
                                    </Button></Col>
                                </Row>
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

export default StepTwo;