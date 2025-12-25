import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../Easybuy.png";

export default function MainPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Sample Product",
      price: 999,
      image: logo,
    },
    {
      id: 2,
      title: "Sample Product",
      price: 999,
      image: logo,
    },
    {
      id: 3,
      title: "Sample Product",
      price: 999,
      image: logo,
    },
    {
      id: 4,
      title: "Sample Product",
      price: 999,
      image: logo,
    },
    {
      id: 5,
      title: "Sample Product",
      price: 999,
      image: logo,
    },
    {
      id: 6,
      title: "Sample Product",
      price: 999,
      image: logo,
    },
    {
      id: 7,
      title: "Sample Product",
      price: 999,
      image: logo,
    },
  ]);

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
    <>
      <main>
        <div className="products-grid">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-title">{product.name}</div>
                <div className="product-price">€{product.price}</div>
              </div>
            </Link>
          ))}
        </div>

        <p>
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test croll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test croll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test croll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test croll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test croll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test croll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test croll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test croll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test croll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test croll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test croll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test croll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test croll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test croll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test croll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test croll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test croll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll testcroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test croll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test croll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test croll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test croll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test scroll test scroll test scroll test scroll test scroll test
          scroll test scroll test scroll test scroll test scroll test scroll
          test
        </p>
      </main>
    </>
  );
}
