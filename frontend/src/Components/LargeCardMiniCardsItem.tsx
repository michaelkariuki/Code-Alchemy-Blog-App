import React from "react";
import Card from "react-bootstrap/Card";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
import { BlogListItemProps } from "./BlogListItem";
import "../styles/components/LargeCardMiniCardsItem.scss";

type MiniCardItemProps = {
  tag: string;
  title: string;
};

export type LargeCardMiniCardsItemProps = {
  blogItem: BlogListItemProps;
  miniCardItems: MiniCardItemProps[] | null;
};

const MiniCardItem: React.FC<MiniCardItemProps> = ({ tag, title }) => {
  const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);
  return (
    <div className="mini-card-wrapper d-flex align-items-stretch col-md-6 col ">
      <div className="mini-card-container rounded col-12 d-flex flex-column justify-content-center">
        <div className="mini-card-tag">{tag.toUpperCase()}</div>
        <ResponsiveEllipsis
          className="mini-card-title"
          text={title}
          maxLine="2"
          ellipsis="..."
          trimRight
          basedOn="words"
        />
      </div>
    </div>
  );
};

const LargeCardMiniCardsItem: React.FC<LargeCardMiniCardsItemProps> = ({
  blogItem,
  miniCardItems,
}) => {
  const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

  const renderMiniCards = (data: MiniCardItemProps[]) => {
    return data.map((obj, idx) => {
      return <MiniCardItem key={idx} title={obj.title} tag={obj.tag} />;
    });
  };

  return (
    <div className="lgmi-container row d-flex flex-md-row flex-column">
      <div className="lgmi-image-wrapper col-md-6 pe-md-2">
        <Card className=" text-white">
          <Card.Img src={blogItem.image} alt="blog_card_image" />
          <Card.ImgOverlay className="lgmi-overlay">
            <Card.Text className="content-text">
              BY&nbsp;&nbsp;
              <span className="content-text-variable">
                {blogItem.username.toUpperCase()}
              </span>
              &nbsp;&nbsp; IN &nbsp;&nbsp;
              <span className="">{blogItem.tag.toUpperCase()}</span>
            </Card.Text>
            <Card.Title>
              <ResponsiveEllipsis
                className="content-title"
                text={blogItem.title}
                maxLine="2"
                ellipsis="..."
                trimRight
                basedOn="words"
              />
            </Card.Title>

            <ResponsiveEllipsis
              className="content-text preview-text card-text"
              text={blogItem.previewText}
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="words"
            />
          </Card.ImgOverlay>
        </Card>
      </div>
      <div className="lgmi-mini-cards-wrapper col-md-6 col d-flex flex-wrap flex-md-row flex-column">
        {miniCardItems ? renderMiniCards(miniCardItems) : "Loading..."}
      </div>
    </div>
  );
};

export default LargeCardMiniCardsItem;
