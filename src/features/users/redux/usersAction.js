import { type } from "@testing-library/user-event/dist/type";
import { fetchUsersApi } from "../services/users.api";

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// Action creators
export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_USERS_REQUEST });

  try {
    const users = await fetchUsersApi();

    //normalize API
    const normalizedUsers = users.map((u) => ({
      id: u.id,
      name: u.name,
      description: u.email,
      skills: ["Javascript", "MUI"], //default skills
      profile: null,
      source: "api",
    }));

    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: normalizedUsers,
    });
  }
  catch (error) {
    dispatch({
      type: FETCH_USERS_FAILURE,
      payload: error.message,
    });
  }

};

export const addUser = (user) => ({
  type: 'ADD_USER',
  payload: user,
});

export const removeUser = (index) => ({
  type: 'REMOVE_USER',
  payload: index,
});

export const updateUser = (user) => ({
  type: 'UPDATE_USER',
  payload: user,
});
