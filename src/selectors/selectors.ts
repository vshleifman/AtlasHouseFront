import { RootState } from "../store/rootReducer";

export const authSelector = (state: RootState) => state.authSlice;
export const userSelector = (state: RootState) => state.userSlice;
