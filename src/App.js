import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from "react-bootstrap";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import Homepages from "./pages/Homepages";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Router>
        <Routes>
          <Route path="/" element={<Homepages/>}/>
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
