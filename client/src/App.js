import React, { lazy, Suspense, useEffect } from 'react'
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
import axios from 'axios';
import Promotion from './pages/promotion';
import ReactGA from 'react-ga';

const Admin = lazy(() => import('./pages/admin'))
const Contact = lazy(() => import('./pages/contact'))
const Privacy = lazy(() => import('./pages/privacy'))
const About = lazy(() => import('./pages/about'))
const Locations = lazy(() => import('./pages/locations'))
const Popup = lazy(() => import('./components/popup'))
const DailyDeals = lazy(() => import('./pages/daily-deals'))
const PageNotFound = lazy(() => import('./pages/404-page'))
const Shop = lazy(() => import('./pages/shop'))
const Unsubscribe = lazy(() => import('./pages/unsubscribe'))


// ReactGA.initialize('G-4LYR5NJ1M2');

//this is the current one
ReactGA.initialize('G-7YRLX8GP7B');

function App() {
  const [isAdminAuthenticated, userAdminHasAuthenticated] = useState(false);
  const [isShopAuthenticated, userShopHasAuthenticated] = useState(false);

  const [data, setData] = useState(null);
  const [discountCodes, setDiscountCodes] = useState(null);
  useEffect(() => {
    axios
      .get("/api/product/find")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get('/api/discount/find')
      .then((res) => { setDiscountCodes(res.data) })
      .catch((err) => console.log(err));
  }, [])
  // const TRACKING_ID = "AW-11036011591"; // OUR_TRACKING_ID
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <AppContext.Provider value={{ isAdminAuthenticated, userAdminHasAuthenticated, isShopAuthenticated, userShopHasAuthenticated }}>
            <Routes>
              <Route index element={<Home data={data} />} />
              <Route path='/cart' element={<Cart discountCodes={discountCodes} />} />
              <Route path='/popup' element={<Popup />} />
              <Route path='/about-us' element={<About />} />
              <Route path='/locations' element={<Locations />} />
              <Route path='/menu' element={<Menu data={data} />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/privacy-policy' element={<Privacy />} />
              <Route path='/daily-deals' element={<DailyDeals />} />
              <Route path='/shop/:id' element={<Shop />} />
              <Route path='/admin' element={<Admin />} />
              <Route path='/unsubscribe/:id' element={<Unsubscribe />} />
              <Route path='/promotions' element={<Promotion data={data} />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </AppContext.Provider>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
