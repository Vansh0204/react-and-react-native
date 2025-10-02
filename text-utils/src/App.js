import About from './Component/About';
import Main from './Component/Main';
import Navbar from './Component/Navbar';
import "./Style/style.css";
import "./Style/responsive.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
        <Navbar/>
      <Routes>
          <Route exact path="/" element={<Main/>} />
          <Route path="/about" element={<About/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
