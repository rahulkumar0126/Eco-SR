import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">🍽️ EcoEats</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/orders">My Orders</Link>
            <Link to="/cart">Cart ({cart.length})</Link>
            <button onClick={logout} className="btn-logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn-register-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
