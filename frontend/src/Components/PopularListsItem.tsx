import React from "react";
import { Image } from "react-bootstrap";
import LinesEllipsis from "react-lines-ellipsis";
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
import "../styles/components/PopularListsItem.scss"
export type PopularListsItemProps = {
  index?: string;
  title: string;
  text: string;
  image: string;
};

const PopularListsItem: React.FC<PopularListsItemProps> = ({
  image,
  index,
  text,
  title,
}) => {
  const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);
  const ResponsiveHtmlEllipsis = responsiveHOC()(HTMLEllipsis);

  return (
    <div className="popular-lists-item-wrapper d-flex rounded-start">
      <div className="popular-lists-content-wrapper col">
        <div className="popular-lists-content-idx">{index && index}</div>
        <ResponsiveHtmlEllipsis
          className="popular-lists-content-title"
          unsafeHTML={title}
          maxLine="2"
          ellipsis="..."
          trimRight
          basedOn="letters"
        />
        <ResponsiveEllipsis
          className="popular-lists-content-text"
          text={text}
          maxLine="2"
          ellipsis="..."
          trimRight
          basedOn="words"
        />
      </div>
      <div className="popular-lists-image-wrapper col-md-6 col-4">
        <Image className="rounded-end" src={image} alt="Popular Image" fluid />
      </div>
    </div>
  );
};

export default PopularListsItem;
