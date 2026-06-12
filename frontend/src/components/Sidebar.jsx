import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{width: "250px",minHeight: "100vh",background: "#1e293b",color: "white",padding: "20px",}}>
      <h2>Visitor Pass</h2>

      <nav style={{display: "flex",flexDirection: "column",gap: "15px",marginTop: "30px",}}>
        <NavLink to="/dashboard">Dashboard</NavLink>      
        <NavLink to="/visitors">Visitors</NavLink>
        <NavLink to="/workers">Workers</NavLink>
        <NavLink to="/passes">Passes</NavLink>
        <NavLink to="/logs">Logs</NavLink>
        <NavLink to="/reports">Reports</NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;