import DashboardLayout from "../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import API from "../services/api";
import { Users, HardHat, IdCard, ScrollText, LogOut } from "lucide-react";

function Dashboard() {
  const { logout, role } = useContext(AuthContext);
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
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (role === "admin") {
          const visitors = await API.get("/visitors");
          const workers = await API.get("/workers");
          const passes = await API.get("/passes");
          const logs = await API.get("/logs");

          setVisitorCount(visitors.data.length);
          setWorkerCount(workers.data.length);
          setPassCount(passes.data.length);
          setLogCount(logs.data.logs.length);

          setRecentVisitors(visitors.data.slice(-5).reverse());
          setRecentLogs(logs.data.logs.slice(-5).reverse());
        }

        else if (role === "receptionist") {
          const visitors = await API.get("/visitors");
          const passes = await API.get("/passes");
          setVisitorCount(visitors.data.length);
          setPassCount(passes.data.length);
          setRecentVisitors(visitors.data.slice(-5).reverse());
        }

        else if (role === "reports") {
          const visitors = await API.get("/visitors");
          const passes = await API.get("/passes");
          setVisitorCount(visitors.data.length);
          setPassCount(passes.data.length);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  
  const statusStyles = {
    inside:"bg-green-100 text-green-700 ring-1 ring-green-200",
    outside:"bg-slate-100 text-slate-700 ring-1 ring-slate-200"
  };

  const getStatusBadge = (status) => {
    const style =
      statusStyles[String(status).toLowerCase()] ||
      "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20";
    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${style}`}
      >
        {status}
      </span>
    );
  };

  return (
    <DashboardLayout
      title="Dashboard"
      description="Overview of visitors, workers, passes and logs"
      actions={
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      }
    >
      {/* Summary stat cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Total Visitors</p>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <Users className="h-5 w-5 text-blue-600" />
            </span>
          </div>
          {loading ? (
            <div className="mt-3 h-8 w-16 animate-pulse rounded-md bg-slate-200" />
          ) : (
            <p className="mt-3 text-3xl font-semibold text-slate-900">{visitorCount}</p>
          )}
        </div>

          
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Total Workers</p>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <HardHat className="h-5 w-5 text-amber-600" />
            </span>
          </div>
          {loading ? (
            <div className="mt-3 h-8 w-16 animate-pulse rounded-md bg-slate-200" />
          ) : (
            <p className="mt-3 text-3xl font-semibold text-slate-900">{workerCount}</p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Total Passes</p>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <IdCard className="h-5 w-5 text-emerald-600" />
            </span>
          </div>
          {loading ? (
            <div className="mt-3 h-8 w-16 animate-pulse rounded-md bg-slate-200" />
          ) : (
            <p className="mt-3 text-3xl font-semibold text-slate-900">{passCount}</p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Entry Logs</p>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
              <ScrollText className="h-5 w-5 text-violet-600" />
            </span>
          </div>
          {loading ? (
            <div className="mt-3 h-8 w-16 animate-pulse rounded-md bg-slate-200" />
          ) : (
            <p className="mt-3 text-3xl font-semibold text-slate-900">{logCount}</p>
          )}
        </div>
      </div>

      {/* Recent Visitors */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-900">Recent Visitors</h2>
          <p className="text-sm text-slate-500">Latest visitor check-ins</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Mobile</th>
                <th className="px-6 py-3">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4">
                      <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                    </td>
                  </tr>
                ))
              ) : recentVisitors.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center">
                    <Users className="mx-auto h-8 w-8 text-slate-300" />
                    <p className="mt-3 text-sm font-medium text-slate-600">
                      No visitors yet
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      New visitor check-ins will show up here.
                    </p>
                  </td>
                </tr>
              ) : (
                recentVisitors.map((visitor) => (
                  <tr key={visitor._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {visitor.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{visitor.mobile}</td>
                    <td className="px-6 py-4 text-slate-600">{visitor.purpose}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Entry Logs */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-900">Recent Entry Logs</h2>
          <p className="text-sm text-slate-500">Latest entry and exit activity</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-3">Entry Time</th>
                <th className="px-6 py-3">Exit Time</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4">
                      <div className="h-4 w-36 animate-pulse rounded bg-slate-200" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-36 animate-pulse rounded bg-slate-200" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-5 w-20 animate-pulse rounded-full bg-slate-200" />
                    </td>
                  </tr>
                ))
              ) : recentLogs.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center">
                    <ScrollText className="mx-auto h-8 w-8 text-slate-300" />
                    <p className="mt-3 text-sm font-medium text-slate-600">
                      No entry logs yet
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Entry and exit activity will show up here.
                    </p>
                  </td>
                </tr>
              ) : (
                recentLogs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(log.entryTime).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {log.exitTime ? (
                        new Date(log.exitTime).toLocaleString()
                      ) : (
                        <span className="italic text-slate-400">Still Inside</span>
                      )}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(log.status)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;