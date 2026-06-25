import { Menu, Search } from "lucide-react";


function Navbar({ onMenuClick }) {
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");  
  return (
    <header className="sticky top-0 z-30 flex h-16 flex-shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
      {/* Mobile menu trigger */}
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Global search — same pattern reused on Visitors/Workers/Passes/Logs tables */}
      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search visitors, passes, workers..."
          className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        />
      </div>

      {/* Spacer pushes the right cluster to the edge when search is hidden */}
      <div className="flex-1 sm:hidden" />

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="h-8 w-px bg-slate-200" />

        {/* Current user */}
        <button type="button" className="flex items-center gap-3 rounded-lg p-1 hover:bg-slate-50">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
            {name?.charAt(0).toUpperCase()}
          </span>
          <span className="hidden text-left sm:block">
            <p className="text-sm font-medium leading-tight text-slate-800">{name}</p>
            <p className="text-xs leading-tight text-slate-500">{role}</p>
          </span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;