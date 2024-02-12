import React, { useEffect, useState } from "react";
import { BlogEditorProps } from "../BlogEditor/BlogEditor";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { useNavigate } from "react-router-dom";
import "../../styles/components/Blog/BlogPage.scss";
import { FaArrowLeft } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateBlogState } from "../../features/createBlogStore";

type BlogPageProps = BlogEditorProps;

export const convertBlogContent = (blogContent: string) => {
  const options = {
    linkTarget: "_blank",
  };
  const converter = new QuillDeltaToHtmlConverter(
    JSON.parse(blogContent)["ops"],
    options
  );
  return converter.convert();
};

const BlogPage: React.FC<BlogPageProps | any> = () => {
  const [blogPageData, setBlogPageData] = useState<BlogEditorProps>({
    blogTitle: "",
    blogSlug: "",
    blogDescription: "",
    blogContent: "",
  });
  const blogState = useAppSelector((state) => state.createBlog);
  const navigate = useNavigate();


  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    // const convertedContent = convertBlogContent(blogContent);
    setBlogPageData(blogState);
  }, [blogPageData, blogState]);

  return (
    <div className="content-wrapper ">
      <div className="reading-lists-header">
        <div className="reading-lists-header-wrapper col-10 col-xl-8  d-flex">
          <div className="col">
            <div className="header-title">{blogPageData.blogTitle}</div>
            <div className="header-text blog-description-text">
              {blogPageData.blogDescription}
            </div>
          </div>
          <div className="col-2 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-light editor-actions special-btn"
              id="preview"
              form="editorForm"
              onClick={goBack}
            >
              {" "}
              <span>
                <FaArrowLeft />
              </span>{" "}
              Go back
            </button>
          </div>
        </div>
      </div>
      <div className="reading-lists-content d-md-flex col-xl-8 col-md-12 col-10 flex-wrap justify-content-center">
        <div
          className="blog-content col-xl-12 col-md-10 col"
          dangerouslySetInnerHTML={
            blogPageData.blogContent
              ? {
                  __html: convertBlogContent(
                    blogPageData.blogContent
                  ) as string,
                }
              : { __html: "" }
          }
        ></div>
      </div>
    </div>
  );
};

export default BlogPage;
