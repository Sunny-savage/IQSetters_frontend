import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUser as addUserAction,
  deleteUser as deleteUserAction,
  updateUser as updateUserAction,
  resetForm,
  setSelectedUserId,
} from "./userSlice";
import type { SagaIterator } from "redux-saga";
import type { PayloadAction } from "@reduxjs/toolkit";

type UpdateUserPayload = {
  id: string;
  data: {
    name: string;
    email: string;
    age: string;
  };
};

type UserPayload = {
  name: string;
  email: string;
  age: string;
};

function* getUsersSaga(): SagaIterator {
  try {
    const res = yield call(
      axios.get,
      "https://iqsettersbackend-production.up.railway.app/users"
    );
    yield put(fetchUsersSuccess(res.data.result));
  } catch (e) {
    if (e instanceof Error) {
      yield put(fetchUsersFailure(e.message));
    } else {
      yield put(fetchUsersFailure("An unknown error occurred"));
    }
  }
}

function* addUserSaga(action: PayloadAction<UserPayload>): SagaIterator {
  try {
    yield call(
      axios.post,
      "https://iqsettersbackend-production.up.railway.app/users",
      action.payload
    );
    yield put(fetchUsers());
    yield put(resetForm());
  } catch (e) {
    console.error(e);
  }
}

function* deleteUserSaga(action: PayloadAction<string>): SagaIterator {
  try {
    yield call(
      axios.delete,
      `https://iqsettersbackend-production.up.railway.app/users/${action.payload}`
    );
    yield put(fetchUsers());
  } catch (e) {
    console.error(e);
  }
}

function* updateUserSaga(
  action: PayloadAction<UpdateUserPayload>
): SagaIterator {
  try {
    const { id, data } = action.payload;
    yield call(
      axios.put,
      `https://iqsettersbackend-production.up.railway.app/users/${id}`,
      data
    );
    yield put(fetchUsers());
    yield put(setSelectedUserId(""));
    yield put(resetForm());
  } catch (e) {
    console.error(e);
  }
}

export function* userSaga() {
  yield takeLatest(fetchUsers.type, getUsersSaga);
  yield takeLatest(addUserAction.type, addUserSaga);
  yield takeLatest(deleteUserAction.type, deleteUserSaga);
  yield takeLatest(updateUserAction.type, updateUserSaga);
}
