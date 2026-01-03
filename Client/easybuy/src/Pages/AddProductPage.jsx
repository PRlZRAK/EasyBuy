import "../css/AddProductPage.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function AddProductPage() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    currency: "EUR",
    stock: "",
    is_active: true,
  });

  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  if (loading) return null;

  if (!user || !user.is_seller) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await api.post("/api/me/products/", {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        currency: formData.currency,
        stock: formData.stock,
        is_active: formData.is_active,
      });

      const productId = res.data.id;

      if (imageFile) {
        const fd = new FormData();
        fd.append("image_files", imageFile);

        await api.patch(`/api/me/products/${productId}/`, fd);
      }

      navigate("/seller");
    } catch (err) {
      setError("Failed to create product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-card">
        <h1>Add new product</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-left">
            <div className="image-upload">
              <div className="image-preview">
                {preview ? (
                  <img src={preview} alt="preview" />
                ) : (
                  <span>No image</span>
                )}
              </div>

              <label className="upload-btn">
                Upload image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </label>
            </div>
          </div>

          <div className="form-right">
            <input
              type="text"
              name="name"
              placeholder="Product name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Product description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />

            <div className="row">
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                required
              />

              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
              >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>

            <input
              type="number"
              name="stock"
              placeholder="Stock quantity"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              required
            />

            <label className="checkbox">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
              />
              Product is active
            </label>

            <button type="submit" disabled={submitting}>
              {submitting ? "Creating..." : "Create product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
