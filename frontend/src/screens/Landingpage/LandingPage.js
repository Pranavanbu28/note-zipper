import React, { useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';

const LandingPage = ({history}) => {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/mynotes");
    }
  }, [history, userInfo]);

  return (
    <div className='main'>
      <Container>
        <Row>
        
            <div className="fullHolder">
            <div className = "titleAndIntro">
            <h1>
               Welcome to Note-Zipper
            </h1>
            <p> A safe place to keep all your notes</p>

            </div>
            <div className="buttonContainer">
            <div>
                <a href = "/login">
                <Button variant = "outline-danger">Login</Button></a>
            </div>
            <div>
                <a href = "/register">
                <Button variant="danger">Signup</Button></a>
            </div>

            </div>

            </div>
        </Row>
      </Container>
    </div>
  )
}

export default LandingPage
