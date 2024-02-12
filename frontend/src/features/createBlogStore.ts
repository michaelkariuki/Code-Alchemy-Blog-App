//DUCKS
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogEditorProps } from "../Components/BlogEditor/BlogEditor";
type blogState = BlogEditorProps

const initialState: blogState = {
    blogTitle: "",
    blogContent: "",
    blogDescription: "",
    blogSlug: "",
}

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        updateBlogState: (state, action: PayloadAction<BlogEditorProps>) => {
            state = {...action?.payload}
            return state;
        },
        getBlogState: (state) => state
    }
})

export const {updateBlogState, getBlogState} = blogSlice.actions
export default blogSlice.reducer