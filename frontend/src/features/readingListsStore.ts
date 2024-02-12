// Assuming the TopicListProps type is similar to the ReadingListsProps type provided

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReadingListsProps } from '../Components/ReadingLists';
import { ReadingListItemProps } from '../Components/ReadingListItem';

// Define a type for the slice state
interface ReadingListsState {
  data: ReadingListItemProps[] | null;
}

// Define the initial state using that type
const initialState: ReadingListsState = {
  data: null,
};

export const readingListsSlice = createSlice({
  name: 'readingLists',
  initialState,
  reducers: {
    updateReadingLists: (state, action: PayloadAction<ReadingListItemProps[]>) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateReadingLists } = readingListsSlice.actions;

export default readingListsSlice.reducer;
