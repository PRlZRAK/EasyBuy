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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Header />
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
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
