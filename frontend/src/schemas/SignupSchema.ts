import * as yup from "yup";

export const accountSignupSchema = yup.object().shape({
    // // schema here
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do no match")
      .required("Password confirmation is required"),
  });


export const bioTagsSchema = yup.object().shape({
  bio: yup.string().max(150, "Bio must not exceed 150 characters"),
  interests: yup.array(),
});


export const profileSchema = yup.object().shape({
  fileName: yup.string(),
  fileType: yup.string(),
  profilePic: yup.mixed<FileList | string>().test('fileType', 'Invalid file type', (value) => {
    if (value) {
      if (value instanceof FileList) {
        // Validate FileList type
        for (let i = 0; i < value.length; i++) {
          if (!['image/jpeg', 'image/png'].includes(value[i].type)) {
            return false; // The file type is not allowed
          }
        }
      } else if (typeof value === 'string') {
        // Validate base64 string type
        const base64MimeType = value.match(/^data:(.*);base64,/);
        if (!base64MimeType || !['image/jpeg', 'image/png'].includes(base64MimeType[1])) {
          return false; // The base64 file type is not allowed
        }
      } else {
        return false; // Invalid type
      }
    }
    return true; // All files are of allowed types or the field is empty
  })
  .test('fileSize', 'File is too large', (value) => {
    if (value) {
      if (value instanceof FileList) {
        // Validate FileList type
        for (let i = 0; i < value.length; i++) {
          if (value[i].size > 1024 * 1024 * 7.5) { // 1MB limit
            return false; // The file size exceeds the limit
          }
        }
      } else if (typeof value === 'string') {
        // Validate base64 string type
        const base64Data = value.replace(/^data:(.*);base64,/, '');
        const decodedSize = (base64Data.length * 3) / 4 - 2; // Approximate size after decoding
        if (decodedSize > 1024 * 1024 * 7.5) {
          return false; // The decoded file size exceeds the limit
        }
      } else {
        return false; // Invalid type
      }
    }
    return true; // All files are within the size limit or the field is empty
  })
});

