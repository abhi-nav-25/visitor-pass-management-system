import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  HardHat,
  IdCard,
  ScrollText,
  BarChart3,
  X,
  LogOut,
  ShieldCheck,
  DoorOpen,
  MapPinned,
  Building2,
  Building
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/visitors", label: "Visitors", icon: Users },
  { to: "/workers", label: "Workers", icon: HardHat },
  { to: "/passes", label: "Passes", icon: IdCard },
  { to: "/logs", label: "Logs", icon: ScrollText },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/gates", label: "Gates", icon: DoorOpen },
  { to: "/areas", label: "Areas", icon: MapPinned },
  { to: "/buildings", label: "Buildings", icon: Building2 },
  { to: "/departments", label: "Departments", icon: Building }
];

function Sidebar({ isOpen, onClose }) {
  const { logout }=useContext(AuthContext);
  const navigate=useNavigate();
  const handleLogout=()=>{
    logout();
    navigate("/");
  };
  const linkClass = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
      isActive
        ? "bg-blue-600 text-white shadow-md shadow-blue-900/30"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-900 transition-transform duration-200 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      lg:translate-x-0`}
    >
      <div className="flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
            <ShieldCheck className="h-5 w-5 text-white" />
          </span>
          <div>
            <p className="text-base font-semibold leading-tight text-white">
              Visitor Pass
            </p>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-2">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={linkClass} onClick={onClose}>
            <Icon className="h-[18px] w-[18px] flex-shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer*/}
      <div className="border-t border-slate-800 px-4 py-4">
        <div className="flex items-center gap-3 rounded-xl px-2 py-2">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-white">
            A
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">Admin User</p>
            <p className="truncate text-xs text-slate-400">Site Administrator</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex-shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;