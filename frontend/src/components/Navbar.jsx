import { Menu } from "lucide-react";

function Navbar({ onMenuClick }) {
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
      {/* Mobile menu trigger */}
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Push user profile to right */}
      <div className="ml-auto flex items-center gap-4">
        <div className="h-8 w-px bg-slate-200" />

        <button
          type="button"
          className="flex items-center gap-3 rounded-lg p-1 hover:bg-slate-50"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
            {name?.charAt(0).toUpperCase()}
          </span>

          <span className="hidden text-left sm:block">
            <p className="text-sm font-medium text-slate-800">{name}</p>
            <p className="text-xs text-slate-500">{role}</p>
          </span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;