import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import placeholder from "../Easybuy.png";
import "../css/ProductPage.css";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export default function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/products/${id}/`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="product-page-wrapper">Loading...</div>;
  }

  if (!product) {
    return <div className="product-page-wrapper">Product not found</div>;
  }

  const image =
    product.images && product.images.length > 0
      ? product.images[0].image
      : placeholder;

  return (
    <div className="product-page-div">
      <div className="product-page-layout">
        <div className="product-page-image">
          <img src={image} alt={product.name} />
        </div>
        <div className="product-page-info">
          <h1 className="product-page-title">{product.name}</h1>

          <div className="product-page-price">
            {product.price} {product.currency}
          </div>

          {product.description && (
            <p className="product-page-description">{product.description}</p>
          )}

          <div className="product-page-stock">
            Stock: <strong>{product.stock}</strong>
          </div>

          <button
            className="product-page-add-to-cart"
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Out of stock" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
