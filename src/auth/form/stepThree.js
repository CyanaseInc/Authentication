import React, { useState } from "react";
import { Text, Input, Div, Row, Col, Anchor, Icon, Container, Button, Image } from "atomize";
import validator from "validator";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import Radio from"./radio";
import DatePicker from './DatePicker';  


// creating functional component ans getting props from app.js and destucturing them
const StepThree = ({ nextStep, handleFormData, prevStep, values }) => {


    // set states for th required components
    const [inputs, setInputs] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm();

    // on click submit state

    const myChange = <Icon color="white" name="Loading2" size="20px" />;
    const myOriginal = 'Continue';
    const [buttonText, setButtonText] = useState(myOriginal);

   
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
                            <p className='dey'>Add details to continue.</p>
                            <Div

                                d="flex"
                                flexDir="column"
                                justify="center"
                                align="center">

                             <Radio></Radio>
                             <DatePicker></DatePicker> 
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

export default StepThree;