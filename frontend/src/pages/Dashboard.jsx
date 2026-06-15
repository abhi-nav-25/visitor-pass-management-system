import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext,useState, useEffect } from "react";
import API from "../services/api";

function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [visitorCount, setVisitorCount] = useState(0);
  const [workerCount, setWorkerCount] = useState(0);
  const [passCount, setPassCount] = useState(0);
  const [logCount, setLogCount] = useState(0);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const [recentVisitors, setRecentVisitors] = useState([]);
  const [recentLogs, setRecentLogs] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const visitors = await API.get("/visitors");
        const workers = await API.get("/workers");
        const passes = await API.get("/passes");
        const logs = await API.get("/logs");
        setVisitorCount(visitors.data.length);
        setWorkerCount(workers.data.length);
        setPassCount(passes.data.length);
        setLogCount(logs.data.logs.length);
        setRecentVisitors(visitors.data);
        setRecentLogs(logs.data.logs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout>
      <h1>Dashboard</h1>
        <button onClick={handleLogout}>
          Logout
        </button>
        <div style={{display: "grid",gridTemplateColumns: "repeat(4, 1fr)",gap: "20px",marginTop: "20px"}}>
            <StatCard title="Total Visitors" value={visitorCount} />
            <StatCard title="Total Workers" value={workerCount} />
            <StatCard title="Active Passes" value={passCount} />
            <StatCard title="People Inside" value={logCount} />    
        </div>

        <div
          style={{
            marginTop: "30px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
        <h3>Recent Visitors</h3>
        <table style={{ width: "100%", marginTop: "15px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {recentVisitors.map((visitor) => (
              <tr key={visitor._id}>
                <td>{visitor.name}</td>
                <td>{visitor.mobile}</td>
                <td>{visitor.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table> 
      </div>

      <div
        style={{
          marginTop: "20px",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h3>Recent Entry Logs</h3>
        <table style={{ width: "100%", marginTop: "15px" }}>
          <thead>
            <tr>
              <th>Entry Time</th>
              <th>Exit Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {recentLogs.map((log) => (
              <tr key={log._id}>
                <td>{new Date(log.entryTime).toLocaleString()}</td>
                <td>{log.exitTime ? new Date(log.exitTime).toLocaleString() : "Still Inside"}</td>
                <td>{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;