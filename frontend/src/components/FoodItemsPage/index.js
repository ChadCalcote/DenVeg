import { fetch }  from '../../store/csrf';
import { useEffect, useState } from 'react';

const FoodItem = ({theFoodItem}) => {
    return (
        <div>
            <h3>{theFoodItem.name}</h3>
            <img alt="foodItem" src={theFoodItem.photoUrl} />
        </div>
    )
};
const FoodItemsPage = () => {

    const [ currentFoodItems, setFoodItems ] = useState([]);
  // Do this once when the component is shown
  // eslint-disable-next-line
  useEffect(async () => {
    const response = await fetch("/api/foodItems");
    setFoodItems(response.data.foodItems);
  }, []);

  return (
    <div id="fooditems-page">
      <h2>Check out these awesome Vegan Items!</h2>
      {!currentFoodItems && <h3>Loading...</h3>}
      {currentFoodItems && currentFoodItems.map(foodItem => {
          return <FoodItem theFoodItem={foodItem} />
      })}
    </div>
  );
};

export default FoodItemsPage;