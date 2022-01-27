import './App.css';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Menu from './Components/Menu';
import Profile from './Components/Profile';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Cart from './Components/Cart';
import Success from './Components/Success';
import Order from './Components/Order'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profile" element={<Profile />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/success" element={<Success />}/>
          <Route path="/order" element={<Order />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
