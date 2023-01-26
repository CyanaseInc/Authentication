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
 const [Email, setEmail]= useState();
    const { register, handleSubmit, formState: { errors } } = useForm();

    // on click submit state
    useEffect(() => {
        const detail = JSON.parse(localStorage.getItem("email"));
        setEmail(detail.email);


    }, [])
    const myChange = <Icon color="white" name="Loading2" size="20px" />;
    const myOriginal = 'Change password';
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

         /// Set the default error back to noramal
        SetText("Add details to continue");
    
        /// Set the error color back to default
        setError("none");
        // change the status to laoding
        setButtonText(myChange);
    
        // send data to the API
        const API_PATH = 'https://api.cyanase.com/api/out_change_password.php';
    
        // MAKE AN AJAX REQUEST
    
        axios({
          method: 'post',
          url: `${API_PATH}`,
          headers: { 'content-type': 'application/json' },
          data: { email: Email,new: datal.password }
        })
          .then(resulta => {
            console.log(resulta.data)
            const message = resulta.data.message;
            const stateMe = resulta.data.status;
    
    
    
            if (stateMe == "100") {
              setButtonText(myOriginal);
            nextStep()
    
    
            } else if (stateMe == "200") {
              setButtonText(myOriginal);
              SetText(message);
              setError("none");
            }
    
    
          })
          .catch(error => alert(error));
      
    
   
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

                    <Div>
                      
                           
                            <Button type='submit' rounded="circle"
                                align="center"
                                shadow="3"
                                hoverShadow="4"
                                bg={`#252859`}
                                m={{ t: "1rem" }}
                                w={{ xs: '18rem', md: '24rem' }}
                            >
                                {buttonText}
                            </Button>
                        
                    </Div>
                 
                </Div>



            </form>



        </>
    );
}




export default Password;
