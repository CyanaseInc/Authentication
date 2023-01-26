import React, { useEffect, useState } from 'react';
import { Input, Div, Row, Col, Icon, Container, Button, Image } from "atomize";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import '../auth.css';

import { Iconly } from "react-iconly";
// creating functional component ans getting props from app.js and destructuring them
const StepTwo = ({ nextStep, prevStep, handleFormData, values }) => {

    const [countryState, setCountryState] = useState({
        loading: false,
        countries: [],
        errorMessage: "",
    });
    // on click submit state

    const myChange = <Icon color="white" name="Loading2" size="20px" />;
    const myOriginal = 'Continue';
    const [buttonText, setButtonText] = useState(myOriginal);
    const [errorColor, setError] = useState("none");
    const [inputs, setInputs] = useState({});
    const [myText, SetText] = useState("How should we contact you");
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

    const [selectedCountry, setSelectedCountry] = useState("none");


    //   find selected country data
    //search selected country
    const searchSelectedCountry = countries.find((obj) => {
        if (obj.country_name === selectedCountry) {
            return true;
        }
        return false;
    });
    const dialCode = searchSelectedCountry && searchSelectedCountry.dial_code;
    const CountryCode = searchSelectedCountry && searchSelectedCountry.code;
    // handle submit function
    const onSubmit = (el) => {
    
        if (selectedCountry === "none") {

            setError("yes");
            SetText("Choose your country to continue");
        } else {

            const ACCOUNT_CHECK = "https://api.cyanase.com/api/account_check.php"
            setButtonText(myChange);

            axios({
                method: 'POST',
                url: `${ACCOUNT_CHECK}`,
                headers: { 'content-type': 'application/json' },
                data: { Phone: el.phone, email: el.email }
            })
                .then(results => {
                    
                    if (results.data.status === "OK") {
                        const location = { "country": CountryCode };
                        localStorage.setItem('Contacts', JSON.stringify(el));
                        localStorage.setItem('place', JSON.stringify(location));
                        setButtonText(myOriginal);
                        nextStep();
                       
                    } else {
                        setError("yes");
                        SetText("Contact details already in use");
                        setButtonText(myOriginal);
                    }

                })
                .catch(error => {
                    setError("yes");
                    SetText("Check your internet connection");
                    setButtonText(myOriginal);
                    console.log(error.data)
                });





        }



    }

    return (
        <>


            <form className="myform" onSubmit={handleSubmit(onSubmit)}>

                <Div d="flex" align="center" justify="center">
                    <Image w={{ xs: '3rem', md: '3.7rem' }}
                        bg={`#252859;`} src="img/signup.jpg" />

                </Div>
                <Div d="flex" justify="center">
                    <p className={` ${errorColor === "none" ? 'dey' : 'deye'}`}>
                        {myText}
                    </p>
                </Div>
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
                                                    <option onChange={handleFormData("country")} name="country" key={uuidv4()} value={item.country_name}>
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

                                                <Input defaultValue={dialCode} w={{ xs: '18rem', md: '24rem' }}
                                                    m={{ t: "2rem" }} rounded="circle"
                                                    {...register("phone", { required: true, minLength: 5, maxLength: 55 })}
                                                    placeholder="Enter your phone number"
                                                    onChange={handleFormData("phone")}
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
                    <Input
                        w={{ xs: '18rem', md: '24rem' }}
                        m={{ t: "2rem" }} rounded="circle"
                        {...register("email", { required: true, maxLength: 65, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                        placeholder="Enter email"
                        defaultValue={values.email}
                        onChange={handleFormData("email")}
                        name="email" type="text"

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
                                align="center" rounded="circle"
                                shadow="3"
                                hoverShadow="4"
                                bg={`#252859`}
                                m={{ t: "1rem" }}
                                w={{ xs: 'aut', md: 'auto' }}
                            >
                                Previous
                            </Button>
                        </Col>
                        <Col><Button type='submit' rounded="circle"
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


        </>
    );
};

export default StepTwo;