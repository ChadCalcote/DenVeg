import { fetch } from "../../store/csrf";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRestaurants } from "../../store/restaurants";

const Restaurant = ({ theRestaurant }) => {
  return (
    <div>
      <h3>{theRestaurant.name}</h3>
      <p>{theRestaurant.address}</p>
      <p>{theRestaurant.bio}</p>
      <img alt="restaurant" src={theRestaurant.photoURL} />
    </div>
  );
};
const RestaurantsPage = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isVegan, setIsVegan] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Post to Database
    const response = await fetch("/api/restaurants/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        bio,
        address,
        photoURL,
        isVegan
      }),
    });

    if (response) {
      window.alert("Restaurant Added!");
    } else {
      window.alert("ERROR");
    }

    setName("");
    setBio("");
    setAddress("");
    setPhotoURL("");
    setIsVegan(false);
  };

  const dispatch = useDispatch();
  const currentRestaurants = useSelector((fullReduxState) => {
    return fullReduxState.restaurants;
  });
  // Do this once when the component is shown
  // eslint-disable-next-line
  useEffect(async () => {
    // const response = await fetch("/api/foodItems");
    // setFoodItems(response.data.foodItems);
    dispatch(fetchAllRestaurants());
  }, [dispatch]);

  return (
    <div id="restaurants-page">
      <h2>Top Denver Restaurants!</h2>
      <h3>Don't see your favorite restaurant? Add it here!</h3>
      <form className="restaurantForm" onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="address">Address: </label>
          <input
            id="address"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio: </label>
          <textarea
            id="bio"
            name="bio"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
        </div>
        <div className="inputField">
          <label htmlFor="isVegan">Fully Vegan</label>
          <div />
          <input
            className="checkbox"
            type="checkbox"
            name="isVegan"
            checked={isVegan}
            onChange={(event) => setIsVegan(event.target.checked)}
          ></input>
        </div>
        <div>
          <label htmlFor="photoURL">Photo Url: </label>
          <input
            id="photoUrl"
            type="text"
            onChange={(e) => setPhotoURL(e.target.value)}
            value={photoURL}
          />
        </div>
        <button>Submit</button>
      </form>
      {!currentRestaurants && <h3>Loading...</h3>}
      {currentRestaurants &&
        currentRestaurants.map((restaurant, i) => {
          return <Restaurant key={i} theRestaurant={restaurant} />;
        })}
    </div>
  );
};

export default RestaurantsPage;
