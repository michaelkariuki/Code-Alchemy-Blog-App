import { configureStore } from "@reduxjs/toolkit";
import createBlogReducer from "../features/createBlogStore";
import notificationReducer from "../features/notificationStore";
import topicsListReducer from "../features/topicsListsStore";
import readingLisrReducer from "../features/readingListsStore";
import newListsReducers from "../features/newListsStore";
import signupStore from "../features/signupStore";


export const store = configureStore({
    reducer: {
        createBlog: createBlogReducer,
        notification: notificationReducer,
        topicsList: topicsListReducer,
        readingList: readingLisrReducer,
        newLists: newListsReducers,
        signup: signupStore
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;