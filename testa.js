import React from 'react';
import ReactDOM from 'react-dom';
import colors from './css';

import './styles.css';

function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
  }, []);
  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

function Contact() {
  return (
    <div className="App">
      <h1>All the CSS colors!</h1>

      {colors.map(color => (
        <FadeInSection key={color}>
          <div className="box" style={{ backgroundColor: color }}>
            <span>{color}</span>
          </div>
        </FadeInSection>
      ))}
    </div>
  );
}



  
export default Contact;

///////////// my forms 
  <>
   
  <Div className="contact" bg={`rgb(247, 248, 249)`}
                 
                  align="center"
 shadow="2"m={{ t:"2rem" }}>
 <Container>
    <Div align="center" textAlign="center"><Image w="10rem" src="images/logoz.png"/></Div>
  
   <br></br>
    <Text className="chead"textColor={`#252859`} tag="p" textSize="heading">
   Contact us
   
     </Text>
  
     <Div    m={{ t: "4.5rem" }}>

        <Row>
    <Col size="2">
     <Button
    h="2.5rem"
    w="2.5rem"
      bg="info300"
    hoverBg="info400"
    rounded="lg"
    m={{ r: "1rem" }}
  >
    <Icon name="MessageSolid" size="20px" color="info700" />
  </Button></Col>
  
  <Col  size="5.8"><h1>Find us</h1>
  <a>Makerere university CIT building</a></Col> </Row>
     <Row>
    <Col size="2">
     <Button
    h="2.5rem"
    w="2.5rem"
    bg="info300"
    hoverBg="info400"
    rounded="lg"
    m={{ r: "1rem" }}
  >
    <Icon name="LocationSolid" size="20px" color="info700" />
  </Button></Col>
  
  <Col  size="5.8"><h1>Call</h1>
  <p><a>+256705640852</a></p></Col> </Row>
    <Row>
    <Col size="2">
     <Button
    h="2.5rem"
    w="2.5rem"
    bg="info300"
    hoverBg="info400"
    rounded="lg"
    m={{ r: "1rem" }}
  >
    <Icon name="Email" size="20px" color="info700" />
  </Button></Col>
  
  <Col  size="5.8"><h1>Email</h1>
  <p><a>support@cyanse.com</a></p></Col> </Row>
     <Row>
     
    <Col size="2">
     <Button
    h="2.5rem"
    w="2.5rem"
    bg="info300"
    hoverBg="info400"
    rounded="lg"
    m={{ r: "1rem" }}
  >
    <Icon name="MessageSolid" size="20px" color="info700" />
  </Button></Col>
  
  <Col  size="5.8"><h1>WhatsApp</h1>
  <p><a>+256705640852</a></p></Col> </Row>

  
      <form onSubmit={handleSubmit}>
                <Input
      placeholder="Full name"  onChange={(e) => setName(e.target.value)}   type="text" 
          value={name}
      p={{ x: "2.5rem" }}
      prefix={
        <Icon
          name="UserSolid"
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

          <Input
      placeholder="User Name"  onChange={(e) => setName(e.target.value)}   type="text" 
          value={name}
      p={{ x: "2.5rem" }} m={{ t:"2rem" }}
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
   
     
          <Input
      placeholder="Message"  onChange={(e) => setName(e.target.value)}   type="text" 
          value={name}
      p={{ x: "2.5rem" }} m={{ t:"2rem" }}
      prefix={
        <Icon
          name="Message"
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
      <Input type="submit" />
    </form>
    </Div>
     </Container>
   </Div>
      </>