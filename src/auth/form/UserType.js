import React from 'react';
import { useState, useEffect } from "react";
import { Text, Div, Modal, Icon, Button } from "atomize";
import { useForm } from "react-hook-form";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Iconly } from "react-iconly";
import axios from "axios";

// creating functional component ans getting props from app.js and destucturing them
const UserType = ({ nextStep, setValue, links, values, setCurrency }) => {


    const [select, selected] = useState("home");
    const [userID, setID] = useState("");
    const [myText, SetText] = useState("Tell us who you are");
    const [errorColor, setError] = useState("none");
    const myChange = <Icon color="white" name="Loading2" size="20px" />;
    const myOriginal = 'Continue';
    const [buttonText, setButtonText] = useState(myOriginal);
    /****************************DEPOSIT MODAL************************ */
    const [userTP, setUser] = useState();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    //Make it possible for use tp choose which deposit direction they are taking
    const [show, hide] = useState("NONE");

    useEffect(() => {
        const detail = JSON.parse(localStorage.getItem("ID"));

        setID(detail.id);



    }, []);
    function Myuser() {

        if (userTP === '') {

            SetText("Select options to continue");
            setError("yes");



        } else {

            setButtonText(myChange);
            const EMAIL_PATH = 'https://api.cyanase.com/api/update_verify.php';

            axios({
                method: 'POST',
                url: `${EMAIL_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: { type: "usertype", id: userID, boouser: userTP }
            })
                .then(result => {
                    console.log(result.data)
                    const statit = result.data.status;
                    if (statit === "100") {
                        window.location.replace('https://auth.cyanase.com');

                    }else{
                        setButtonText(myOriginal);
                    }
                  

                })
                .catch(error =>{
                    

                    setError("yes");
                    SetText("Check your internet connection");
                    setButtonText(myOriginal);
                    console.log(error.data);
                });

        }

    }

    return (

        <>

            <Div align="center" d="flex" justify="center">
                <Text className={` ${errorColor === "none" ? 'dey' : 'deye'}`} textWeight="500" textSize="subheader">
                    {myText}
                </Text>

            </Div>
            {/*************************Card section***************************** */}

            <Div p="0.5rem">
                {/*************************PERSONAL INVESTMENTS***************************** */}
                <Div border="1px solid"
                    borderColor="#ff9b00;"
                    className={` ${select === "personal" ? 'selected' : 'not_selected'}`}
                    m={{ t: "1rem" }} p="0.3rem"

                    rounded="md"
                    shadow="3"
                    onClick={() => {

                        selected("personal");
                        setUser("student")
                    }


                    }>
                    <Div d="flex" align="center" p="0.5rem">

                        <Div m={{ l: "2rem" }}>
                            <Iconly

                                name="User"
                                primaryColor={` ${select === "personal" ? '#fafafa' : '#252859'}`}
                                set='broken'

                                stroke='bold'
                            />
                        </Div>

                        <Text p="0.2rem" textSize="subheader" textWeight="600">
                            Student
                        </Text>
                    </Div>
                    <Div d="flex" align="center" m={{ l: "2.5rem", b: "1.5rem" }}>
                        <Text className="div_notes">
                            I am a student who wants to invest for my future
                        </Text>
                    </Div>

                </Div>
                {/*************************SACCO GROUPS***************************** */}
                <Div
                    className={` ${select === "sacco" ? 'selected' : 'not_selected'}`}
                    m={{ t: "0.5rem" }} p="0.3rem"
                    border="1px solid"
                    borderColor="#ff9b00;"
                    rounded="md"
                    shadow="3"
                    onClick={() => {
                        {

                            selected("sacco");

                            setUser("beginer");
                        }
                    }}>
                    <Div d="flex" align="center" p="0.5rem">

                        <Div m={{ l: "2rem" }}>
                            <Iconly

                                name="People"
                                primaryColor={` ${select === "sacco" ? '#fafafa' : '#252859'}`}
                                set='broken'

                                stroke='bold'
                            />
                        </Div>

                        <Text p="0.2rem" textSize="subheader" textWeight="600">
                            Beginner
                        </Text>
                    </Div>
                    <Div d="flex" align="center" m={{ l: "2.5rem", b: "1.5rem" }}>
                        <Text className="div_notes">
                            I am employed and looking forward to start investing
                        </Text>
                    </Div>

                </Div>
                {/*********************(Company) */}

                <Div
                    className={` ${select === "company" ? 'selected' : 'not_selected'}`}
                    m={{ t: "0.5rem" }} p="0.3rem"
                    border="1px solid"
                    borderColor="#ff9b00;"
                    rounded="md"
                    shadow="3"
                    onClick={() => {
                        {

                            selected("company");

                            setUser("company");
                        }
                    }}>
                    <Div d="flex" align="center" p="0.5rem">

                        <Div m={{ l: "2rem" }}>
                            <Iconly

                                name="People"
                                primaryColor={` ${select === "sacco" ? '#fafafa' : '#252859'}`}
                                set='broken'

                                stroke='bold'
                            />
                        </Div>

                        <Text p="0.2rem" textSize="subheader" textWeight="600">
                            Company
                        </Text>
                    </Div>
                    <Div d="flex" align="center" m={{ l: "2.5rem", b: "1.5rem" }}>
                        <Text className="div_notes">
                            I  want o expand our company assets
                        </Text>
                    </Div>

                </Div>
                {/*************************INVESTMENT CLUBS***************************** */}
                <Div
                    className={` ${select === "club" ? 'selected' : 'not_selected'}`}
                    m={{ t: "0.5rem" }} p="0.3rem"
                    border="1px solid"
                    borderColor="#ff9b00;"
                    rounded="md"
                    shadow="3"
                    onClick={() => {
                        {
                            selected("club");
                            setUser("proffesional");

                        }
                    }}>
                    <Div d="flex" align="center" p="0.5rem">

                        <Div m={{ l: "2rem" }}>
                            <Iconly

                                name="Work"
                                primaryColor={` ${select === "club" ? '#fafafa' : '#252859'}`}
                                set='broken'

                                stroke='bold'
                            />
                        </Div>

                        <Text p="0.2rem" textSize="subheader" textWeight="600">
                            Professional
                        </Text>
                    </Div>
                    <Div d="flex" align="center" m={{ l: "2.5rem", b: "1.5rem" }}>
                        <Text className="div_notes">
                            I am an experienced investor looking forward to expand my portfolio
                        </Text>
                    </Div>

                </Div>
                <Div className={` ${show === "NONE" ? 'display_none' : 'display_yes'}`}>

                    <Button

                        variant="primary"
                        align="center"
                        shadow="3"
                        hoverShadow="4"
                        bg={`#252859`}
                        p="0.5rem"
                        m={{ t: "1rem" }}
                        rounded="circle"
                        w="100%"
                        onClick={() =>
                            Myuser()
                        }>

                        {buttonText}
                    </Button>

                </Div>

            </Div>

        </>



    );
};

export default UserType;