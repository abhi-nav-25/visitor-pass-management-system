import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Visitors from "./pages/Visitors";
import Workers from "./pages/Workers";
import Passes from "./pages/Passes";
import Logs from "./pages/Logs";
import Reports from "./pages/Reports";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/visitors"
        element={
          <ProtectedRoutes>
            <Visitors />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/workers"
        element={
          <ProtectedRoutes>
            <Workers />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/passes"
        element={
          <ProtectedRoutes>
            <Passes />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/logs"
        element={
          <ProtectedRoutes>
            <Logs />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoutes>
            <Reports />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}

export default App;