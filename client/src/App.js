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
import { AppContext } from "./lib/contextLib";
import { useState } from 'react';

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/shop/:id' element={<Shop />} />
            {/* <Route path='/admin-login' element={<AdminLogin />} />
            {isAuthenticated && <Route path='/admin' element={<Admin />} />} */}
            {<Route path='/admin' element={isAuthenticated ? <Admin /> : <AdminLogin />} />}
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
