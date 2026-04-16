import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await axios.get("/api/restaurants");
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants", error);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div>
      <h2>Popular Restaurants</h2>
      <div className="grid">
        {restaurants.map((rest) => (
          <div key={rest._id} className="card">
            <img src={rest.imageUrl} alt={rest.name} />
            <div className="card-content">
              <h3 className="card-title">{rest.name}</h3>
              <p className="card-desc">{rest.description}</p>
              <Link to={`/restaurant/${rest._id}`} className="btn">View Menu</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
