import React, { lazy, Suspense } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { AppContext } from "./lib/contextLib";
import { useState } from 'react';
import Home from './pages/home';
import Cart from './pages/cart';
import Menu from './pages/menu';

const Admin = lazy(() => import('./pages/admin'))
const Contact = lazy(() => import('./pages/contact'))
const Privacy = lazy(() => import('./pages/privacy'))
const About = lazy(() => import('./pages/about'))
const Locations = lazy(() => import('./pages/locations'))
const Popup = lazy(() => import('./components/popup'))
const DailyDeals = lazy(() => import('./pages/daily-deals'))
const PageNotFound = lazy(() => import('./pages/404-page'))
const Shop = lazy(() => import('./pages/shop'))
const CreateYourOwn = lazy(() => import('./pages/create-your-own'))
const Unsubscribe = lazy(() => import('./pages/unsubscribe'))

function App() {
  const [isAdminAuthenticated, userAdminHasAuthenticated] = useState(false);
  const [isShopAuthenticated, userShopHasAuthenticated] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <AppContext.Provider value={{ isAdminAuthenticated, userAdminHasAuthenticated, isShopAuthenticated, userShopHasAuthenticated }}>
            <Routes>
              <Route index element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/menu/create-your-own' element={<CreateYourOwn />} />
              <Route path='/popup' element={<Popup />} />
              <Route path='/about-us' element={<About />} />
              <Route path='/locations' element={<Locations />} />
              <Route path='/menu' element={<Menu />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/privacy-policy' element={<Privacy />} />
              <Route path='/daily-deals' element={<DailyDeals />} />
              {/* {<Route path='/shop/:id' element={isShopAuthenticated ? <Shop /> : <ShopLogin />} />} */}
              <Route path='/shop/:id' element={<Shop />} />
              <Route path='/admin' element={<Admin />} />
              <Route path='/unsubscribe/:id' element={<Unsubscribe />} />
              {/* {<Route path='/admin' element={isAdminAuthenticated ? <Admin /> : <AdminLogin />} />} */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </AppContext.Provider>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
