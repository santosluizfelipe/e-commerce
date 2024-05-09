import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Secure from "./components/secure/Secure";
import Account from "./components/account/Account";
import BuyerDashboard from "./components/BuyerDashboard/BuyerDashboard";
import SellerDashboard from "./components/SellerDashboard/SellerDashboard";
import "./App.css";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/secure" element={<Secure />} />
          <Route path="/account" element={<Account/>} />
          <Route path="/BuyerDashboard" element={<BuyerDashboard/>} />
          <Route path="/SellerDashboard" element={<SellerDashboard/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;