import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * DESIGN SYSTEM REFERENCE
 * Every page (Dashboard, Visitors, Workers, Passes, Logs, Reports) is built
 * on top of this shell. Keep these tokens in mind so new components stay
 * visually consistent — copy these classes rather than inventing new ones.
 * ─────────────────────────────────────────────────────────────────────────
 * Page background      bg-slate-50
 * Cards / surfaces      bg-white, rounded-2xl, border border-slate-200, shadow-sm
 * Primary action        bg-blue-600 hover:bg-blue-700 text-white, rounded-lg
 * Secondary action       bg-white border border-slate-300 text-slate-700 hover:bg-slate-50
 * Body text             text-slate-700 / muted text-slate-500
 * Headings              text-slate-900 font-semibold
 * Inputs                rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
 * Sidebar width          18rem (w-72), fixed on lg+, slide-over drawer below lg
 * Page gutters           px-4 sm:px-6 lg:px-8, content capped at max-w-7xl
 * ─────────────────────────────────────────────────────────────────────────
 */

/**
 * DashboardLayout
 * Shared shell for every authenticated page. Renders the sidebar + navbar,
 * and gives every page a consistent header (title, description, actions)
 * so e.g. "Visitors" and "Workers" line up pixel-for-pixel.
 *
 * @param {string} title - Page title shown in the header (e.g. "Visitors")
 * @param {string} description - Optional one-line subtitle under the title
 * @param {React.ReactNode} actions - Optional right-aligned controls (buttons, etc.)
 * @param {React.ReactNode} children - Page content
 */
function DashboardLayout({ title, description, actions, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Offset content by sidebar width on desktop */}
      <div className="min-h-screen lg:ml-72">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Consistent page header — every page passes title/description/actions */}
            {(title || description || actions) && (
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  {title && (
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                      {title}
                    </h1>
                  )}
                  {description && (
                    <p className="mt-1 text-sm text-slate-500">{description}</p>
                  )}
                </div>
                {actions && (
                  <div className="flex flex-shrink-0 items-center gap-3">
                    {actions}
                  </div>
                )}
              </div>
            )}

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;