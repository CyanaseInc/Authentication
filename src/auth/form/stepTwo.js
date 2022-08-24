import React, { useEffect, useState } from 'react';
import { Input, Div, Row, Col, Icon, Container, Button, Image, Text, Dropdown } from "atomize";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import en from 'react-phone-number-input/locale/en.json';
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// creating functional component ans getting props from app.js and destucturing them
const StepTwo = ({ nextStep, prevStep }) => {

    //// Set user phone number and country
    const [countryState, setCountryState] = useState({
        loading: false,
        countries: [],
        errorMessage: "",
    });

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
        if (obj.name.common === selectedCountry) {
            return true;
        }
        return false;
    });


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
        setcode(event.target.value)
    }

    /// Set states for the value in country code

    const ftext = searchSelectedCountry && searchSelectedCountry.idd.root;
    const stext =  searchSelectedCountry && searchSelectedCountry.idd.suffixes; 
    const phone= ftext+stext;





    const [phoneCode, setCode] = useState("+256");

 
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

                                d="flex"
                                flexDir="column"
                                justify="center"
                                align="center">

                                <section>
                                    <div className="">
                                        {/* header section */}


                                        {/* body section */}
                                        <div>
                                            {loading === true ?
                                                <div>
                                                    <Icon name="Loading" size="20px" />
                                                    <Text color={`#757575;`} align="center">Loading</Text>
                                                </div> :
                                                <div className="grid justify-center mt-14 mx-10 space-y-10">

                                                    <div>
                                                        <select
                                                            value={selectedCountry}
                                                            onChange={setCe()}
                                                            className=" w-96 h-14 text-xl rounded-lg md:text-2xl "
                                                        >
                                                            <Dropdown>--Select Country--</Dropdown>
                                                            {countries.map((item) => {
                                                                return (
                                                                    <option key={uuidv4()} value={item.name.common}>
                                                                        {item.name.common}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        {searchSelectedCountry && (
                                                            <div className="flex space-x-4">
                                                                {phone}
                                                                <div>
                                                                    <Input value={phoneCode} w={{ xs: '100%', md: '24rem' }}
                                                                        m={{ t: "2rem" }}
                                                                        {...register("country", { required: true, minLength: 5, maxLength: 55 })}
                                                                        placeholder="Enter your country"
                                                                        onChange={(e) => setCode(e.target.value)} name="phone" type="tel"

                                                                        p={{ x: "2.5rem" }}
                                                                    />             {errors.country && <p className="text-error">Your country is required</p>}


                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                </div>
                                            }
                                        </div>
                                    </div>
                                </section>
                                <Row>
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