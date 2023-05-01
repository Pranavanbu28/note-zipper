
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading/Loading'
import Mainscreen from '../../components/Mainscreen'
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../../actions/userActions'

const LoginScreen = () => {
  const history = useHistory()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("") 
  
  const dispatch = useDispatch();
  const userLogin = useSelector(state=>state.userLogin);
  const {loading, errors, userInfo} = userLogin;

  useEffect(()=>{
    if(userInfo){
      history.push('/mynotes')
    }
  },[history,userInfo])

  const submitHandler = async(e)=>{
    e.preventDefault()
    dispatch(login(email,password));

  }

  return (
    <Mainscreen title="LOGIN">
      {loading && <Loading/>}
      {errors && <ErrorMessage variant="danger">{errors}</ErrorMessage>}
      <Form onSubmit={submitHandler}>
      
      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter email" />
        
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" />
      </Form.Group>
      
      <Button variant="primary" type="submit" className="mt-2 mb-2">
        Submit
      </Button>
      <Row className='py-3'>
        <Col>
            New user?
            <Link to="/register"> Register here </Link>
        </Col>
       
      </Row>
    </Form>
    </Mainscreen>
  )
}

export default LoginScreen
