import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LiteNotification } from '../Interfaces/NotificationTypes';

const initialState = null as LiteNotification;

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification: (state, action: PayloadAction<LiteNotification>) => {
        state = action.payload
        return state
    },
  },
});

export const { updateNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
