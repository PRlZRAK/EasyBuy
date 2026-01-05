import { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import placeholder from "../Easybuy.png";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function MainPage() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const search = searchParams.get("search")?.toLowerCase() || "";
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
  const filteredProducts = useMemo(() => {
    if (!search) return products;

    return products.filter((p) => p.name.toLowerCase().includes(search));
  }, [products, search]);
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    addToCart(product);
    toast.success("Added to cart");
  };

  return (
    <main>
      {search && (
        <p>
          Search results for: <b>{search}</b>
        </p>
      )}
      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          filteredProducts.map((product) => {
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

                  <button
                    className="add-to-cart-btn"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </main>
  );
}
