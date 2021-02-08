import { fetch } from "./csrf.js";

const SET_ALL_RESTAURANTS = "restaurants/setRestaurants";

// Action creator that produces object
const setRestaurants = (restaurants) => {
  return {
    type: SET_ALL_RESTAURANTS,
    restaurants: restaurants
  };
};

// Centralize the server interaction on our front end to be nearby our redux state

// Action creator that produces a function (thunk)
// Thunk Action
export const fetchAllRestaurants = () => {
  return async (dispatch) => {
    // Where you interact with server
    const response = await fetch("/api/restaurants");
    dispatch(setRestaurants(response.data.restaurants));
  };
};

const initialState = [];

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_ALL_RESTAURANTS:
      newState = action.restaurants;
      return newState;
    default:
      return state;
  }
}

export default reducer;
