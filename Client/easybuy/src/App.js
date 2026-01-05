import "./css/App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MainPage from "./Pages/MainPage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import AboutUsPage from "./Pages/AboutUsPage";
import ProductPage from "./Pages/ProductPage";
import AddProductPage from "./Pages/AddProductPage";
import SellerDashboard from "./Pages/SellerDashboard";
import CartPage from "./Pages/CartPage";
import EditProductPage from "./Pages/EditProductPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Header />
            <Toaster position="top-center" reverseOrder={true} />
            <div className="app-content">
              <Routes>
                <Route path="/register" element={<SignUpPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/" element={<MainPage />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/seller" element={<SellerDashboard />} />
                <Route path="/seller/add" element={<AddProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/seller/edit/:id" element={<EditProductPage />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
