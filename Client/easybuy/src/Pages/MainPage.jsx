import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import placeholder from "../Easybuy.png";

export default function MainPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>
      <div className="products-grid">
        {products.map((product) => {
          const img = product.images?.[0]?.image || placeholder;

          return (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="product-card">
                <img
                  src={img}
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                />

                <div className="product-title">{product.name}</div>

                <div className="product-price">
                  {product.price} {product.currency}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
