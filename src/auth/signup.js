
import React from 'react';
import { Text, Input, Div, Row, Col, Anchor, Image, Icon, Container, Button } from "atomize";
import { useState, useEffect } from "react";
import 'regenerator-runtime/runtime';
import StepOne from "./form/StepOne";
import StepTwo from "./form/StepTwo";
import Final from "./Form/Final";
import StepThree from './form/stepThree';
import Password from './form/Password';
import UserType from './form/UserType';


function Signup() {
  //state for steps
  const [step, setstep] = useState(1);


  //state for form data
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    dob: "",
    country: "",
    Phone: "",
    gender: "",
    userType: ""
  })

  const Mydate = input => e => {
    // input value from the form

    const { mydate } = e.target;
    //updating for data state taking previous state and then adding new value to create new object
    console.log(mydate);
  }


  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputData = input => e => {
    // input value from the form
    const { value } = e.target;

    //updating for data state taking previous state and then adding new value to create new object

  }


  // javascript switch case to show different form in each step

  const Mysteps = () => {

    switch (step) {
      // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
      case 1:
        return (


          <StepOne nextStep={nextStep} handleFormData={handleInputData} values={formData} />

        );
      // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
      case 2:
        return (

          <StepTwo nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />

        );
      case 3:
        return (

          <Password nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />

        );
      // cas
      // case 3 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
      case 4:
        return (

          <StepThree nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} mydate={Mydate} values={formData} />

        );
      case 5:
        return (

          <Final nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} mydate={Mydate} values={formData} />

        );
      // Only formData is passed as prop to show the final value at form submit
      case 6:
        return (
          <div className="App">
            <Container>
              <Row>
                <Col md={{ span: 6, offset: 3 }} className="custom-margin">
                  <UserType values={formData} />
                </Col>
              </Row>
            </Container>
          </div>
        );

      // default case to show nothing
      default:
        return (
          <div className="App">
          </div>
        );
    }


  }
  return (
    <>
      <Div p="3rem" className="contact" m={{
        t: { xs: '10%', md: '3rem' },

      }}
        w={{ xs: '95%', md: '80vh' }}
        h={{ xs: 'auto', md: 'auto' }}
      >
        <Div m={{t:"2rem"}} d="flex" align="center" justify="center">
          <Image
          p="1rem"
            d="inline-block"
            w={{ xs: '4rem', md: '7.7rem' }}
            src="img/vnm.png" />
        </Div>
        <Mysteps />


      </Div>

    </>
  )
}

export default Signup;