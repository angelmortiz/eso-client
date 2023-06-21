import { createSlice } from "@reduxjs/toolkit";

/**
 * FOR TESTING PURPOSES
 */
// const initialState = {
//     notificationInfo: {
//         show: true,
//         type: 'warning',
//         title: 'Successfully saved!',
//         message: 'This is a test of the toast notifications'
//     }
// }

const initialState = {
    notificationInfo: {
        show: false,
        type: '',
        message: ''
    }
}

const toastNotificationSlice = createSlice({
    name: 'toastNotification',
    initialState,
    reducers: {
        showNotification(state, action) {
            state.notificationInfo = action.payload;
            state.notificationInfo.show = true;
        },
        clearUpNotification(state) {
            state.notificationInfo = initialState.notificationInfo;
        }
    }

});

export default toastNotificationSlice.reducer;
export const toastNotificationActions = toastNotificationSlice.actions;