import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import Homepages from "./pages/Homepages";
import CarouselComponent from "./pages/UserDetail";
import NotFound from "./pages/Notfound";
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
          <Routes>
            <Route path="/" element={<Homepages />} />
            <Route path="/user" element={<CarouselComponent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
