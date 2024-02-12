import React, { useEffect, ChangeEvent, useState, SyntheticEvent, BaseSyntheticEvent } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setProfileData, prevStep, nextStep } from "../../features/signupStore";
//UI/CSS IMPORTS
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import defaultUser from "../../Assets/images/default-image-png.png";
import { FaCamera } from "react-icons/fa";
import { profileSchema } from "../../schemas/SignupSchema";
import "../../styles/components/ProfileSignup.scss";


export interface ProfileState {
  profilePic?: FileList | string 
  fileName?: string
  fileType?: string
}

const ProfileSignup: React.FC<ProfileState> = (props) => {
  const profileState = useAppSelector((state) => state.signup.data.profileData);
  const [selectedImage, setSelectedImage] = useState(defaultUser);
  const dispatch = useAppDispatch();
  const methods = useForm<ProfileState>({
    resolver: yupResolver(profileSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors,},
    reset,
    setValue,
  } = methods;


  
  const onSubmit = (data: ProfileState) => {
    // props.onSubmit(data, Direction.NEXT);
    dispatch(setProfileData({...data, profilePic: selectedImage}));
    dispatch(nextStep());
  };

  const convert2Base64Img = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const dataURl = e.target?.result;
          resolve(dataURl as string)
        }

        reader.onerror = (err) => {
          reject(err)
        }
        reader.readAsDataURL(file)
    })

  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];


    if (file) {
      setValue("fileName", file.name);
      setValue("fileType", file.type);

      convert2Base64Img(file)
      .then(dataUrl => {
        setSelectedImage(dataUrl as string)
        
      })
      .catch(err => {
        console.error("Error:", err);
      })
    }

  };

  useEffect(() => {
    register('fileName');
    register('fileType');

    if (Object.keys(profileState).length > 0) {
      reset({
        ...profileState,
      });

      const file = profileState.profilePic
      if (file instanceof FileList) {
        convert2Base64Img(file?.item(0) as File)
        .then(dataUrl => {
          setSelectedImage(dataUrl as string)
        })
        .catch(err => {
          console.error("Error:", err);
        })
      }else{
        setSelectedImage(file as string)
      }
    }
  }, [register, reset]);
          
  return (
    <Row className="">
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)} >
          <Row className=" my-3">
            <Row className="my-2">
              <h3>Almost there...</h3>
            </Row>
            <Row>
              <p>Select a profile pic</p>
            </Row>
          </Row>
          <Form.Group
            controlId="formFile"
            className="mb-3 d-flex flex-column align-items-center"
          >
            <div className="pic-holder-container d-flex align-items-center justify-content-center">
              <div className="pic-holder">
                <Image id="profilePic" className="pic" src={selectedImage} />
                
              <input
                {... register("profilePic")}
                className="uploadProfileInput"
                type="file"
                // name="profile_pic"
                id="newProfilePhoto"
                accept="image/*"
                style={{ opacity: 0 }}
                onChange={handleImageUpload}
              />
                <label htmlFor="newProfilePhoto" className="upload-file-block">
                  <div className="text-center">
                    <div className="mb-2">
                      <FaCamera />
                    </div>
                    <div className="text-uppercase">
                      Update <br />
                      Profile Photo
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <Form.Text className="text-muted">
              {errors.profilePic && (
                <p className="text-danger mb-0">{errors.profilePic?.message}</p>
              )}
            </Form.Text>
          </Form.Group>
          <Row className="d-flex ">
            <Col className="d-flex justify-content-center">
              <Button
                className="sign-in-btn"
                variant="dark"
                type="button"
                onClick={() => {
                  dispatch(prevStep())
                }}
              >
                Previous
              </Button>{" "}
            </Col>
            <Col className="d-flex justify-content-center">
              <Button className="sign-in-btn" variant="dark" type="submit">
                Next
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

export default ProfileSignup;
