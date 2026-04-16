import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { CartContext } from "../context/CartContext";

const RestaurantPage = () => {
  const { id } = useParams();
  const [menus, setMenus] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const { data } = await axios.get(`/api/menus/${id}`);
        setMenus(data);
      } catch (error) {
        console.error("Error fetching menus", error);
      }
    };
    fetchMenus();
  }, [id]);

  return (
    <div>
      <h2>Menu Items</h2>
      {menus.length === 0 ? <p>No menu items found for this restaurant.</p> : (
        <div className="grid">
          {menus.map((item) => (
            <div key={item._id} className="card">
              <img src={item.imageUrl} alt={item.name} />
              <div className="card-content">
                <h3 className="card-title">{item.name}</h3>
                <p className="card-desc">{item.description}</p>
                <p className="card-price">Rs. {item.price}</p>
                <button onClick={() => addToCart(item)} className="btn">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;
