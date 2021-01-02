// import { fetch }  from '../../store/csrf';
import { useEffect } from 'react';
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
    <div id="fooditems-page">
      <h2>Check out these awesome Vegan Items!</h2>
      {!currentFoodItems && <h3>Loading...</h3>}
      {currentFoodItems && currentFoodItems.map((foodItem, i) => {
          return <FoodItem key={i} theFoodItem={foodItem} />
      })}
    </div>
  );
};

export default FoodItemsPage;