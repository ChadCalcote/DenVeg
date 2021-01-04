import { fetch } from "./csrf.js";

const SET_ALL_REVIEWS = "restaurants/setReviews";

// Action creator that produces object
const setReviews = (reviews) => {
  return {
    type: SET_ALL_REVIEWS,
    reviews: reviews,
  };
};

// Centralize the server interaction on our front end to be nearby our redux state

// Action creator that produces a function (thunk)
// Thunk Action
export const fetchAllReviews = () => {
  return async (dispatch) => {
    // Where you interact with server
    const response = await fetch("/api/reviews");
    dispatch(setReviews(response.data.reviews));
  };
};

const initialState = [];

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_ALL_REVIEWS:
      newState = action.reviews;
      return newState;
    default:
      return state;
  }
}

export default reducer;
