import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import BlogListItem, { BlogListItemProps } from "../Components/BlogListItem";
import SidePanelContentWrapper from "../Components/SidePanelContentWrapper";
import SocialMediaLists from "../Components/SocialMediaLists";
import {
  SidePanelWrapperProps,
} from "../Interfaces/BlogTypes";
import SidePanelSlider from "../Components/SidePanelSlider";

import config from "../config";

type UserProfileProps = {
  banner: string;
  profilePic: string;
  userTitle: string;
  socialMedia?: string[];
};

type ProfileContentProps = {
  primary?: BlogListItemProps[];
  sidePanel?: SidePanelWrapperProps[];
};

type ProfileProps = {
  userProps : UserProfileProps
  contentProps : ProfileContentProps
};

const ProfilePage = (props: ProfileProps) => {

  const renderPrimaryContent = (content: BlogListItemProps[]) => {
    return content.map((obj, idx) => (
      <BlogListItem
        key={idx}
        image={obj.image}
        tag={obj.tag}
        title={obj.title}
        username={obj.username}
      />
    ));
  };

  const renderSidePanelContent = (content: SidePanelWrapperProps[]) => {
    return content.map((obj, idx) => (
      <div key={idx} className="popular-items-wrapper">
        <SidePanelContentWrapper
          type={obj.type}
          title={obj.title}
          content={obj.content}
        />
      </div>
    ));
  };

  return (
    <Container className="content-wrapper" fluid>
      <Row className="content profile-banner-wrapper banner-offset">
        <Image className="profile-banner" src={props.userProps.banner} fluid />
        <div className="profile-pic-wrapper col-lg-10 col-xl-8">
          <Image className="pic-profile" src={props.userProps.profilePic} roundedCircle />
          <div className="profile-text">
            <h3>{props.userProps.userTitle}</h3>
          </div>
          <div className="socials-wrapper">
            <SocialMediaLists type="default" marginRight={true} />
          </div>
        </div>
      </Row>
      <Row className="content blog-items-wrapper flex-column flex-md-row flex-md-nowrap flex-xs-column col-lg-10 col-xl-8">
        <Col className="wrapper blog-items col-md-8 col-sm-10 mx-sm-auto">
          {props.contentProps.primary
            ? renderPrimaryContent(props.contentProps.primary)
            : "Loading content..."}
        </Col>
        <Col className="wrapper blog-items-navigation flex-md-column flex-row">
          {props.contentProps.sidePanel
            ? renderSidePanelContent(props.contentProps.sidePanel)
            : "Loading..."}
             <SidePanelSlider items={config.SidePanelSliderProps} sidePanel={true}/>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
