import { fetch }  from '../../store/csrf';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFoodItems } from '../../store/foodItems';

const FoodItem = ({theFoodItem}) => {

    return (
        <div>
            <h3>{theFoodItem.name}</h3>
            <img alt="foodItem" src={theFoodItem.photoUrl} />
        </div>
    )
};
const FoodItemsPage = () => {

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [isSpecial, setIsSpecial] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    // Post to Database
    const response = await fetch('/api/foodItems/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, price, description, restaurantId, isSpecial, photoUrl }),
    });

    if (response) {
      window.alert('Restaurant Added!');
    } else {
      window.alert('ERROR');
    }



    setName('');
    setPrice(0);
    setDescription('');
    setRestaurantId('');
    setPhotoUrl('');
  }

    const dispatch = useDispatch();
    const currentFoodItems = useSelector(fullReduxState => {
      return fullReduxState.foodItems;
    });
  // Do this once when the component is shown
  // eslint-disable-next-line
  useEffect(async () => {
    // const response = await fetch("/api/foodItems");
    // setFoodItems(response.data.foodItems);
    dispatch(
      fetchAllFoodItems()
      );
  }, [dispatch]);

  return (
    <div id="food-items-page">
      <h2>Check out these awesome Vegan Items!</h2>
      <h3>Add Your Favorite Denveg Option!</h3>
      <form className="foodItemForm" onSubmit={onSubmit}>
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
          <label htmlFor="price">Price: </label>
          <input
            id="price"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            id="description"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div>
          <select
            name="restaurant"
            onChange={(e) => setRestaurantId(e.target.value)}
            value={restaurantId}
          >
            <option value="" disabled>
              Select a Restaurant...
            </option>
            <option>{1}</option>
            <option>{2}</option>
            <option>{3}</option>
          </select>
        </div>
        <div className="inputField">
          <label htmlFor="isSpecial">Special Deal</label>
          <div />
          <input
            className="checkbox"
            type="checkbox"
            name="isSpecial"
            checked={isSpecial}
            onChange={(event) => setIsSpecial(event.target.checked)}
          ></input>
        </div>
        <div>
          <label htmlFor="photoUrl">Photo Url: </label>
          <input
            id="photoUrl"
            type="text"
            onChange={(e) => setPhotoUrl(e.target.value)}
            value={photoUrl}
          />
        </div>
        <button>Submit</button>
      </form>
      {!currentFoodItems && <h3>Loading...</h3>}
      {currentFoodItems &&
        currentFoodItems.map((foodItem, i) => {
          return <FoodItem key={i} theFoodItem={foodItem} />;
        })}
    </div>
  );
};

export default FoodItemsPage;