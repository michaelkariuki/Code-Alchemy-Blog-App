import React, {useState, useEffect} from "react";
import "../styles/main.scss";
import ReadingListsItem, { ReadingListItemProps } from "./ReadingListItem";
import config from "../config"; // FOR TESTING!!!
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateReadingLists } from "../features/readingListsStore";

export type ReadingListsProps = {
  data: ReadingListItemProps[] | null;
};

const renderReadingLists = (data: ReadingListItemProps[]) => {
  return data.map((obj, idx) => (
    <ReadingListsItem
      key={idx}
      image={obj.image}
      tagTitle={obj.tagTitle}
      text={obj.text}
    />
  ));
};

const sampleData = config.ReadingListsData;

const ReadingLists = () => {
  const [data, setData] = useState<ReadingListItemProps[] | null>(null)
  const dispatch = useAppDispatch()
  const readingLists = dispatch(updateReadingLists(sampleData)).payload;

  useEffect(() => {
    if (readingLists) {
      setData(readingLists)
    }
  })

  return (
    <div className="content-wrapper ">
      <div className="reading-lists-header">
        <div className="reading-lists-header-wrapper col-10 col-xl-8 ">
          <div className="header-title">All reading lists</div>
          <div className="header-text">
            Get in-depth insights on web design, freelancing, content
            management, and  more with these series of related reads.
          </div>
        </div>
      </div>
      <div className="reading-lists-content d-md-flex col-md-10 col-xl-8 flex-md-wrap justify-content-between">
        {data ? renderReadingLists(data) : "Loading..."}
      </div>
    </div>
  );
};

export default ReadingLists;
