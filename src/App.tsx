// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomeScreen from './features/home/HomeScreen';
// import ProductsScreen from './features/products/ProductsScreen';
// import ProductDetailsScreen from './features/productDetails/ProductDetailsScreen';
// import CartScreen from './features/cart/CartScreen';
// import LoginScreen from './features/login/LoginScreen';
// import RegisterScreen from './features/register/RegisterScreen';
// import Navbar from './components/Navbar';
// import { CartProvider } from './context/CartContext';

// function App() {
//   // Hide Navbar on login/register screens
//   const hideNavbar = window.location.pathname === '/' || window.location.pathname === '/login' || window.location.pathname === '/register';
//   return (
//     <CartProvider>
//       <Router>
//         <div className="App">
//           {!hideNavbar && <Navbar />}
//           <Routes>
//             <Route path="/" element={<LoginScreen />} />
//             <Route path="/home" element={<HomeScreen />} />
//             <Route path="/products" element={<ProductsScreen />} />
//             <Route path="/products/:id" element={<ProductDetailsScreen />} />
//             <Route path="/cart" element={<CartScreen />} />
//             <Route path="/login" element={<LoginScreen />} />
//             <Route path="/register" element={<RegisterScreen />} />
//           </Routes>
//         </div>
//       </Router>
//     </CartProvider>
//   );
// }

// export default App;
import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomeScreen from './features/home/HomeScreen';
import ProductsScreen from './features/products/ProductsScreen';
import ProductDetailsScreen from './features/productDetails/ProductDetailsScreen';
import CartScreen from './features/cart/CartScreen';
import LoginScreen from './features/login/LoginScreen';
import RegisterScreen from './features/register/RegisterScreen';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';

function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === '/' ||
    location.pathname === '/login' ||
    location.pathname === '/register';

  return (
    <CartProvider>
      <div className="App">
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/products" element={<ProductsScreen />} />
          <Route path="/products/:id" element={<ProductDetailsScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;

// ref: https://github.com/MMansy19/E-Commerce-Website/blob/main/src/App.jsx
