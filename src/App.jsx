import "./App.css";
import Home from "./pages/home/Home";
import EShop from "./pages/Eshop/Eshop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SignIn from "./pages/SignIn/SiginIn";
// import SignUp from "./pages/Signup/Signup";
// import Cart from "./pages/Cart/Cart";
// import ProductDetails from "./pages/ProductDetails/ProductDetails";
// import About from "./pages/about/About";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eshop" element={<EShop />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
