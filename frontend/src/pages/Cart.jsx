import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, getCartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      alert("Please login to place an order");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };

        const orderData = {
            items: cart.map(item => ({
                menuId: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            totalAmount: getCartTotal()
        };

        await axios.post("/api/orders", orderData, config);
        alert("Order placed successfully!");
        clearCart();
        navigate("/orders");
    } catch (error) {
        console.error("Checkout error", error);
        alert("Failed to place order.");
    }
    setLoading(false);
  };

  if (cart.length === 0) return <h2>Your cart is empty</h2>;

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div>
        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            <div>
              <h3>{item.name}</h3>
              <p>Rs. {item.price} x {item.quantity}</p>
            </div>
            <div>
              <p style={{ fontWeight: 'bold', marginRight: '1rem', display: 'inline-block' }}>
                Rs. {item.price * item.quantity}
              </p>
              <button 
                onClick={() => removeFromCart(item._id)} 
                className="btn btn-danger"
                style={{ width: 'auto' }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        Total: Rs. {getCartTotal()}
      </div>
      <button 
        className="btn" 
        onClick={handleCheckout} 
        disabled={loading}
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
};

export default Cart;
