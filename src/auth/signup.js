
import React from 'react';
import { Text, Input, Div, Row, Col, Anchor, Image, Icon, Container, Button } from "atomize";
import { useState } from "react";
import 'regenerator-runtime/runtime' ;
import StepOne from "./form/StepOne";
import StepTwo from "./form/StepTwo";
import Final from "./Form/Final";
import StepThree from './form/stepThree';


function Signup() {
  //state for steps
  const [step, setstep] = useState(1);

  //state for form data
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    DOB:"",
    country:"",
    Phone:"",
    gender:"",
    userType:""
  })

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
    const {value } = e.target;

    //updating for data state taking previous state and then adding new value to create new object
    setFormData(prevState => ({
      ...prevState,
      [input]: value
  }));
  }


// javascript switch case to show different form in each step
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
         // case 3 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 3:
      return (
       
                <StepThree nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
            
      );
      // Only formData is passed as prop to show the final value at form submit
    case 4:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col  md={{ span: 6, offset: 3 }} className="custom-margin">
                <Final values={formData}  />
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

export default Signup ;