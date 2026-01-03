import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../css/CartPage.css";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } =
    useContext(CartContext);

  const total = cart.reduce(
    (sum, i) => sum + i.quantity * parseFloat(i.price),
    0
  );

  if (cart.length === 0) {
    return <div className="cart-page">Cart is empty</div>;
  }

  return (
    <div className="cart-page">
      <h1>Your cart</h1>

      <div className="cart-list">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.images?.[0]?.image} alt={item.name} />

            <div className="cart-info">
              <h3>{item.name}</h3>
              <p>€{item.price}</p>

              <div className="cart-qty">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="cart-remove"
              onClick={() => removeFromCart(item.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="cart-total">Total: €{total.toFixed(2)}</div>
        <button className="cart-buy" onClick={clearCart}>
          Buy everything
        </button>
      </div>
    </div>
  );
}
