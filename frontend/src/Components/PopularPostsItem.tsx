import React, { useState } from "react";
import { Image } from "react-bootstrap";
import config from "../config";
import LinesEllipsis from "react-lines-ellipsis";
import { SidePanelPopularItem } from "../Interfaces/BlogTypes";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";

import "../styles/components/SidePanelContent.scss";

type Props = SidePanelPopularItem

const PopularPostsItem: React.FC<Props> = (props) => {
  const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

  return (
    <div className="popular-item-container d-flex">
      <div className="popular-item-image d-flex align-items-center">
        <Image
          className="rounded"
          src={props.image}
          alt="Popular Item Logo"
          fluid
        />
      </div>
      <div className="popular-item-text-wrapper w-100 d-flex flex-column justify-content-center">
        <div className="popular-item-tag">{props.tag.toUpperCase()}</div>
        <ResponsiveEllipsis
          className="popular-item-title"
          text={props.title}
          maxLine="2"
          ellipsis="..."
          trimRight
          basedOn="words"
        />
      </div>
    </div>
  );
};

export default PopularPostsItem;
