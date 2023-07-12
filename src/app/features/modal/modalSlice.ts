import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  modalPayload: null | any;
  modalCardOptions: boolean;
  modalOwnCardOptions: boolean;
  modalPost: boolean;
  modalCreate: boolean;
  modalEdit: boolean;
  toast: string;
};

const initialState: InitialStateType = {
  modalPayload: null,
  modalCardOptions: false,
  modalOwnCardOptions: false,
  modalPost: false,
  modalCreate: false,
  modalEdit: false,
  toast: "",
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
    showModalOwnCardOptions: (state, action) => {
      if (action.payload) {
        state.modalPayload = { ...state.modalPayload, ...action.payload };
      }
      state.modalOwnCardOptions = true;
    },
    hideModalOwnCardOptions: (state) => {
      state.modalOwnCardOptions = false;
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
    showModalEdit: (state) => {
      state.modalEdit = true;
    },
    hideModalEdit: (state) => {
      state.modalEdit = false;
    },
    setToast: (state, action) => {
      state.toast = action.payload;
    },
    hideToast: (state) => {
      state.toast = "";
    },
  },
});

export const {
  hideModalCardOptions,
  showModalCardOptions,
  hideModalOwnCardOptions,
  showModalOwnCardOptions,
  hideModalPost,
  showModalPost,
  hideModalCreate,
  showModalCreate,
  hideModalEdit,
  showModalEdit,
  setToast,
  hideToast,
} = modalSlice.actions;

export default modalSlice.reducer;
