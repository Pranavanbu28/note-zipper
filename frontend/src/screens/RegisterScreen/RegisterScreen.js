import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import Mainscreen from '../../components/Mainscreen'

import Loading from '../../components/Loading/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/userActions'

import {useHistory} from 'react-router-dom'

const RegisterScreen = () => {
  const[name,setName] = useState("");
  const[password,setPassword] = useState("");
  const[email,setEmail] = useState("");
  const[confirmPassword,setConfirmPassword] = useState("");
  const[pic,setPic] = useState("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffr…");
  const[errorMessage,setErrorMessage] = useState("");
  const[picMessage,setPicMessage] = useState("");
  
  const dispatch = useDispatch()
  
  const userRegister = useSelector(state=>state.userRegister)

  const {userInfo, loading, errors} = userRegister

  const history = useHistory();
  useEffect(()=>{
    if(userInfo){
      history.push('/mynotes')
    }
  },[userInfo,history])

  const submitHandler = async(e)=>{
    console.log(email, name);
    e.preventDefault();
    if(password !== confirmPassword){
      setErrorMessage("Please enter the correct password")
    }else{
        dispatch(register(name,email,password,pic))
    }
  }

  const picHandler=(thepic)=>{
    if(!thepic){
      return setPicMessage("Please provide a profile picture")
    }
    if(thepic.type==="image/jpeg" || thepic.type === "image.png"){
      const data = new FormData();
      data.append('file',thepic)
      data.append("upload_preset","notezipper")
      data.append("cloud_name","dx9ppxlww")
      // console.log(data);
      fetch("https://api.cloudinary.com/v1_1/dx9ppxlww/image/upload",{
        method:"post",
        body:data
      })
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data);
        console.log(typeof(data.url))
        setPic(data.url.toString())
      }).catch((err)=>{
        console.log(err);
      })
      
    }
  }
  return <>
    <Mainscreen title="REGISTER">
    {loading && <Loading></Loading>}
    {errorMessage && <ErrorMessage variant='danger'>{errorMessage}</ErrorMessage>}
    {errors && <ErrorMessage variant='danger'>{errors}</ErrorMessage>}
    <Form onSubmit={submitHandler}>
      
      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)}   placeholder="Enter name" />
        
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email"  value={email} onChange={(e)=>setEmail(e.target.value)}   placeholder="Enter email" />
        
      </Form.Group>
      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"  value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Password" />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password"  value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  placeholder="Confirm Password" />
      </Form.Group>
      {picMessage && <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>}
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Profile picture</Form.Label>
        <Form.Control type="file" onChange={(e)=>picHandler(e.target.files[0])} placeholder='Upload profile picture'/>
      </Form.Group>
      
      <Button variant="primary" type="submit" className="mt-2 mb-2">
        Register
      </Button>
      <Row className='py-3'>
        <Col>
            Already have an account?
            <Link to="/register"> Login here </Link>
        </Col>
       
      </Row>
    </Form>

    </Mainscreen>
  </>
}

export default RegisterScreen
