import React from 'react'
import Home from './pages/home';
import Cart from './pages/cart';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Menu from './pages/menu';
import Admin from './pages/admin';
import Shop from './pages/shop';
import AdminLogin from './pages/admin-login'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/shop/:id' element={<Shop />} />
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route path='/admin' element={<Admin />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
