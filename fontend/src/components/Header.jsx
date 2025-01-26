import React from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {useLogoutMutation} from '../slice/userApiSlice.js'
import { logout } from '../slice/authSlice.js';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation()
  

  const { userInfo } = useSelector((state) => state.auth);

  // Logout Handler
  const logoutHandler =async () => {
    try{
  await logoutApiCall().unwrap()
      dispatch(logout()); // Dispatch logout action
      navigate('/'); // Redirect to login page
    }catch{
      console.log('er');
      
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>
        {/* Brand Name */}
        <Navbar.Brand as={Link} to="/" className="fw-bold text-uppercase">
          MAUTH
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-3">
            {userInfo ? (
              <NavDropdown title={userInfo.fullName} id="username" className="text-light">
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                {/* Sign In Button */}
                <Link to="/login">
                  <Button variant="outline-light" className="px-4">
                    Sign In
                  </Button>
                </Link>

                {/* Register Button */}
                <Link to="/register">
                  <Button variant="primary" className="px-4">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
