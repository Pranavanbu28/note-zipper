import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/Mainscreen";
import "./ProfileScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../actions/userActions";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const ProfileScreen =({location,history})=>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pic, setPic] = useState();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picMessage, setPicMessage] = useState();
    
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [history, userInfo]);

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
        // console.log(data);
        // console.log(typeof(data.url))
        setPic(data.url.toString())
      }).catch((err)=>{
        console.log(err);
      })
      
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("dfd")
    dispatch(update({ name, email, password, pic }));
  };

    return (<MainScreen title="Edit Profile">
    <div>
        <Row className="profileContainer">
            <Col md={6}>
                <Form onSubmit={submitHandler}>
                {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
               
              <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Profile picture</Form.Label>
            <Form.Control type="file" onChange={(e)=>picHandler(e.target.files[0])}  placeholder='Upload profile picture'/>
            </Form.Group>
            <Button type="submit" varient="primary">
                Update
              </Button>
                </Form>
            </Col>
            <Col style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
                 <img src={pic} alt={name} className="profilePic" />
            </Col>
        </Row>
      </div>
    </MainScreen>)
}
export default ProfileScreen;