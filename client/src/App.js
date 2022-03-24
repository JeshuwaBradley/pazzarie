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
import ShopLogin from './pages/shop-login';
import Contact from './pages/contact';
import DailyDeals from './pages/daily-deals';
import Privacy from './pages/privacy';
import About from './pages/about';
import Locations from './pages/locations';

function App() {
  const [isAdminAuthenticated, userAdminHasAuthenticated] = useState(false);
  const [isShopAuthenticated, userShopHasAuthenticated] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <AppContext.Provider value={{ isAdminAuthenticated, userAdminHasAuthenticated, isShopAuthenticated, userShopHasAuthenticated }}>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/about-us' element={<About />} />
            <Route path='/locations' element={<Locations />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/privacy-policy' element={<Privacy />} />
            <Route path='/daily-deals' element={<DailyDeals />} />
            {<Route path='/shop/:id' element={isShopAuthenticated ? <Shop /> : <ShopLogin />} />}
            {<Route path='/admin' element={isAdminAuthenticated ? <Admin /> : <AdminLogin />} />}
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
