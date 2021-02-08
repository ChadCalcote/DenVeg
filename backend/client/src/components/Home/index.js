import "./index.css";
import picture from './logo.png';

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
          {loggedInUser && (
            <h3>
              Welcome back, {loggedInUser.username}. Come find the best Mile High
              <Link to="/foodItems">Vegan Options!</Link>
            </h3>
          )}
          <img className="logo" alt="vegan" src={picture} />
        </div>
      </div>
    );
};

export default Home;