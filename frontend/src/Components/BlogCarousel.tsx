import React from "react";
import { BlogListItemProps } from "./BlogListItem";
import Carousel from "react-bootstrap/Carousel";
import { Image } from "react-bootstrap";
import "../styles/components/BlogCarousel.scss";

export type BlogCarouselProps = {
  blogItems: BlogListItemProps[] | null;
};


// export type BlogCarouselProps =  BlogListItemProps[] | null;


type BlogCarouselItemProps = {
  blogItem: BlogListItemProps | null;
};

const BlogCarousel: React.FC<BlogCarouselProps> = ({ blogItems }) => {
  const renderBlogCarouselItems = (blogs: BlogListItemProps[]) => {
    return blogs.map((obj, idx) => {
      return (
        <Carousel.Item key={idx} className="blog-carousel-item ">
          <Image className="blog-carousel-image" src={obj?.image} fluid />
          <Carousel.Caption className="blog-carousel-text-wrapper">
            <div className="carousel-item-user-n-tag">
              BY&nbsp;&nbsp;
              <span className="">
                {obj?.username.toUpperCase()}
              </span>
              &nbsp;&nbsp; IN &nbsp;&nbsp;
              <span className="">{obj?.tag.toUpperCase()}</span>
            </div>
            <div className="carousel-item-title">{obj?.title}</div>
            <div className="carousel-item-prev-text">{obj?.previewText}</div>
          </Carousel.Caption>
        </Carousel.Item>
      );
    });
  };

  return (
    <Carousel  controls={false} className="blog-carousel-wrapper col">
      {blogItems ? renderBlogCarouselItems(blogItems) : "Loading..."}
    </Carousel>
  );
};

export default BlogCarousel;
