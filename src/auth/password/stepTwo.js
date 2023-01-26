import React, { useState, useEffect } from "react";
import { Text, Input, Div, Row, Col, Anchor, Icon, Container, Button, Image, Label, Radiobox } from "atomize";
import { Iconly } from "react-iconly";
import { useForm } from "react-hook-form";
import { NavLink, } from "react-router-dom";
import axios from "axios";
const StepTwo = ({ values, prevStep, nextStep }) => {
    //destructuring the object from values

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [Code, setCode] = useState();
    const [userID, setID] = useState("");
    const [errorColor, setError] = useState("none");
    const [Email, setEmail] = useState("none");
    const [myText, SetText] = useState("Enter code");
    const myChange = <Icon color="white" name="Loading2" size="20px" />;
    const myOriginal = 'Continue';
    const [buttonText, setButtonText] = useState(myOriginal);
    const [inputs, setInputs] = useState({});


    useEffect(() => {
        const detail = JSON.parse(localStorage.getItem("email"));
        setEmail(detail.email);
        const coders = JSON.parse(localStorage.getItem("Code"));
        setCode(coders.code);
    }, [])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    //Verify user
    const onSubmit = (el) => {

        const InputCode = el.code;


        if (parseInt(InputCode) === parseInt(Code)) {
            setButtonText(myChange);
            nextStep();

        } else {

            SetText("Invalid verification code");
            setError("yes");

        }

    }
    function Resend() {

        SetText("Resending...");
        const EMAIL_PATH = 'https://cyanase.com/savers/email/api_send_password_recover.php';
        axios({
            method: 'POST',
            url: `${EMAIL_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: { email: Email, code: Code }
        })
            .then(results => {

                console.log(results.data);
                SetText("Code sent!");

            })
            .catch(error => {

                setError("yes");
                SetText("Check your internet connection");
                setButtonText(myOriginal);
                console.log(error.data);

            });

    }
    return (
        <>
            <Div d="flex" align="center" justify="center" className="topera" >
                <Iconly

                    name="Message"
                    primaryColor={`#252859`}
                    set='bulk'
                    secondaryColor='orange'
                    stroke='bold'
                />
            </Div>

            <Text
                m={{ t: "1rem" }}
                textColor={` ${errorColor === "none" ? '#252859' : 'red'}`}
                textSize="heading"
                textAlign="center">
                {myText}
            </Text>
            <Text
                textColor="#808080"
                textSize="subheader"
                textAlign="center">
                A password change code has been sent to your email address  <span className="span">
                    {Email}</span> kindly check your inbox or <span className="dey">SPAM folder</span> to verify your account.
            </Text>

            <form className="myform" onSubmit={handleSubmit(onSubmit)}>

                <Div

                    d="flex"
                    flexDir="column"
                    justify="center"
                    align="center">

                    <Input w={{ xs: '18rem', md: '24rem' }}
                        m={{ t: "2rem" }}
                        rounded="circle"
                        {...register("code", { required: true, maxLength: 55, })}
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
                    <Text onClick={() => Resend()} textAlign="center" textColor="#252859">
                        Resend code?
                    </Text>
                </Div>



            </form>

        </>
    );
};

export default StepTwo;
