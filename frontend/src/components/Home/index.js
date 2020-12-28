import "./index.css";
import picture from './VeganImage2.jpg';

import { useSelector } from 'react-redux';
const Home = () => {

    const loggedInUser = useSelector( state => {
        console.log(state);
        return state.session.user;
    });

    return (
      <div id="home-page-container">
        <img alt="vegan" src={picture} />
        <div id="home-page-overlay">
          <h1>Welcome to DenVeg!</h1>
        </div>
        {loggedInUser && <h3>Welcome {loggedInUser.username} , come find the best Mile High vegan options!</h3>}
      </div>
    );
};

export default Home;