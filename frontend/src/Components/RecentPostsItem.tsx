import React, { useState } from "react";
import { Image } from "react-bootstrap";
import config from "../config";
import LinesEllipsis from "react-lines-ellipsis";
import { SidePanelRecentItem } from "../Interfaces/BlogTypes";
import "../styles/components/SidePanelContent.scss";

type Props = SidePanelRecentItem

const RecentPostsItem: React.FC<Props> = (props) => {
  return (
    <div className="popular-item-container d-flex">
      <div className="popular-item-text-wrapper w-100 d-flex flex-column justify-content-center">
        <div className="popular-item-tag mb-1">{props.tag.toUpperCase()}</div>
        <LinesEllipsis
          className="popular-item-title"
          text={props.title}
          maxLine="2"
          ellipsis="..."
          trimRight
          basedOn="letters"
        />
      </div>
    </div>
  );
};

export default RecentPostsItem;
