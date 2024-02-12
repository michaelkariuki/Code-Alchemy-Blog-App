// import FormProgressBar from "./FormProgressBar";
import { useEffect } from "react";
import { Store } from "react-notifications-component";
import { useNavigate } from "react-router-dom";

import ClassUtilities from "../Utilities/ClassUtilities";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toggleSignupSuccess, toggleVisibility } from "../features/signupStore";
import { registerUser, signupResponse } from "../features/signupStore";

import FormProgressBar from "./FormProgressBar";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

import ProfileSignup from "../Routes/SignupStepForm/ProfileSignup";
import AccountSignup from "../Routes/SignupStepForm/AccountSignup";
import BioTagsSignup from "../Routes/SignupStepForm/BioTagsSignup";


export enum FormSteps {
  AccountSetup = "Account Setup",
  ProfileSetup = "Profile Picture",
  BioSetup = "Bio Setup",
}

export const formSteps: FormSteps[] = [
  FormSteps.AccountSetup,
  FormSteps.ProfileSetup,
  FormSteps.BioSetup,
];

const SignupFormWrapper = () => {
    const {currentStep, isVisible, signupSuccess} = useAppSelector((state) => state.signup.wrapperData);
    const {data, wrapperData} = useAppSelector((state) => state.signup);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      if(signupSuccess){
        dispatch(registerUser({data: data})).then((action) => {
          dispatch(toggleSignupSuccess());
          dispatch(toggleVisibility());

          ClassUtilities.triggerNotification(Store, (action.payload as signupResponse).message);
          navigate("/login", {replace: true});

        }).catch((error) => {
          ClassUtilities.triggerNotification(Store, error.message);
          console.log(error);
          
        });
      }
    });

  return (
 <Container className="form-card rounded my-5 py-5 col-xl-6 col-lg-8 col-md-8 col-sm-12">
        <Container className="col-12 d-flex mx-auto">
          <FormProgressBar step={currentStep} crumbs={formSteps} />
        </Container>

        {isVisible ? (
          <Container className="d-flex flex-column align-items-center">
            {currentStep === 1 && (
              <AccountSignup/>
            )}

            {currentStep === 2 && (
              <ProfileSignup/>
            )}

            {currentStep === 3 && (
              <BioTagsSignup/>
            )}
          </Container>
        ) : (
          <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "300px" }}
            fluid
          >
            <Spinner animation="border" className="" />
          </Container>
        )}
      </Container>
    );
  
}

export default SignupFormWrapper;
