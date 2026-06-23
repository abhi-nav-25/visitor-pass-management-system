import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import {
  Users,
  HardHat,
  IdCard,
  ShieldCheck,
  ShieldOff,
  DoorOpen,
} from "lucide-react";

const statCards = [
  {
    key: "visitors",
    title: "Total Visitors",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    valueColor: "text-slate-900",
  },
  {
    key: "workers",
    title: "Total Workers",
    icon: HardHat,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    valueColor: "text-slate-900",
  },
  {
    key: "passes",
    title: "Total Passes",
    icon: IdCard,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    valueColor: "text-slate-900",
  },
  {
    key: "active",
    title: "Active Passes",
    icon: ShieldCheck,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    valueColor: "text-emerald-600",
  },
  {
    key: "expired",
    title: "Expired Passes",
    icon: ShieldOff,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    valueColor: "text-red-500",
  },
  {
    key: "inside",
    title: "People Inside",
    icon: DoorOpen,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    valueColor: "text-amber-600",
  },
];

function Reports() {
  const [stats, setStats] = useState({
    visitors: 0,
    workers: 0,
    passes: 0,
    active: 0,
    expired: 0,
    inside: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [
        visitorsRes,
        workersRes,
        passesRes,
        logsRes,
      ] = await Promise.all([
        API.get("/visitors"),
        API.get("/workers"),
        API.get("/passes"),
        API.get("/logs/inside"),
      ]);

      const passes = passesRes.data;
      setStats({
        visitors: visitorsRes.data.length,
        workers: workersRes.data.length,
        passes: passes.length,
        active: passes.filter((p) => p.status === "active").length,
        expired: passes.filter((p) => p.status === "expired").length,
        inside: logsRes.data.length,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout
        title="Reports"
        description="System summary and statistics"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <div className="h-3 w-24 bg-slate-100 rounded-lg" />
                  <div className="h-8 w-16 bg-slate-100 rounded-lg" />
                </div>
                <div className="h-12 w-12 rounded-xl bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Reports"
      description="System summary and statistics"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map(
          ({ key, title, icon: Icon, iconBg, iconColor, valueColor }) => (
            <div
              key={key}
              className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 flex items-center justify-between"
            >
              <div>
                <p className="text-slate-500 text-sm">{title}</p>

                <h2 className={`text-4xl font-bold mt-2 ${valueColor}`}>
                  {stats[key]}
                </h2>
              </div>

              <div
                className={`h-12 w-12 rounded-xl ${iconBg} flex items-center justify-center`}
              >
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>
            </div>
          )
        )}
      </div>
    </DashboardLayout>
  );
}

export default Reports;