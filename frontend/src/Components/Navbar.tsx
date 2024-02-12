import { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet } from "react-router-dom";
import SearchComponent from "./Search";
import "../styles/components/navbar.scss";
import Image from "react-bootstrap/Image";
import logo from "../Assets/images/codeAlchemyLogoBlack.svg";
import defaultUser from "../Assets/images/default-image-png.png";
import Col from "react-bootstrap/Col";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import ProfileMenu from "./ProfileMenu";
import NavDropdown from 'react-bootstrap/NavDropdown';


// import { useLocation } from 'react-router-dom';

// import NavDropdown from "react-bootstrap/NavDropdown";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

function NavBar() {
  const location = useLocation();
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);

  const styles = {
    home: "nav-bar-home",
    navTextWhite: "nav-links-white",
    navTextBlack: "nav-links-black",
  };

  const navbarRef = useRef<HTMLDivElement>(null);
  const actualNavbarRef = useRef<HTMLDivElement | null>(null); // create a ref for the navbar


  const handleNavbarToggle = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  const isPathHome = (path: string) => {
    return path === "/";
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      // console.log(
      //   "Intersection Observer Entry (Instersecting):",
      //   entry.isIntersecting
      // );
      if (!entry.isIntersecting) {
        // Navbar is not at the top, remove a specific class
        setIsNavbarSticky(true);
      } else {
        setIsNavbarSticky(false);
      }
    });
  };

  useEffect(() => {
    document.getElementById('root')?.click();
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (navbarRef.current) {
      observer.observe(navbarRef.current);
    }

    if (actualNavbarRef.current) {
      actualNavbarRef.current.click();
      console.log("Navbar clicked")
    }

    return () => {
      if (navbarRef.current) {
        observer.unobserve(navbarRef.current);
      }
    };
  }, []);

  const shouldApplyNavAbsolute =
    isPathHome(location.pathname) && !isNavbarSticky;

  return (
    <>
      <div ref={navbarRef}></div>

      <Navbar
        ref={actualNavbarRef}
        expand="lg"
        collapseOnSelect={true}
        className={`col-12 nav-wrapper ${
          shouldApplyNavAbsolute ? "nav-absolute" : "sticky-top"
        }`}
      >
        <Container fluid className="ms-5 d-flex justify-content-end">
          <Navbar.Brand>
            <Link to={""} className="nav-link">
              <img
                src={logo}
                width="48"
                height="30"
                className="d-inline-block align-top"
                alt="Code Alchemy logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleNavbarToggle}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className={`me-auto nav-links ${
                shouldApplyNavAbsolute
                  ? styles.navTextWhite
                  : styles.navTextBlack
              }`}
            >
              <Link to={"popular"} className="nav-link">
                Popular
              </Link>
              <Link to={"new"} className="nav-link">
                <Col className="d-inline special-nav rounded-4 px-3 py-2">
                  New
                </Col>
              </Link>

              <Link to={"reading-lists"} className="nav-link">
                Reading list
              </Link>

              <Link to={"topics"} className="nav-link">
                Topics
              </Link>

              <NavDropdown title="Blog" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to={"blog/new"} className="nav-link">
                  Create Blog 
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <div
              role="navigation"
              className=" account-btn d-flex align-self-stretch align-items-center justify-content-between"
            >
              <SearchComponent isNavbarCollapsed={isNavbarCollapsed} />
              {/* <Button className="p-0 m-0 rounded-circle">
  <Image
      className="profile-icon"
      src={defaultUser}
      thumbnail
      roundedCircle
    />
  </Button> */}
              <ProfileMenu
                username={"dominodomina"}
                firstName={"Domino"}
                lastName={"Domina"}
              />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
