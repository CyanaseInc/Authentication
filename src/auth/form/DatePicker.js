import React, { Component, Fragment } from 'react';  
import  { useState } from "react";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';  
import DateFnsUtils from '@date-io/date-fns';  
import { Text } from "atomize";
  
const DatePicker = ({ handleFormData, values }) => {

    const [startDate, setDate] = useState(new Date());
    
    const handleStartDateChange =( date) => {  
        setDate(date);  
    };
        return (  
            <>
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
                            name="DOB"
                            value={startDate}
                            onChange={handleStartDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
            </div>
        </>
        )  
     
}  
export default (DatePicker)  
