import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
import axios from "axios";

const getToken = () => {
  return sessionStorage.getItem("token") || null
}

function App() {
  const baseURL = process.env.REACT_APP_API
  const navigate = useNavigate()
  const [active, setActive] = useState('')
  const [token, setToken] = useState(getToken())
  const [details, setDetails] = useState(null)

  useEffect(() => {
    const SetAccess = async () => {
      if (token) {
        let details = await axios.get(`${baseURL}/auth/admin/detail?token=${token}`)
        details = details.data
        setDetails(details)
        redirect(details)
      }
    }

    const redirect = (details) => {
      if (details) {
        if (details.adminType === 'custodian') {
          navigate('/dashboard')
        }
        else {
          navigate('/logs/requisition')
        }
      }
    }

    SetAccess()
  }, [baseURL, token]);


  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <>
      <div className="flex">
        <Sidebar active={active} details={details} />
        <div className="block w-full bg-blue-50 relative">
          <Header setToken={setToken} details={details} />
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
