import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
  return <footer
  style={{
    position:"relative",
    display:"flex",
    justifyContent:"center",
    bottom:0,
    width:"100%"

  }}>
  <Container>

    <Row>
      <Col className="text-center py-3">
        Made with love by Pranav &hearts;
      </Col>
    </Row>
  </Container>
  </footer>
}

export default Footer
