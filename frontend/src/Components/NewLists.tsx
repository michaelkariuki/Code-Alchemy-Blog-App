import React, { useEffect, useState } from "react";
import BlogListItem, { BlogListItemProps } from "./BlogListItem";
import { useAppDispatch } from "../app/hooks";
import { updateNewLists } from "../features/newListsStore";
import config from "../config"; // FOR TESTING!!!

export type NewListsProps = {
  content: BlogListItemProps[];
};

const specialBlogItemStyle = "new-lists-style  col-md-6 col-xs-12 col-sm-10 mx-md-0 mx-auto"

const renderNewLists = (data: BlogListItemProps[]) => {
  return data.map((obj, idx) => {
    return (
      <BlogListItem
        key={idx}
        image={obj.image}
        tag={obj.tag}
        title={obj.title}
        username={obj.username}
        styling={specialBlogItemStyle}
        previewText={obj.previewText? obj.previewText : undefined}
      />
    );
  });
};

const sampleData = config.blogListItemPropsWithPrevText;

const NewLists = () => {
  const [data, setData] = useState<BlogListItemProps[] | null>(null)
  const dispatch = useAppDispatch()
  const newLists = dispatch(updateNewLists(sampleData)).payload;

  useEffect(() => {
    if (newLists) {
      setData(newLists)
    }
  })

  return (
    <div className="content-wrapper ">
      <div className="reading-lists-header">
        <div className="reading-lists-header-wrapper col-10 col-xl-8 ">
          <div className="header-title">New</div>
          <div className="header-text">
            Our latest web design tips, tricks, insights, and resources, hot off
            the presses.
          </div>
        </div>
      </div>
      <div className="reading-lists-content row gx-3 d-md-flex col-xl-8 col-lg-10 col-10 flex-wrap ">
        {data ? renderNewLists(data) : "Loading..."}
      </div>
    </div>
  );
};

export default NewLists;
