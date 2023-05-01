import React from 'react'
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import {Link, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../../actions/userActions';
const Header = ({setSearch}) => {

  const dispatch = useDispatch()

  const history = useHistory()
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  const logoutHandler = () =>{

    dispatch(logout())
    history.push('/')
  }
  return (
    

    <Navbar bg="primary"  variant ="dark" expand="lg" >
      <Container >
        <Navbar.Brand>
       
        <Link to="/" className='link-secondary'>

           Notezipper
           </Link>
        
    
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" >
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <Nav className="m-auto">
          <Form className="d-flex " >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>setSearch(e.target.value)}
            />
          
          </Form>
          </Nav>
          
          {userInfo? <Nav>

           <Nav.Link >
           <Link to="/mynotes"  className='link-light'>

           My Notes
           </Link>
           </Nav.Link> 
            
            <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown">
              <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
              <NavDropdown.Divider />
              
            </NavDropdown>
            
          </Nav>:
          <Nav.Link >
           <Link to="/login"  className='link-light'>

           Login
           </Link>
           </Nav.Link> 
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  )
}

export default Header
