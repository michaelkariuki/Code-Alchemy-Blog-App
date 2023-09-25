import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet } from "react-router-dom";
import logo from "../Assets/images/codeAlchemyLogoBlack.svg";
import SearchComponent from "./Search";
import "../styles/components/navbar.scss";
import Image from 'react-bootstrap/Image';

// import NavDropdown from "react-bootstrap/NavDropdown";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

function NavBar() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto nav-links">
              <Nav.Link href="#home">Popular </Nav.Link>
              <Nav.Link href="#home" className="special-nav rounded-4 px-3">New</Nav.Link>
              <Nav.Link href="#home">Reading list </Nav.Link>
              <Nav.Link href="#home">Topics </Nav.Link>
              <Nav.Link href="#home">Subscribe </Nav.Link>
            </Nav>
            <SearchComponent />
            <div className=" account-btn d-flex align-self-stretch align-items-center justify-content-center" >
              <Image src="holder.js/171x180" roundedCircle fluid />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default NavBar;
