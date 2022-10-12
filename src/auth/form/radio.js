import React, { useState } from "react";
import { Radiobox, Label, Div,Text } from "atomize";

class Radio extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            selectedCountValue: 1
        };

        this.toggleSelectedCount = this.toggleSelectedCount.bind(this);
    }

    toggleSelectedCount(value) {
      this.setState({
        selectedCountValue: value,
      })
    }

    render() {
        const { selectedCountValue} = this.state;

        return (
            <>
             <Text textSize="1rem" 
             textWeight="600"align="center" 
             m={{ t:"2rem"}}>Select your Gender</Text>
            <Div flexDir={{ xs: 'column', lg: 'row' }}
            d={{ xs: "flex", md: "flex" }}  m={{ t:"1rem"}}>
              <Label
                align="center"
                textWeight="600"
                m={{ b: "0.5rem", r: "2rem" }}
              >
               
                <Radiobox
                  onChange={() => this.toggleSelectedCount(1)}
                  checked={ selectedCountValue === 1 }
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
                  onChange={() => this.toggleSelectedCount(2)}
                  checked={ selectedCountValue === 2 }
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
                  onChange={() => this.toggleSelectedCount(3)}
                  checked={ selectedCountValue === 3 }
                  name="gender"
                />
                Custom
              </Label>
              
            </Div>
            </>
            
        );
    }
}
export default Radio;