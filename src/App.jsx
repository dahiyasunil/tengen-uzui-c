import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Products from "./pages/Products";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
