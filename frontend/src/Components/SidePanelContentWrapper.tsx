import React, { useState } from "react";
import PopularPostsItem from "./PopularPostsItem";
import RecentPostsItem from "./RecentPostsItem";
import SocialMediaLists from "./SocialMediaLists";
import {
  SidePanelWrapperProps,
  SidePanelContent,
  SidePanelPopularItem
} from "../Interfaces/BlogTypes";
// interface SidePanelContent
import "../styles/components/SidePanelContent.scss"

const SidePanelContentWrapper: React.FC<SidePanelWrapperProps> = (props) => {
  const renderContentList = (content: SidePanelContent) => {
    if(Array.isArray(content)){
      if (props.type === "PopularPosts") {
        return content?.map((obj, idx) => {
          const o = obj as SidePanelPopularItem;
          return (
              <PopularPostsItem
              key={idx}
              title={o.title}
              tag={o.tag}
              image={o.image}
              />
          )
        });
      } else if (props.type === "RecentPosts") {
          return content?.map((obj, idx) => (
              <RecentPostsItem
                  key={idx}
                  tag={obj.tag}
                  title={obj.title}
              />
          ));
      }
    }else{
      if(props.type === "SocialMediaIcons"){
        return (
          <SocialMediaLists type={content?.type as string}/>
        )
      }
    }
  };

  return (
    <div className="side-panel-content-wrapper rounded col-12 col-sm-10 col-md-12 mx-auto">
      <div className="text-center mt-2 mb-4" >{props?.title.toUpperCase()}</div>
      <div>
        {props.content
          ? renderContentList(props.content)
          : "No data"}
      </div>
    </div>
  );
};

export default SidePanelContentWrapper;
