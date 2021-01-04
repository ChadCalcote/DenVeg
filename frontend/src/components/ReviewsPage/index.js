import { fetch } from "../../store/csrf";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReviews } from "../../store/reviews";

const Review = ({ theReview }) => {
  return (
    <div>
      <h3>{theReview.heading}</h3>
      <h3>Rating: {theReview.rating}</h3>
      <img alt="review" src={theReview.photoUrl} />
    </div>
  );
};
const ReviewsPage = () => {
  const [heading, setHeading] = useState("");
  const [rating, setRating] = useState(0);
  const [foodItemId, setFoodItemId] = useState(1);
  const [photoUrl, setPhotoUrl] = useState("");
  const [reviewText, setReviewText] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    // Post to Database
    const response = await fetch("/api/reviews/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        heading,
        rating,
        foodItemId,
        photoUrl,
        reviewText
      }),
    });

    if (response) {
      window.alert("Review Added!");
    } else {
      window.alert("ERROR");
    }

    setHeading("");
    setRating(0);
    setFoodItemId(1);
    setPhotoUrl("");
    setReviewText("");
  };

  const dispatch = useDispatch();
  const currentReviews = useSelector((fullReduxState) => {
    return fullReduxState.reviews;
  });
  // Do this once when the component is shown
  // eslint-disable-next-line
  useEffect(async () => {
    // const response = await fetch("/api/foodItems");
    // setFoodItems(response.data.foodItems);
    dispatch(fetchAllReviews());
  }, [dispatch]);

  return (
    <div id="reviews-page">
      <h2>Get All The Details on Mile High Vegan Foods</h2>
      <h3>Spill The *Green* Beans!</h3>
      <form className="reviewForm" onSubmit={onSubmit}>
        <div>
          <label htmlFor="heading">Heading: </label>
          <input
            id="heading"
            type="text"
            onChange={(e) => setHeading(e.target.value)}
            value={heading}
          />
        </div>
        <div>
          <label htmlFor="rating">Rating: </label>
          <input
            id="rating"
            type="number"
            onChange={(e) => setRating(e.target.value)}
            value={rating}
          />
        </div>
        <div>
          <label htmlFor="foodItemId">Food Item: </label>
          <select
            name="foodItemId"
            onChange={(e) => setFoodItemId(e.target.value)}
            value={foodItemId}
          >
            <option value="" disabled>
              Select a Food Item...
            </option>
            <option>{1}</option>
            <option>{2}</option>
            <option>{3}</option>
          </select>
        </div>
        <div>
          <label htmlFor="reviewText">Review: </label>
          <textarea
            id="reviewText"
            name="reviewText"
            onChange={(e) => setReviewText(e.target.value)}
            value={reviewText}
          />
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
      {!currentReviews && <h3>Loading...</h3>}
      {currentReviews &&
        currentReviews.map((review, i) => {
          return <Review key={i} theReview={review} />;
        })}
    </div>
  );
};

export default ReviewsPage;