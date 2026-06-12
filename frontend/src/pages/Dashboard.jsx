import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";

function Dashboard() {
  return (
    <DashboardLayout>
      <h1>Dashboard</h1>

        <div style={{display: "grid",gridTemplateColumns: "repeat(4, 1fr)",gap: "20px",marginTop: "20px"}}>
            <StatCard title="Total Visitors" value="120" />
            <StatCard title="Total Workers" value="45" />
            <StatCard title="Active Passes" value="87" />
            <StatCard title="People Inside" value="32" />    
        </div>

        <div style={{marginTop: "30px",background: "white",padding: "20px",borderRadius: "10px"}}>
            <h3>Recent Visitors</h3>
        </div>

        <div style={{marginTop: "20px",background: "white",padding: "20px",borderRadius: "10px"}}>
            <h3>Recent Entry Logs</h3>
        </div>
    </DashboardLayout>
  );
}

export default Dashboard;