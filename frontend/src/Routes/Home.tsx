import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import HomeCardItem from "../Components/HomeCardItem";
import BlogCarousel  from "../Components/BlogCarousel";
import {BlogListItemProps} from "../Components/BlogListItem";
import LargeCardMiniCardsItem, { LargeCardMiniCardsItemProps } from "../Components/LargeCardMiniCardsItem";
import SidePanelSlider, {SidePanelSliderProps} from "../Components/SidePanelSlider";

// type Content = {
//   tagTitle: string,
//   items: LargeCardMiniCardsItemProps | null
// }

type CardContent = {
  tagTitle: string,
  items: LargeCardMiniCardsItemProps 
}

type SliderContent = {
  tagTitle: string,
  items: SidePanelSliderProps 
}

export type HomePageProps = {
  blogCarouselItems: BlogListItemProps[];
  homeCardItems: {
    cards?: CardContent[];
    slider?: SliderContent
  }
};

const HomePage: React.FC<HomePageProps> = ({
  blogCarouselItems,
  homeCardItems,
}) => {
  const renderCards = (data: CardContent[]) => {
    return data.map((obj, idx) => {
      return (
        <HomeCardItem
          key={idx}
          tagTitle={obj.tagTitle}
          component={LargeCardMiniCardsItem}
          componentProps={obj.items}
        />
      );
    });
  };

  const renderSlider = (data: SliderContent) => {
    return (
      <HomeCardItem
        // key={idx}
        tagTitle={data.tagTitle}
        component={SidePanelSlider}
        componentProps={data.items}
      />
    );
  };

  return (
    <Container className="content-wrapper" fluid>
      <Row className="content home-carousel-wrapper">
        <BlogCarousel blogItems={blogCarouselItems} />
      </Row>
      <Row className="content blog-items-wrapper flex-column  col-lg-10 col-xl-8">
        {homeCardItems.cards ? renderCards(homeCardItems.cards) : "Loading..."}
        {homeCardItems.slider ? renderSlider(homeCardItems.slider) : "Loading..."}

      </Row>
    </Container>
  );
};

export default HomePage;
