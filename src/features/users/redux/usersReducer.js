const initialState = {
  list: [], // store all users
  loading: false,
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
      return {
        ...state, loading: true, error: null
      };
    case 'FETCH_USERS_SUCCESS': {
      const existingIds = new Set(state.list.map((user) => user.id));
      const newUser = action.payload.filter((user) => !existingIds.has(user.id));
      return { ...state, loading: false, list: [...state.list, ...newUser] };
    }

    case 'FETCH_USERS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_USER':
      console.log("User added", action.payload);
      return { ...state, list: [...state.list, action.payload] };
    case 'REMOVE_USER':
      return { ...state, list: state.list.filter((user) => user.id !== action.payload) };
    case 'UPDATE_USER':
        console.log("UPDATE USERRRRRRR", action.payload);
      return {
        ...state,
        list: state.list.map(u =>
          u.id === action.payload.id ? { ...u, ...action.payload } : u
        ),
      };
    default:
      return state;
  }
};

export default usersReducer;
