import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
import "../styles/components/BlogListItem.scss";

export type BlogListItemProps = {
  title: string;
  username: string;
  tag: string;
  image: string;
  previewText?: string;
  styling?: string;
};

const BlogListItem: React.FC<BlogListItemProps> = (
  props: BlogListItemProps
) => {
  const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

  return (
    <Card
      className={`blog-list-content-wrapper ${
        props.styling ? props.styling : ""
      }`}
    >
      <Card.Img
        className="rounded img-fluid"
        loading="lazy"
        variant="top"
        src={props.image}
      />
      <Card.Body className="px-0">
        <Card.Text className="content-text">
          BY&nbsp;&nbsp;
          <span className="content-text-variable text-dark">
            {props.username.toUpperCase()}
          </span>
          &nbsp;&nbsp; IN &nbsp;&nbsp;
          <span className="text-dark">{props.tag.toUpperCase()}</span>
        </Card.Text>
        <Card.Title className="content-title text-dark">
          <ResponsiveEllipsis
            // className=""
            text={props.title}
            maxLine="2"
            ellipsis="..."
            trimRight
            basedOn="words"
            
          />
        </Card.Title>
        {props.previewText && (
          <Card.Text className="content-text preview-text">
            <ResponsiveEllipsis
              // className=""
              text={props.previewText}
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="words"
            />
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default BlogListItem;
