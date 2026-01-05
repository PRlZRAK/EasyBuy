import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../css/CartPage.css";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useState } from "react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } =
    useContext(CartContext);
  const [buying, setBuying] = useState(false);
  const total = cart.reduce(
    (sum, i) => sum + i.quantity * parseFloat(i.price),
    0
  );

  if (cart.length === 0) {
    return <div className="cart-page">Cart is empty</div>;
  }

  const handleBuy = async () => {
    setBuying(true);

    try {
      for (const item of cart) {
        const res = await api.get(`/api/products/${item.id}/`);
        if (res.data.stock < item.quantity) {
          throw new Error(`Not enough stock for "${res.data.name}"`);
        }
      }

      clearCart();
      toast.success("Purchase successful!");
    } catch (err) {
      toast.error(err.message || "Purchase failed");
    } finally {
      setBuying(false);
    }
  };

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
        <button className="cart-buy" onClick={handleBuy}>
          {buying ? "Processing..." : "Buy now"}
        </button>
      </div>
    </div>
  );
}
