import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
    userInfo: {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        role: null,
        imageLink: null
    }
};

const userSlice = createSlice({
    name: 'userInfo',
    initialState: initialUserState,
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
        removeUserInfo(state) {
            state.userInfo = initialUserState.userInfo;
        }
    }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;