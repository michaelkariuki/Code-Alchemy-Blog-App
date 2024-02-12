import React from "react";
import { Image } from "react-bootstrap";
import "../styles/components/TopicItem.scss";

export type TopicProps = {
  icon: string;
  tagTitle: string;
  text: string;
};

const TopicItem = (props: TopicProps) => {
  return (
    <div className="topic-list-item-wrapper col-md-5 col-12 mx-md-2 mx-auto rounded">
      <div className="topic-list-content-wrapper col">
        <div className="item-title">
          <span>
            <Image
              src={props.icon}
              alt={props.tagTitle + "_img"}
              rounded
              fluid
            />
          </span>
          {props.tagTitle}
        </div>
        <div className="item-text">{props.text}</div>
      </div>
    </div>
  );
};

export default TopicItem;
