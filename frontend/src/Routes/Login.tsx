// import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Store } from "react-notifications-component";
import { useNavigate } from "react-router-dom";
import ClassUtilities from "../Utilities/ClassUtilities";

import config from "../config";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import logo from "../Assets/images/codeAlchemyLogoBlack.svg";

interface FormState {
  password: string;
  email: string;
}

const LoginPage = () => {
  const navigate = useNavigate();

  const methods = useForm<FormState>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormState) => {
    // console.log("Submitted: ", isSubmitSuccessful, errors)
    console.log("Data : ", data);
    handleLogin(data);
  };

  const handleLogin = async (data: FormState) => {
    try{
      const response = await fetch(
        config.backendConfig.backendRoot + config.backendConfig.auth("login"),
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type" : "application/json"
          }
        }
      );

      const responseData = await response.json()

      if(responseData.message){
        let notification = {
          title: responseData?.message?.title,
          message: responseData?.message?.text,
          type: responseData?.message?.type,
        };
  
        ClassUtilities.triggerNotification(Store, notification);
        console.log(responseData)
      }else{
        navigate("/")
      }
    }catch (error) {
      throw error;
    }
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      fluid
    >
      <Row className="vh-100 col-xl-4 col-lg-5 col-md-6 col-sm-10 align-items-center ">
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
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
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email required"
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Wrong email format"
                  },
                })}
              />
              <Form.Text className="text-muted">
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password",{
                  required: {
                    value: true,
                    message: "Password required"
                  }
                })}
              />
              <Form.Text className="text-muted">
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </Form.Text>
            </Form.Group>
            <Form.Group
              className="d-flex mb-3 justify-content-between"
              controlId="formBasicCheckbox"
            >
              <Form.Check type="checkbox" label="Remember me for 30 days" />
              <a className="forgot-password" href="#passchange">
                Forgot my password
              </a>
            </Form.Group>
            <Row className="d-grid gap-2">
              <Button className="sign-in-btn" variant="dark" type="submit">
                Sign in
              </Button>
            </Row>
            <Form.Group
              className="d-flex mt-2 justify-content-center"
              controlId="formBasicCheckbox"
            >
              <Form.Text className="text-muted d-inline ">
                Don't have an account?
                <a className="sign-up-link" onClick={() => {navigate("/signup", {replace: true})}} style={{cursor: "pointer"}}>
                  {" "}
                  Sign up
                </a>
              </Form.Text>
            </Form.Group>
          </Form>
        </FormProvider>
      </Row>
    </Container>
  );
}

export default LoginPage;
