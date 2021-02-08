import { fetch } from "./csrf.js";

const SET_ALL_FOODITEMS = "foodItems/setFoodItems";

// Action creator that produces object
const setFoodItems = (foodItems) => {
  return {
    type: SET_ALL_FOODITEMS,
    foodItems: foodItems,
  };
};

// Centralize the server interaction on our front end to be nearby our redux state

// Action creator that produces a function (thunk)
// Thunk Action
export const fetchAllFoodItems = () => {
    return async (dispatch) => {
        // Where you interact with server
        const response = await fetch("/api/foodItems");
        dispatch(
            setFoodItems(response.data.foodItems)
            );
    }
};

const initialState = [];

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_ALL_FOODITEMS:
      newState = action.foodItems;
      return newState;
    default:
      return state;
  }
}

export default reducer;
