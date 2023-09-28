import { useState } from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet } from "react-router-dom";
import SearchComponent from "./Search";
import "../styles/components/navbar.scss";
import Image from 'react-bootstrap/Image';
import logo from "../Assets/images/codeAlchemyLogoBlack.svg";
import defaultUser from "../Assets/images/default-image-png.png"
import Col from 'react-bootstrap/Col'

// import NavDropdown from "react-bootstrap/NavDropdown";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

function NavBar() {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true)

  const handleNavbarToggle = () =>{
    setIsNavbarCollapsed(!isNavbarCollapsed);

  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary sticky-top">
        <Container fluid className="ms-5 d-flex justify-contnent-end">
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="48"
              height="30"
              className="d-inline-block align-top"
              alt="Code Alchemy logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle
           aria-controls="basic-navbar-nav" 
           onClick={handleNavbarToggle}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto nav-links">
              <Nav.Link href="#home">Popular </Nav.Link>
              <Nav.Link href="#other" className='nav-special'>
                <Col className="d-inline special-nav rounded-4 px-3 py-2" >New</Col>
              </Nav.Link>
              <Nav.Link href="#home">Reading list </Nav.Link>
              <Nav.Link href="#home">Topics </Nav.Link>
              <Nav.Link href="#home">Subscribe </Nav.Link>
            </Nav>
            
            <div role="navigation" className=" account-btn d-flex align-self-stretch align-items-center justify-content-between" >
              <SearchComponent isNavbarCollapsed={isNavbarCollapsed} />
              <Image className="profile-icon" src={defaultUser} thumbnail roundedCircle />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default NavBar;


