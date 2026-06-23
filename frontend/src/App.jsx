import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Visitors from "./pages/Visitors";
import Workers from "./pages/Workers";
import Passes from "./pages/Passes";
import Logs from "./pages/Logs";
import Reports from "./pages/Reports";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Gates from "./pages/Gates";
import Areas from "./pages/Areas";
import Buildings from "./pages/Buildings";
import Departments from "./pages/Departments";

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
          <ProtectedRoutes
            roles={[
              "admin",
              "receptionist"
            ]}
          >
            <Visitors />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/workers"
        element={
          <ProtectedRoutes
            roles={[
              "admin",
              "receptionist"
            ]}
          >
            <Workers />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/passes"
        element={
          <ProtectedRoutes
            roles={[
              "admin",
              "receptionist"
            ]}
          >
            <Passes />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/logs"
        element={
          <ProtectedRoutes
            roles={[
              "admin",
              "security"
            ]}
          >
            <Logs />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoutes
            roles={["admin"]}
          >
            <Reports />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/gates"
        element={
          <ProtectedRoutes
            roles={["admin"]}
          >
              <Gates />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/areas"
        element={
          <ProtectedRoutes
            roles={["admin"]}
          >
            <Areas />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/buildings"
        element={
          <ProtectedRoutes
            roles={["admin"]}
          >
            <Buildings />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/departments"
        element={
          <ProtectedRoutes
            roles={["admin"]}
          >
            <Departments />
          </ProtectedRoutes>
        }
      />

    </Routes>
  );
}

export default App;