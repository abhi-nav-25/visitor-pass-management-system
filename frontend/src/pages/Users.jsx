import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import { Navigate } from "react-router-dom";
import {
    ShieldCheck,
    Search,
    Trash2,
    PlusCircle,
    X,
    UserCog,
    Mail,
    Lock,
    ChevronDown,
} from "lucide-react";

const ROLES = ["admin", "security", "receptionist", "reports"];

const roleBadge = {
    admin: "bg-violet-100 text-violet-700 ring-violet-200",
    security: "bg-blue-100 text-blue-700 ring-blue-200",
    receptionist: "bg-amber-100 text-amber-700 ring-amber-200",
    reports: "bg-green-100 text-green-700 ring-green-200",
};

const roleIcon = {
    admin: "bg-violet-100",
    security: "bg-blue-100",
    receptionist: "bg-amber-100",
    reports: "bg-green-100",
};

function Users() {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
        return <Navigate to="/dashboard" />;
    }
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "receptionist",
    });

    const filteredUsers = users.filter(
        (user) =>
            (user.name || "").toLowerCase().includes(search.toLowerCase()) ||
            (user.email || "").toLowerCase().includes(search.toLowerCase()) ||
            (user.role || "").toLowerCase().includes(search.toLowerCase())
    );

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await API.get("/auth/users");
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            await API.post("/auth/register", formData);
            setFormData({ name: "", email: "", password: "", role: "receptionist" });
            setShowModal(false);
            fetchUsers();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create user.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );
        if (!confirmDelete) return;
        try {
            await API.delete(`/auth/users/${id}`);
            setUsers((prev) => prev.filter((user) => user._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const openModal = () => {
        setFormData({ name: "", email: "", password: "", role: "receptionist" });
        setError("");
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setError("");
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <DashboardLayout
            title="Users"
            description="Manage admin and staff user accounts"
        >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm">Total Users</p>
                        <h2 className="text-4xl font-bold mt-2 text-slate-900">
                            {users.length}
                        </h2>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                        <UserCog className="h-6 w-6 text-blue-600" />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm">Search Results</p>
                        <h2 className="text-4xl font-bold mt-2 text-green-600">
                            {filteredUsers.length}
                        </h2>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                        <Search className="h-6 w-6 text-green-600" />
                    </div>
                </div>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
                    <input
                        type="text"
                        placeholder="Search by name, email or role..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-80 px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        onClick={openModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2"
                    >
                        <PlusCircle size={18} />
                        Add User
                    </button>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="py-12 text-center text-slate-500">
                        Loading users...
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="py-16 text-center">
                        <UserCog className="h-12 w-12 mx-auto text-slate-300 mb-3" />
                        <p className="text-lg font-semibold text-slate-700">
                            No Users Found
                        </p>
                        <p className="text-slate-500 mt-2">
                            User accounts will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b bg-slate-50">
                                    <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        #
                                    </th>
                                    <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Name
                                    </th>
                                    <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Email
                                    </th>
                                    <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Role
                                    </th>
                                    <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredUsers.map((user, index) => (
                                    <tr
                                        key={user._id}
                                        className="border-b hover:bg-blue-50 transition-colors"
                                    >
                                        <td className="p-3">{index + 1}</td>

                                        <td className="p-3 font-medium text-slate-800">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-slate-600 ${roleIcon[user.role] || "bg-slate-100"
                                                        }`}
                                                >
                                                    {(user.name || "?")[0].toUpperCase()}
                                                </div>
                                                {user.name}
                                            </div>
                                        </td>

                                        <td className="p-3 text-slate-600">{user.email}</td>

                                        <td className="p-3">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ${roleBadge[user.role] ||
                                                    "bg-slate-100 text-slate-500 ring-slate-200"
                                                    }`}
                                            >
                                                <ShieldCheck size={11} />
                                                {user.role
                                                    ? user.role.charAt(0).toUpperCase() +
                                                    user.role.slice(1)
                                                    : "—"}
                                            </span>
                                        </td>

                                        <td className="p-3">
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-lg flex items-center gap-1"
                                            >
                                                <Trash2 size={14} />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        onClick={closeModal}
                    />

                    {/* Modal Card */}
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md ring-1 ring-slate-200 z-10">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800">
                                    Add New User
                                </h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Create a staff or admin account
                                </p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="h-8 w-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
                            >
                                <X size={16} className="text-slate-500" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                                    {error}
                                </div>
                            )}

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <UserCog
                                        size={15}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                    />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail
                                        size={15}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock
                                        size={15}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Role */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Role
                                </label>
                                <div className="relative">
                                    <ChevronDown
                                        size={15}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                    />
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full appearance-none px-4 py-2.5 border border-slate-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {ROLES.map((role) => (
                                            <option key={role} value={role}>
                                                {role.charAt(0).toUpperCase() + role.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-1">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 transition"
                                >
                                    {submitting ? (
                                        <>
                                            <svg
                                                className="h-4 w-4 animate-spin"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                />
                                            </svg>
                                            Creating...
                                        </>
                                    ) : (
                                        "Create User"
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}

export default Users;