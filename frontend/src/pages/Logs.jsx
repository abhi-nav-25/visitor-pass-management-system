import DashboardLayout from "../layouts/DashboardLayout";
import { useState,useEffect } from "react";
import API from "../services/api";
import { ScrollText, LogIn, LogOut, FileSearch } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Logs() {
  const [logs,setLogs]=useState([]);
  const [search,setSearch]=useState("");
  const [statusFilter,setStatusFilter]=useState("all");
  const [loading,setLoading]=useState(true);
  const { role } = useContext(AuthContext);
  const isSecurity = role === "security";

  useEffect(()=>{
    fetchLogs();
  },[]);

  const fetchLogs = async () => {
    try {
      const response = isSecurity
        ? await API.get("/logs/inside")
        : await API.get("/logs");
      console.log(response.data);
      setLogs(response.data.logs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs=logs.filter((log)=>{
    const holder=
      log.pass?.passType==="visitor"
        ? log.pass?.visitor?.name
        : log.pass?.worker?.name;
    const matchesSearch=(holder||"")
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus=
      statusFilter==="all"
        ? true
        : log.status===statusFilter;
  
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout
      title={isSecurity ? "Currently Inside" : "Entry & Exit Logs"}
      description={isSecurity ? "People currently inside the facility" : "Monitor visitor and worker movement across the facility"}
    >
      <div
        className={`grid gap-6 mb-8 ${
          isSecurity
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-3"
        }`}
      >
        <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm">
              Total Logs
            </p>
            <h2 className="text-4xl font-bold mt-2 text-slate-900">
              {logs.length}
            </h2>
          </div>
          <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <ScrollText className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm">
              Currently Inside
            </p>
            <h2 className="text-4xl font-bold mt-2 text-green-600">
              {logs.filter(log=>log.status==="inside").length}
            </h2>
          </div>
          <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
            <LogIn className="h-6 w-6 text-green-600" />
          </div>
        </div>
        {!isSecurity && (
        <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm">
              Exited
            </p>
            <h2 className="text-4xl font-bold mt-2 text-slate-700">
              {logs.filter(log=>log.status==="outside").length}
            </h2>
          </div>
          <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center">
            <LogOut className="h-6 w-6 text-slate-600" />
          </div>
        </div>
        )}
      </div>
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by holder..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="w-full md:w-80 px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {!isSecurity && (
          <select
            value={statusFilter}
            onChange={(e)=>setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="inside">Inside</option>
            <option value="outside">Outside</option>
          </select>
          )}
        </div>
        {loading ? (
                <div className="py-12 text-center text-slate-500">
                  Loading logs...
                </div>
              ):
        filteredLogs.length===0 ? (
          <div className="py-16 text-center">
            <FileSearch className="h-12 w-12 mx-auto text-slate-300 mb-3" />
            <p className="text-lg font-semibold text-slate-700">
              No Logs Found
            </p>
            <p className="text-slate-500 mt-2">
              Entry and exit activity will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">#</th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Holder</th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Pass Type</th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Entry Time</th>
                  {!isSecurity && (
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Exit Time</th>
                  )}
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody>
              {filteredLogs.map((log,index)=>(
                <tr
                  key={log._id}
                  className="border-b hover:bg-blue-50 transition-colors"
                >
                <td className="p-3 text-slate-500">
                  {index+1}
                </td>
                <td className="p-3">
                  {(log.pass?.passType==="visitor"
                    ? log.pass?.visitor?.name
                    : log.pass?.worker?.name) || "Unknown"}
                </td>
                <td className="p-3 capitalize">
                  {log.pass?.passType}
                </td>
                <td className="p-3">
                  {new Date(log.entryTime).toLocaleString("en-IN")}
                </td>
                {!isSecurity && (
                <td className="p-3">
                  {log.exitTime
                    ? new Date(log.exitTime).toLocaleString("en-IN")
                    : "-"}
                </td> 
                )}
                <td className="p-3">
                  <span
                    className={
                      log.status==="inside"
                        ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold"
                        : "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold"
                    }
                  >
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
      </div>
    </DashboardLayout>
  );
}

export default Logs;