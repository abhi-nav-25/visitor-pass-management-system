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
import Users from "./pages/Users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes
            roles={[
              "admin",
              "receptionist",
              "security",
              "reports",
            ]}
          >
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
              "receptionist",
              "reports",
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
              "receptionist",
              "reports",
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
              "receptionist",
              "security",
              "reports",
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
              "security",
              "reports",
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
            roles={[
              "admin",
              "reports",
            ]}
          >
            <Reports />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/gates"
        element={
          <ProtectedRoutes
            roles={[
              "admin",
              "receptionist",
              "security",
              "reports",
            ]}
          >
            <Gates />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/areas"
        element={
          <ProtectedRoutes
            roles={[
              "admin",
              "receptionist",
              "security",
              "reports",
            ]}
          >
            <Areas />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/buildings"
        element={
          <ProtectedRoutes
            roles={[
              "admin",
              "receptionist",
              "security",
              "reports",
            ]}
          >
            <Buildings />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/departments"
        element={
          <ProtectedRoutes
            roles={[
              "admin",
              "receptionist",
              "security",
              "reports",
            ]}
          >
            <Departments />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoutes>
            <Users />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}

export default App;