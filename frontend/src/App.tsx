import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Secure from "./components/secure/Secure";
import Account from "./components/account/Account";
import "./App.css";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/secure" element={<Secure />} />
          <Route path="/account" element={<Account/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;