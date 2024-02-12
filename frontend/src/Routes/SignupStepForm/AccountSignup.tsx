import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { accountSignupSchema } from "../../schemas/SignupSchema";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setAccountData, nextStep } from "../../features/signupStore";
//UI/CSS IMPORTS
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export interface AccountState {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AccountSignup: React.FC<AccountState | any> = (props) => {
  const accountState = useAppSelector((state) => state.signup.data.accountData);
  const dispatch = useAppDispatch();

  const methods = useForm<AccountState>({
    resolver: yupResolver(accountSignupSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = async (data: AccountState) => {
    // props.onSubmit(data);
    dispatch(setAccountData(data));
    dispatch(nextStep());
  };

  useEffect(() => {
    if (Object.keys(accountState).length > 0) {
      reset({
        ...accountState,
      });
    }
  }, [reset, accountState]);

  return (
    <Row className=" ">
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)} >
          <Row>
            <Row className=" my-3 text-start">
              <Row className="my-2">
                <h2>Sign Up</h2>
              </Row>
              <Row>
                <p>Create your account to get started.</p>
              </Row>
            </Row>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>First Name*</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                {...register("first_name")}
              />
              <Form.Text className="text-muted">
                {errors.first_name && (
                  <p className="text-danger mb-0">
                    {errors.first_name?.message}
                  </p>
                )}
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Last Name*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                {...register("last_name")}
              />
              <Form.Text className="text-muted">
                {errors.last_name && (
                  <p className="text-danger mb-0">{errors.last_name?.message}</p>
                )}
              </Form.Text>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              {...register("username")}
            />
            <Form.Text className="text-muted">
              {errors.username && (
                <p className="text-danger">{errors.username?.message}</p>
              )}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address*</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email")}
            />
            <Form.Text className="text-muted">
              {errors.email && (
                <p className="text-danger">{errors.email?.message}</p>
              )}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              {...register("password")}
            />
            <Form.Text className="text-muted">
              {errors.password && (
                <p className="text-danger">{errors.password?.message}</p>
              )}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            <Form.Text className="text-muted">
              {errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword?.message}</p>
              )}
            </Form.Text>
          </Form.Group>
          <Row className="d-grid gap-2">
            <Button className="sign-in-btn" variant="dark" type="submit">
              Next
            </Button>
          </Row>
          <Form.Group
            className="d-flex mt-4 justify-content-center"
            controlId="formBasicCheckbox"
          >
            <Form.Text className="text-muted d-inline ">
              Already have an account?
              <a className="sign-up-link" href="#passchange">
                {" "}
                Login
              </a>
            </Form.Text>
          </Form.Group>
        </Form>
      </FormProvider>
    </Row>
  );
};

export default AccountSignup;
