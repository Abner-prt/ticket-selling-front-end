import { BrowserRouter, Routes, Route } from 'react-router';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/events" element={<EventsCatalog />} /> */}
          {/* <Route path="/events/:id" element={<EventDetail />} /> */}
          {/* <Route path="/cart" element={<Cart />} /> */}
          {/* <Route path="/checkout" element={<Checkout />} /> */}
          {/* <Route path="/my-purchases" element={<MyPurchases />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
