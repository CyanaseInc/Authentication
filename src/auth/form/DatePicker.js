import React, { Component, Fragment } from 'react';  
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';  
import DateFnsUtils from '@date-io/date-fns';  
import { Text } from "atomize";
  
class DatePicker extends Component {  
    constructor() {  
        super();  
        this.state = {  
            startDate: new Date()  
        }  
    }  
    handleStartDateChange = date => {  
        this.setState({ startDate: date });  
    };  
    render() {  
        return (  
            <Fragment>  
                 <Text textSize="1rem" textWeight="600"align="center" m={{ t:"2rem"}}>Select your birth date</Text>
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
                                value={this.state.startDate}  
                                onChange={this.handleStartDateChange}  
                                KeyboardButtonProps={{  
                                    'aria-label': 'change date',  
                                }}  
                            />  
                        </MuiPickersUtilsProvider>  
                    </div>  
                </div>  
            </Fragment>  
        )  
    }  
}  
export default (DatePicker)  
