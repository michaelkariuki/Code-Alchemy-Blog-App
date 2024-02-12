import React, { useEffect, ChangeEvent, useState } from "react";
import { useForm, FormProvider} from "react-hook-form";
import { bioTagsSchema } from "../../schemas/SignupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setBioData, prevStep, toggleVisibility, toggleSignupSuccess } from "../../features/signupStore";
//UI/CSS IMPORTS
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Select, { ActionMeta, OnChangeValue, } from "react-select";
import "../../styles/components/ProfileSignup.scss";


export interface BioState {
  bio?: string;
  interests?: string[];
}

interface BioSignupProps {
  bioData: BioState | undefined;
  onSubmit: (data: BioState, direction: string) => void;
  onPrev: () => void;
}

interface Option {
  value: string;
  label: string;
}

const BioTagsSignup: React.FC<BioState> = (props) => {
  const bioTagsState = useAppSelector((state) => state.signup.data.bioData);
  const [characterCount, setCharacterCount] = useState(0);
  const [selected, setSelected] = useState<Option[]>([]);
  const dispatch = useAppDispatch();
  const maxBioLength = 150;

  const options: Option[] = [
    { value: "Finance", label: "Finance" },
    { value: "Occult", label: "Occult" },
    { value: "Fitness", label: "Fitness" },
  ];

  const methods = useForm<BioState>({
    resolver: yupResolver(bioTagsSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    setError,
    clearErrors,
  } = methods;

  const onSubmit = async (data: BioState) => {
    dispatch(setBioData(data));
    dispatch(toggleVisibility());
    dispatch(toggleSignupSuccess());
  };

  const handleBioInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setCharacterCount(value.length);
  };

  const handleInterestsChange = (interests: OnChangeValue<Option, true>, options: ActionMeta<Option>) => {
    const arr = interests.map(option => option.value)
    setSelected(interests as Option[])
    setValue("interests",arr )
  };

  useEffect(() => {
    if (Object.keys(bioTagsState).length > 0) {
      reset({
        ...bioTagsState,
      });
      
      const selected = options.filter(option => bioTagsState?.interests?.includes(option.value))
      setSelected(selected)
      setCharacterCount(bioTagsState?.bio?.length as number)

      if (characterCount > maxBioLength) {
        setError("bio", {
          type: "manual",
          message: "Bio must not exceed 150 characters",
        });
      }else{
        clearErrors();
      }
 
    }
  }, [
    clearErrors,
    setError,
  ]);

  const { onBlur, name, ref } = register("interests");
  return (
    <Row className="">
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className=" my-3">
            <Row className="my-2">
              <h3>Last Step...</h3>
            </Row>
            <Row>
              <p>Please fill out your bio information</p>
            </Row>
          </Row>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel
              controlId="floatingTextarea2"
              label={`Tell us about yourself 
              ${characterCount}/${maxBioLength}`}
            >
              <Form.Control
                {...register("bio")}
                as="textarea"
                style={{ height: "150px" }}
                onChange={handleBioInputChange}
              />
            </FloatingLabel>
            <Form.Text className="text-muted">
              {errors.bio && (
                <p className="text-danger mb-0">{errors.bio?.message}</p>
              )}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">

            <Select
              onBlur={onBlur} // assign onBlur event
              name={name} // assign name prop
              ref={ref} // assign ref prop
              options={options}
              // {...register("interests")}
              placeholder="Select interest(s)"
              value={selected}
              onChange={handleInterestsChange}
              isMulti
            />
          </Form.Group>
          <Row className="d-flex mt-4">
            <Col className="d-flex justify-content-center">
              <Button
                className="sign-in-btn"
                variant="dark"
                type="button"
                onClick={() => dispatch(prevStep())}
              >
                Previous
              </Button>{" "}
            </Col>
            <Col className="d-flex justify-content-center">
              <Button className="sign-in-btn" variant="dark" type="submit">
                Signup!
              </Button>{" "}
            </Col>
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

export default BioTagsSignup;
