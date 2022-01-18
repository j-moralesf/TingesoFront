import React from 'react';
import {
  BrowserRouter as Router,
  Route,Routes
} from "react-router-dom";
import CreateProduct from "./componentes/CreateProduct"
import ProductoComponente from "./componentes/ProductoComponente2"
import "./App.css"
function App() {
  return (
    <>
      <Router>
      <div className="App">
        <Routes>
            <Route path="/" element={<ProductoComponente />} />
            <Route path="/createProduct" element={<CreateProduct />} />
        </Routes>
      </div>
    </Router>
  </>
  );

}
export default App;
