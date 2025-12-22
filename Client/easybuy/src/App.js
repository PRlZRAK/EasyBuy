import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MainPage from "./Pages/MainPage";
import SignUpPage from "./Pages/LoginPage";
import LoginPage from "./Pages/SignUpPage";
import ProfilePage from "./Pages/ProfilePage";
import AboutUsPage from "./Pages/AboutUsPage";
import ProductPage from "./Pages/ProductPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/register" element={<SignUpPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
