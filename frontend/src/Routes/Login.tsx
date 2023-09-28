import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import logo from "../Assets/images/codeAlchemyLogoBlack.svg";

function BasicExample() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      fluid
    >
      <Row className="vh-100 col-xl-4 col-lg-5 col-md-6 col-sm-10 align-items-center ">
        <Form>
          <Row>
            <Row className="justify-content-center">
              <Image
                className="profile-icon"
                src={logo}
                width={48}
                height={48}
              />
            </Row>
            <Row className=" my-3 text-center">
              <Row className="my-2">
                <h3>Log in to your account</h3>
              </Row>
              <Row>
                <p>Welcome back! Please enter your details.</p>
              </Row>
            </Row>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="d-flex mb-3 justify-content-between" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me for 30 days" />
            <a className="forgot-password" href="#passchange">Forgot my password</a>
          </Form.Group>
          <Row className="d-grid gap-2">
            <Button className="sign-in-btn" variant="dark" type="submit">
              Sign in
            </Button>
          </Row>
          <Form.Group className="d-flex mt-2 justify-content-center" controlId="formBasicCheckbox">
            <Form.Text className="text-muted d-inline ">
              Don't have an account?
              <a className="sign-up-link" href="#passchange"> Sign up</a>
            </Form.Text>
          
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
}

export default BasicExample;
