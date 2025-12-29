import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import api from "../api/axios";
import "../css/SellerDashboard.css";

export default function SellerDashboard() {
  const { user, loading } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/me/products/");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingProducts(false);
      }
    };

    if (user?.is_seller) {
      fetchProducts();
    }
  }, [user]);

  if (loading) return null;

  if (!user || !user.is_seller) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="seller-page">
      <div className="seller-header">
        <h1>My products</h1>
        <Link to="/seller/add" className="add-btn">
          + Add product
        </Link>
      </div>

      {loadingProducts ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products yet</p>
      ) : (
        <div className="seller-products">
          {products.map((p) => (
            <div key={p.id} className="seller-product-card">
              <h3>{p.name}</h3>
              <p>
                {p.price} {p.currency}
              </p>
              <p>Stock: {p.stock}</p>

              <div className="seller-actions">
                <Link to={`/seller/edit/${p.id}`}>Edit</Link>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  async function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/api/me/products/${id}/`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  }
}
