import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  BaseSyntheticEvent,
  useRef,
} from "react";
import ReactQuill, { UnprivilegedEditor } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../styles/components/BlogEditor/BlogEditor.scss";
import { Placeholder } from "react-bootstrap";
import { Field, FieldErrors, useForm } from "react-hook-form";
import "../../styles/main.scss";
import { BsUpload } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  blogEditorSchema,
  BlogEditorDraftSchema,
} from "../../schemas/BlogEditorSchema";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateBlogState } from "../../features/createBlogStore";
import {updateNotification} from "../../features/notificationStore";
import { convertBlogContent } from "../Blog/BlogPage";
import * as yup from "yup";
import { Store } from "react-notifications-component";
import ClassUtilities from "../../Utilities/ClassUtilities";
import { notifications } from "../../config";
// Import

export type BlogEditorProps = {
  blogTitle: string;
  blogSlug?: string;
  blogDescription?: string;
  blogContent?: string;
};

const BlogEditor: React.FC<BlogEditorProps | any> = () => {
  const createBlogState = useAppSelector((state) => state.createBlog);
  // const [resolver, setResolver] = useState(blogEditorSchema);
  const [isDraft, setIsDraft] = useState(false);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const methods = useForm<BlogEditorProps>({
    resolver: yupResolver(blogEditorSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
    watch,
    setError,
    clearErrors,
  } = methods;

  const handleEditorChange = (data: string, editor: UnprivilegedEditor) => {
    let deltaStatic = JSON.stringify(editor.getContents());
    setContent(data);
    setValue("blogContent", deltaStatic);
  };

  const handleTitleChange = (e: FormEvent<HTMLInputElement>) => {
    function convertToSlug(inputString: string): string {
      return inputString.toLowerCase().replace(/\s+/g, "-");
    }

    const { value } = e.currentTarget;
    const slugText = convertToSlug(value);
    setValue("blogSlug", slugText);
  };

  const manualSubmit = async (
    data: BlogEditorProps,
    validator: yup.ObjectSchema<BlogEditorProps>,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    clearErrors();
    try {
      await validator.validateSync(data, { abortEarly: false });

      const submitterId = (e.target as HTMLButtonElement).id;
   
      if (submitterId === "preview") {
        dispatch(updateBlogState(data));
        navigate("/blog/new/preview");   
      } else if (submitterId === "save") {  
        // TODO: Send data to backend for saving (Seperate function!!!)
        // TODO: Return notification message

        // TODO: Display notification
        // In the mean time: I assume a server message
        const server_msg = dispatch(updateNotification(notifications.saveDraftSuccess))
        ClassUtilities.triggerNotification(Store, server_msg.payload); 
      }
      
      
    } catch (error: Object | any) {
      if (error.inner) {
        error.inner.map((inner: yup.ValidationError, index: number) => {
          const { type, path, errors } = inner;
          setError(path as any, { type: type, message: errors[0] });
        });
      }
    }
  };

  useEffect(() => {
    register("blogContent");
    reset(createBlogState);

    if (createBlogState?.blogContent) {
      setContent(convertBlogContent(createBlogState?.blogContent));
    }
  }, [register, reset, createBlogState, setContent, convertBlogContent]);

  const onSubmitSuccess = (
    data: BlogEditorProps,
    e: BaseSyntheticEvent | undefined
  ) => {
    dispatch(updateBlogState(data));
    // TODO: Send data to backend for saving (Seperate function!!!)
    // TODO: Return notification message

    // TODO: Display notification
    // In the mean time: I assume a server message
    const server_msg = dispatch(updateNotification(notifications.createBlogSuccess))
    ClassUtilities.triggerNotification(Store, server_msg.payload);

    console.log("Data: ", data);

  };

  const onSubmitFailure = (errors: Object | any) => {
    if (errors.inner) {
      errors.inner.map((inner: yup.ValidationError, index: number) => {
        const { type, path, errors } = inner;
        setError(path as any, { type: type, message: errors[0] });
      });
    }
  };

  return (
    <div className="content-wrapper ">
      <div className="reading-lists-header d-flex">
        <div className="blog-editor-header-wrapper col-6 d-flex justify-content-end">
          <div className="col-8 ">
            <div className="header-title">Blog Editor</div>
            <div className="header-text">Design your blog here</div>
          </div>
        </div>
        <div className="editor-actions-wrapper col-6 d-flex align-items-end">
          <button id="save" type="button" className="btn btn-light editor-actions"  onClick={(e) => manualSubmit(getValues(), BlogEditorDraftSchema, e)}>
            {" "}
            <span>
              <FaSave />
            </span>{" "}
            Save Draft
          </button>
          <button
            type="button"
            className="btn btn-light editor-actions"
            id="preview"
            // form="editorForm"
            onClick={(e) => manualSubmit(getValues(), BlogEditorDraftSchema, e)}
          >
            {" "}
            <span>
              <IoEye />
            </span>{" "}
            Preview
          </button>
          <button
            type="submit"
            form="editorForm"
            className="btn editor-actions special-btn "
            id="publish"
          >
            {" "}
            <span>
              <BsUpload className="special-btn-icon" />
            </span>{" "}
            Publish
          </button>
        </div>
      </div>
      <div className="reading-lists-content d-md-flex col-xl-10 col-md-12 col-10 flex-wrap justify-content-center">
        <div className="editor-wrapper d-flex col-xl-8  col-md-10 col mx-auto">
          <form
            id="editorForm"
            className=" rounded"
            onSubmit={handleSubmit(onSubmitSuccess, onSubmitFailure)}
          >
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Blog Title</label>
              <input
                {...register("blogTitle")}
                type="text"
                onChange={handleTitleChange}
                className="form-control"
                id="exampleFormControlInput1"
                // placeholder="Bl"
              />
              <Form.Text className="text-muted">
                {errors.blogTitle && (
                  <p className="text-danger mb-0">
                    {errors.blogTitle?.message}
                  </p>
                )}
              </Form.Text>
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Blog Slug</label>
              <input
                {...register("blogSlug")}
                // disabled={true}
                type="text"
                className="form-control form-control-plaintext"
                id="exampleFormControlInput1"
                placeholder="blog-title-slug"
                readOnly
              />

              <Form.Text className="text-muted">
                {errors.blogSlug && (
                  <p className="text-danger mb-0">{errors.blogSlug?.message}</p>
                )}
              </Form.Text>
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">
                Blog Description
              </label>
              <textarea
                {...register("blogDescription")}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
              ></textarea>

              <Form.Text className="text-muted">
                {errors.blogDescription && (
                  <p className="text-danger mb-0">
                    {errors.blogDescription?.message}
                  </p>
                )}
              </Form.Text>
            </div>

            <div className="form-group">
              <Form.Text className="text-muted">
                {errors.blogContent && (
                  <p className="text-danger mb-0">
                    {errors.blogContent?.message}
                  </p>
                )}
              </Form.Text>
              <ReactQuill
                // {...register('blogContent')}
                theme="snow"
                className="col-xl-6 col-lg-8 col-md-10  col-12 mx-auto rounded"
                value={content}
                // defaultValue={blogEditorContent}
                onChange={(content, delta, source, editor) => {
                  handleEditorChange(content, editor);
                }}
                modules={{
                  toolbar: [
                    [{ header: [2, 3, 4, 5, 6, false] }],
                    ["bold", "italic", "underline", "strike"], // toggled buttons
                    ["blockquote", "code-block"],
                    ["link", "image", "video"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                    [{ direction: "rtl" }], // text direction
                    ["clean"], // remove formatting button
                  ],
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
