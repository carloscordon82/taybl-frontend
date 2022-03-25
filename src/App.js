import "./App.css";
import Home from "./components/views/home/Home";
import Search from "./components/views/search/Search";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/views/Navbar";
import RestaurantDetails from "./components/views/restaurant/RestaurantDetails";
import Footer from "./components/views/Footer";
import Reservations from "./components/views/reservations/Reservations";

function App() {
  console.log("app.js refresh");
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/" element={<Search />} />
          <Route path="/reservations/" element={<Reservations />} />
          <Route path="/search/:search/:location" element={<Search />} />
          <Route
            path="/restaurants/:restaurantId"
            element={<RestaurantDetails />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
