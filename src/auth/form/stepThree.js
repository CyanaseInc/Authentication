import React, { useState, useEffect } from "react";
import { Text, Input, Div, Row, Col, Anchor, Icon, Container, Button, Image, Label, Radiobox, Checkbox } from "atomize";
import validator from "validator";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import axios from "axios";


// creating functional component ans getting props from app.js and destucturing them
const StepThree = ({ nextStep, handleFormData, prevStep, }) => {


    // set states for th required components
    const [inputs, setInputs] = useState({});
    const [myText, SetText] = useState("Add details to Continue");
    const [errorColor, setError] = useState("none");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [startDate, seDate] = useState(new Date());
    const [Mygender, setGender] = useState();
    const [Fname, setFname] = useState();
    const [Lname, setLname] = useState();
    const [Phone, setPhone] = useState();
    const [Email, setEmail] = useState();
    const [Country, setCountry] = useState();
    const [Password, setPassword] = useState();
    const [dontAutoSave, AutoSave] = useState(true);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("LoginNames"));



        setFname(data.fname);
        setLname(data.lname);

    }, []);

    useEffect(() => {
        const detail = JSON.parse(localStorage.getItem("Contacts"));

        setCountry(detail.country);
        setPhone(detail.phone);
        setEmail(detail.email);


    }, [])

    useEffect(() => {
        const vian = JSON.parse(localStorage.getItem("place"));

        setCountry(vian.country);

    }, []);
    useEffect(() => {
        const pass = JSON.parse(localStorage.getItem("Password"));

        setPassword(pass.password);

    }, []);
    const handleStartDateChange = (date) => {
        seDate(date);



    };
    function Gender(b) {
        setGender(b);


    }



    const myChange = <Icon color="white" name="Loading2" size="20px" />;
    const myOriginal = 'Continue';
    const [buttonText, setButtonText] = useState(myOriginal);


    // handle submit function
    const onSubmit = () => {

        // change the status to loading
        setButtonText(myChange);
        // load net step


        const API_PATH = 'https://api.cyanase.com/api/create_account.php';
        const EMAIL_PATH = 'https://cyanase.com/savers/email/api_verify.php';
        const API_KEY = "NUlOeDU0c2FEdUxxaVFqQkIxV2JlZz09";
        const code = Math.round(Math.random() * (900000 - 99999) + 1000);
        const MyCode = { "code": code };
        localStorage.setItem('Code', JSON.stringify(MyCode));
        axios({
            method: 'POST',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: { api_key: API_KEY, first_name: Fname, last_name: Lname, email: Email, phone: Phone, password: Password, gender: Mygender, country: Country, dob: startDate, code: code }
        })
            .then(result => {

                const message = result.data.message;
                const stateMe = result.data.code;
                const IDZ = result.data.id;

                if (stateMe === "10") {
                    
                    /// keep users idz
                    const userIDz = { "id": IDZ };
                    localStorage.setItem('ID', JSON.stringify(userIDz));
                    /// SEnd verifilocation email

                    axios({
                        method: 'POST',
                        url: `${EMAIL_PATH}`,
                        headers: { 'content-type': 'application/json' },
                        data: {id:IDZ,code:code}
                    })
                        .then(results => {
                            setButtonText(myOriginal);
                            console.log(results.data);
                            nextStep();

                        })
                        .catch(error =>{

                            setError("yes");
                            SetText("Check your internet connection");
                            setButtonText(myOriginal);
                            console.log(error.data);

                        } );
                  

                  

                } else {
                    SetText(message);
                    setError("yes");

                }

            })
            .catch(error =>{

                setError("yes");
                SetText("Check your internet connection");
                setButtonText(myOriginal);
                console.log(error.data);

            } );


    }



    return (
        <>

            <form className="myform" onSubmit={handleSubmit(onSubmit)}>
                <Div d="flex" align="center" justify="center">
                    <Image 
                        w={{ xs: '3rem', md: '3.7rem' }}
                        bg={`#252859;`} src="img/signup.jpg" />

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
                    <Text textSize="1rem"
                        textWeight="600" align="center"
                        m={{ t: "2rem" }}>Select your Gender</Text>
                    <Div flexDir={{ xs: 'row', lg: 'row' }}
                        d={{ xs: "flex", md: "flex" }} m={{ t: "1rem" }}>
                        <Label
                            align="center"
                            textWeight="600"
                            m={{ b: "0.5rem", r: "2rem" }}
                        >
                            <Radiobox
                                onChange={() => Gender("M")}
                                checked={Mygender === "M"}
                                name="gender"
                            />
                            Male
                        </Label>
                        <Label
                            align="center"
                            textWeight="600"
                            m={{ b: "0.5rem", r: "2rem" }}
                        >
                            <Radiobox
                                onChange={() => Gender("F")}
                                checked={Mygender === "F"}
                                name="gender"
                            />
                            Female
                        </Label>
                        <Label
                            align="center"
                            textWeight="600"
                            m={{ b: "0.5rem", r: "2rem" }}
                        >
                            <Radiobox
                                onChange={() => Gender("C")}
                                checked={Mygender === "C"}
                                name="gender"
                            />
                            Custom
                        </Label>
                    </Div>


                    {/************Date of Birth************************************** */}
                    <Div>
                        <Text textSize="1rem" textWeight="600" align="center" m={{ t: "2rem" }}>
                            Select your birth date
                        </Text>
                        <div align="center" className="filterControls">

                            <div className="filterDate">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        allowKeyboardControl={false}
                                        autoOk
                                        disableToolbar
                                        inputVariant="outlined"
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        label="Birth date"
                                        name="dob"
                                        defaultValue={startDate}
                                        onChange={handleStartDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>
                    </Div>
                    <Label textSize="subheader"
                        align="center"
                        textWeight="600"
                        m={{ b: "0.5rem" }}>
                        <Checkbox
                            onChange={e =>
                                AutoSave(e.target.checked)
                            }
                            checked={dontAutoSave}
                            inactiveColor="success400"
                            activeColor="#252859"
                            size="25px"
                        />
                        By continuing your are confirming that you have read our <a href="https://cyanase.com/registration/terms.html">Terms & conditions </a> and
                        <a href="https://cyanase.com/registration/terms.html"><span>privacy policy</span> </a>
                    </Label>
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
                        <Col>
                            <Button type='submit'
                                align="center"
                                shadow="3"
                                hoverShadow="4"
                                bg={`#252859`}
                                m={{ t: "1rem" }}
                                w={{ xs: 'auto', md: 'auto' }}
                            >
                                {buttonText}
                            </Button>
                        </Col>
                    </Row>
                    <span className='dont'>Already have an account?<a>  <NavLink to="/login" >
                        Login
                    </NavLink></a></span>
                </Div>



            </form>
        </>
    );
};

export default StepThree;