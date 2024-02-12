import React from "react";
import ReadingListsItem, { ReadingListItemProps } from "./ReadingListItem";
import PopularListsItem, {PopularListsItemProps} from "./PopularListsItem";
type PopularListsProps = {
  ReadingListsType: ReadingListItemProps;
  content: PopularListsItemProps[] | null;
};

const PopularLists: React.FC<PopularListsProps> = ({
  ReadingListsType,
  content,
}) => {
    const ReadingListStyling = "popular-lists-style"
    const renderPopularLists = (data: PopularListsItemProps[]) => {
        return data.map((obj, idx) => {
          return (
            <PopularListsItem
              key={idx}
              index={(idx+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}
              image={obj.image}
              title={obj.title}
              text={obj.text}
            />
          );
        });
      };

  return (
    <div className="content-wrapper ">
      <div className="reading-lists-header">
        <div className="reading-lists-header-wrapper col-10 col-xl-7 ">
          <div className="header-title">Reading Lists</div>
          <div className="header-text">
            <ReadingListsItem
              image={ReadingListsType.image}
              tagTitle={"Popular"}
              text={ReadingListsType.text}
              styles={ReadingListStyling}
            />
          </div>
        </div>
      </div>
      <div className="reading-lists-content row d-md-flex col-xl-8 col-sm-10 col-11 flex-wrap justify-content-center">
        {content ? renderPopularLists(content) : "Loading..."}
      </div>
    </div>
  );
};

export default PopularLists;
