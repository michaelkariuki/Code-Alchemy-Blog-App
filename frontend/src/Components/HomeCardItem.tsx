import React from "react";
import "../styles/components/HomeCardItem.scss";


export interface HomeCardItemProps2<T> {
  component: React.ComponentType<T>;
  componentProps: T;
  tagTitle: string;

}


const HomeCardItem = <T extends Record<string, any>>({
component: Component,
componentProps,
tagTitle
}: HomeCardItemProps2<T>): JSX.Element => {

  return (
    <div className="home-card-item-wrapper row mx-auto justify-content-center">
      <div className="home-card-item-header-section">
        <span className="home-card-item-header-title">{tagTitle}</span>
      </div>
        <Component  {...componentProps} />
    </div>
  );
};

export default HomeCardItem;
