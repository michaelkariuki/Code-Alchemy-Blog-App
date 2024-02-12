import * as yup from "yup";
// import Delta from "quill-delta";

/**
 * Schema for validating the input for a blog post.
 */
export const blogEditorSchema = yup.object().shape({
  // Validates that the blog title is a non-empty string
  blogTitle: yup
    .string()
    .test("is-not-empty", "Title is required", (value) => {
      if (value) {
        return true;
      } else {
        return false;
      }
    })
    .required(),

  // Validates that the blog description is a non-empty string
  blogDescription: yup
    .string()
    .test("is-not-empty", "Description is required", (value) => {
      if (value) {
        return true;
      } else {
        return false;
      }
    }),
  // Validates that the blog slug is a string which can be empty
  blogSlug: yup
    .string()
    .when("blogTitle", (blogTitle, schema) =>
      blogTitle ? schema : schema.required("Please add a title to your blog")
    ),
  // Validates the content for the rich text editor (ReactQuill)
  blogContent: yup
    .string()
    // Custom test to check if the content is not just whitespace or empty objects
    .test("is-quill-empty", "Content is required", function (value) {
      if (value) {
        const delta = JSON.parse(value);
        // Check if the delta ops contain meaningful content
        return delta.ops.some((op: any) => {
          return op.insert !== "\n" && typeof op.insert !== "object";
        });
      }
      return false;
    }),
});

export const BlogEditorDraftSchema = yup.object().shape({
  blogTitle: yup.string().required("Title is required"),
  blogDescription: yup.string(),
  blogSlug: yup.string(),
  blogContent: yup.string(),
});
