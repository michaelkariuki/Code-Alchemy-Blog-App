import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { NewListsProps, BlogListItemProps } from '@/Components/NewLists';
import { BlogListItemProps } from '../Components/BlogListItem';

interface NewListsState {
  content: BlogListItemProps[] | null;
}

const initialState: NewListsState = {
  content: null,
};

const newListsSlice = createSlice({
  name: 'newLists',
  initialState,
  reducers: {
    updateNewLists: (state, action: PayloadAction<BlogListItemProps[]>) => {
      state.content = action.payload;
    },
  },
});

export const { updateNewLists } = newListsSlice.actions;
export default newListsSlice.reducer;
