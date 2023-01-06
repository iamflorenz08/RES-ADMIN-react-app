import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/header";
import Dashboard from "./components/Dashboard/Dashboard";
import Requisition from "./components/Requsition/Requisition";
import Stock from "./components/Stock/Stock";
import Employees from "./components/Employees/Employees";
import RequisitionLogs from "./components/RequsitionLogs/RequisitionLogs";
import Settings from "./components/AccountSettings/Settings";
import StockLogs from "./components/StockLogs/StockLogs";
import Report from "./components/Report/Report";
import Login from "./components/Login";
import StockReport from "./components/Report/StockReport";

const getToken = () =>{
   return sessionStorage.getItem("token") || null
}

function App() {
  const [active, setActive] = useState('')
  const [token, setToken] = useState(getToken())
  
  if(!token){
    return <Login setToken={setToken} />
  }

  return (
    <>
      <div className="flex">
        <Sidebar active={active} />
        <div className="block w-full bg-blue-50 relative">
          <Header />
          <Routes>
            <Route path="/dashboard" element={<Dashboard setActive={setActive} />} />
            <Route path="/requisition" element={<Requisition setActive={setActive} />} />
            <Route path="/stock" element={<Stock setActive={setActive} />} />
            <Route path="/employees" element={<Employees setActive={setActive} />} />
            <Route path="/logs/requisition" element={<RequisitionLogs setActive={setActive} />} />
            <Route path="/logs/stock" element={<StockLogs setActive={setActive} />} />
            <Route path="/settings" element={<Settings setActive={setActive} />} />
            <Route path="/report/requisition/:id" element={<Report />} />
            <Route path="/report/stock" element={<StockReport />} />
            <Route path="*" element={<Dashboard setActive={setActive} />} />
          </Routes>
        </div>
      </div>

    </>
  );
}

export default App;
