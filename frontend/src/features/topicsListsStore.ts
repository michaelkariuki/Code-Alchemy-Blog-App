import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TopicListProps } from "../Components/TopicsLists";
import { TopicProps } from "../Components/TopicItem";
interface TopicsState {
  topicsList: TopicListProps;
}

const initialState: TopicsState = {
  topicsList: {
    data: null,
  },
};

const topicsListSlice = createSlice({
  name: 'topicsList',
  initialState,
  reducers: {
    updateTopicsList(state, action: PayloadAction<TopicProps[]>) {
      state.topicsList.data = action.payload;
    },
  },
});

export const { updateTopicsList } = topicsListSlice.actions;

export default topicsListSlice.reducer;
