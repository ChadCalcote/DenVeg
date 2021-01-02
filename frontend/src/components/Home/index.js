import "./index.css";
import picture from './DenVegLogo.png';

import { useSelector } from 'react-redux';

import {Link} from 'react-router-dom';
const Home = () => {

    const loggedInUser = useSelector( state => {
        console.log(state);
        return state.session.user;
    });

    return (
      <div>
        <div id="home-page-container">
          <img alt="vegan" src={picture} />
          <div id="home-page-overlay">
            <h1>Welcome to DenVeg!</h1>
          </div>
        </div>
        {loggedInUser && (
          <h3>
            Welcome {loggedInUser.username}, come find the best Mile High <Link to="/foodItems">Vegan Options!</Link>
          </h3>
        )}
      </div>
    );
};

export default Home;