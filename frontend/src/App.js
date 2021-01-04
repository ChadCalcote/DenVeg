import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from './components/Home';
import UploadPictureForm from './components/UploadPictureForm';
import FoodItemsPage from "./components/FoodItemsPage";
import RestaurantsPage from "./components/RestaurantsPage";
import ReviewsPage from './components/ReviewsPage';
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route> */}
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/testing">
            <UploadPictureForm />
          </Route>
          <Route path="/foodItems">
            <FoodItemsPage />
          </Route>
          <Route path="/restaurants">
            <RestaurantsPage />
          </Route>
          <Route path="/reviews">
            <ReviewsPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
