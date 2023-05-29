import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  modalPayload: null | any;
  modalCardOptions: boolean;
  modalPost: boolean;
  modalCreate: boolean;
};

const initialState: InitialStateType = {
  modalPayload: null,
  modalCardOptions: false,
  modalPost: false,
  modalCreate: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModalCardOptions: (state, action) => {
      state.modalPayload = action.payload;
      state.modalCardOptions = true;
    },
    hideModalCardOptions: (state) => {
      state.modalCardOptions = false;
      state.modalPayload = null;
    },
    showModalPost: (state, action) => {
      state.modalPayload = action.payload;
      state.modalPost = true;
    },
    hideModalPost: (state) => {
      state.modalPost = false;
      state.modalPayload = null;
    },
    showModalCreate: (state) => {
      state.modalCreate = true;
    },
    hideModalCreate: (state) => {
      state.modalCreate = false;
    },
  },
});

export const {
  hideModalCardOptions,
  showModalCardOptions,
  hideModalPost,
  showModalPost,
  hideModalCreate,
  showModalCreate,
} = modalSlice.actions;

export default modalSlice.reducer;
