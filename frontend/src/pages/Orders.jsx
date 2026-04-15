import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        };
        const { data } = await axios.get("http://localhost:5000/api/orders", config);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.length === 0 ? <p>You have no orders yet.</p> : (
        <div>
          {orders.map((order) => (
            <div key={order._id} className="order-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '1rem' }}>
                <strong>Order ID: {order._id}</strong>
                <span className={`status-badge status-${order.status}`}>{order.status}</span>
              </div>
              <div>
                <strong>Total: ${order.totalAmount}</strong>
              </div>
              <ul className="order-items-list">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - ${item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
