import React, { useState } from "react";
import { Text, Input, Div, Row, Col, Anchor, Icon, Container, Button, Image } from "atomize";
import validator from "validator";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";


const Final = ({ values }) => {

    //destructuring the object from values
  const { fname, lname, age, email } = values;
  return (
    <>
      <Div style={{ marginTop: 100, textAlign: "left" }}>
        <Div>
          <p>
            <strong>First Name :</strong> {fname}{" "}
          </p>
          <p>
            <strong>Last Name :</strong> {lname}{" "}
          </p>
          <p>
            <strong>Age :</strong> {age}{" "}
          </p>
          <p>
            <strong>Email :</strong> {email}{" "}
          </p>
        </Div>
      </Div>
    </>
  );
};

export default Final;
