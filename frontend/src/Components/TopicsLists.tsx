import React, { ReactNode, useEffect, useState } from "react";
import "../styles/main.scss";
import TopicItem, { TopicProps } from "./TopicItem";
import { useAppSelector , useAppDispatch} from "../app/hooks";
import { updateTopicsList } from "../features/topicsListsStore";
import config from "../config";
import { AnyIfEmpty } from "react-redux";

export type TopicListProps = {
  data: TopicProps[] | null;
};

const renderTopicLists = (data: TopicProps[]) => {
  return data.map((obj, idx) => {
    return (
      <TopicItem
        key={idx}
        icon={obj.icon}
        tagTitle={obj.tagTitle}
        text={obj.text}
      />
    );
  });
};

const sampleData = config.TopicsListData;

const TopicsList = () => {
  const dispatch = useAppDispatch();

  // FOR TESTING PURPOSES!!!
  // NORMALLY THIS WILL BE DONE BY AN API CALL ON THE REDUX STORE SIDE
  // NOT HERE
  const topics = dispatch(updateTopicsList(sampleData));
  const [data, setData] = useState<TopicProps[] | null>(null);

  useEffect(() => {
    if (topics.payload) {
      setData(topics.payload);
    }
  }, [topics]);

  return (
    <div className="content-wrapper ">
      <div className="reading-lists-header">
        <div className="reading-lists-header-wrapper col-10 col-xl-8 ">
          <div className="header-title">Topics</div>
          <div className="header-text">
            Find everything from design inspiration to best practices,
            freelancing tips to tools.
          </div>
        </div>
      </div>
      <div className="reading-lists-content d-md-flex col-xl-10 col-md-12 col-10 flex-wrap justify-content-center">
        {data ? renderTopicLists(data) : "Loading..."}
      </div>
    </div>
  );
};

export default TopicsList;
