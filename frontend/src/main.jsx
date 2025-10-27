import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import App from './App.jsx'
import LoginPage from './LoginPage.jsx'
import RegisterPage from './RegisterPage.jsx'
import CustomerHomePage from './CustomerHomePage.jsx'
import AboutPage from './pages/About.jsx'
import ContactPage from './pages/Contact.jsx'
import StyleCombo from './pages/StyleCombo.jsx'
import AccountPage from './pages/Account.jsx'
import OrdersPage from './pages/account/Orders.jsx'
import WalletPage from './pages/account/Wallet.jsx'
import VipOffersPage from './pages/account/VipOffers.jsx'
import MensShopAll from './pages/MensShopAll.jsx'
import MenTops from './pages/men/MenTops.jsx'
import MenJeans from './pages/men/MenJeans.jsx'
import MenAccessories from './pages/men/MenAccessories.jsx'
import MenFootwear from './pages/men/MenFootwear.jsx'
import WomenShopAll from './pages/WomenShopAll.jsx'
import WomenTops from './pages/women/WomenTops.jsx'
import WomenJeans from './pages/women/WomenJeans.jsx'
import WomenAccessories from './pages/women/WomenAccessories.jsx'
import WomenFootwear from './pages/women/WomenFootwear.jsx'
import KidsShopAll from './pages/kids/KidsShopAll.jsx'
import KidsTops from './pages/kids/KidsTops.jsx'
import KidsJeans from './pages/kids/KidsJeans.jsx'
import KidsAccessories from './pages/kids/KidsAccessories.jsx'
import KidsFootwear from './pages/kids/KidsFootwear.jsx'
import Kids0to3 from './pages/kids/Kids0to3.jsx'
import Kids4to7 from './pages/kids/Kids4to7.jsx'
import Kids8to12 from './pages/kids/Kids8to12.jsx'
import AdminDashboard from './pages/admin/Dashboard.jsx'
import AdminProducts from './pages/admin/Products.jsx'
import AdminOrders from './pages/admin/Orders.jsx'
import AdminCustomers from './pages/admin/Customers.jsx'
import AdminAddItems from './pages/admin/AddItems.jsx'
import AdminPayments from './pages/admin/Payments.jsx'
import CartPage from './pages/Cart.jsx'
import CheckoutPage from './pages/Checkout.jsx'
import PaymentPage from './pages/Payment.jsx'
import SearchPage from './pages/Search.jsx'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public site routes wrapped by public Layout */}
        <Route element={<Layout theme="dark" />}> 
          {/* Public routes */}
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}> 
            <Route path="/customer" element={<CustomerHomePage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/orders" element={<OrdersPage />} />
            <Route path="/account/wallet" element={<WalletPage />} />
            <Route path="/account/vip" element={<VipOffersPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/style-combos" element={<StyleCombo />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/mens" element={<MensShopAll />} />
            <Route path="/mens/tops" element={<MenTops />} />
            <Route path="/mens/jeans" element={<MenJeans />} />
            <Route path="/mens/accessories" element={<MenAccessories />} />
            <Route path="/mens/footwear" element={<MenFootwear />} />
            <Route path="/womens" element={<WomenShopAll />} />
            <Route path="/womens/tops" element={<WomenTops />} />
            <Route path="/womens/jeans" element={<WomenJeans />} />
            <Route path="/womens/accessories" element={<WomenAccessories />} />
            <Route path="/womens/footwear" element={<WomenFootwear />} />
            <Route path="/kids" element={<KidsShopAll />} />
            <Route path="/kids/0-3" element={<Kids0to3 />} />
            <Route path="/kids/4-7" element={<Kids4to7 />} />
            <Route path="/kids/8-12" element={<Kids8to12 />} />
            <Route path="/kids/tops" element={<KidsTops />} />
            <Route path="/kids/jeans" element={<KidsJeans />} />
            <Route path="/kids/accessories" element={<KidsAccessories />} />
            <Route path="/kids/footwear" element={<KidsFootwear />} />
          </Route>
        </Route>

        {/* Admin routes without public Layout (no site header/footer) */}
        <Route element={<ProtectedRoute />}> 
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/additems" element={<AdminAddItems />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
