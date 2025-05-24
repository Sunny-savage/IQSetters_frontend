import { createSlice } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  email: string;
  age: string;
}


interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUserId: string;
  formState: {
    name: string;
    email: string;
    age: string;
  };
}


const initialState : UserState = {
  users: [],
  loading: false,
  error: null,
  selectedUserId: "",
  formState: { name: "", email: "", age: "" },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUsers: (state) => {
      state.loading = true;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addUser: (state, action) => {},
    deleteUser: (state, action) => {},
    updateUser: (state, action) => {},
    setFormState: (state, action) => {
      state.formState = action.payload;
    },
    setSelectedUserId: (state, action) => {
      state.selectedUserId = action.payload;
    },
    resetForm: (state) => {
      state.formState = { name: "", email: "", age: "" };
    },
  },
});

export const {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUser,
  deleteUser,
  updateUser,
  setFormState,
  setSelectedUserId,
  resetForm,
} = userSlice.actions;

export default userSlice.reducer;
