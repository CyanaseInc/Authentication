import React, { useState, useEffect } from "react";
import { Text, Input, Div, Row, Col, Anchor, Icon, Container, Button, Image, Label, Radiobox } from "atomize";
import { Iconly } from "react-iconly";
import { useForm } from "react-hook-form";
import { NavLink, } from "react-router-dom";
import axios from "axios";
const Final = ({ values, prevStep, nextStep }) => {
  //destructuring the object from values


  return (
    <>
      <Div d="flex" align="center" justify="center" className="topera" >
        <Iconly

          name="Password"
          primaryColor={`#252859`}
          set='bulk'
          secondaryColor='orange'
          stroke='bold'
        />
      </Div>
      <Div textAlign="center">
        <Text textSize="heading" textAlign="center" textColor="#252859">
          Your account password has been updated, proceed to login
        </Text>
      </Div>

      <Div

        d="flex"
        flexDir="column"
        justify="center"
        align="center">
        <NavLink to="../login">
          <Button type='submit'
            align="center"
            shadow="3"
            hoverShadow="4"
            bg={`#252859`}
            m={{ t: "1rem" }}
            w={{ xs: '100%', md: '24rem' }}
          >
            Login to your account
          </Button>
        </NavLink>


      </Div>





    </>
  );
};

export default Final;
