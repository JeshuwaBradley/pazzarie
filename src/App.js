import React from 'react'
import Home from './pages/home';
import Product from './pages/product';
import Cart from './pages/cart';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Menu from './pages/menu';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/menu' element={<Menu />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
