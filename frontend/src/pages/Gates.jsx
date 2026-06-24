import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  DoorOpen,
  Search,
  Pencil,
  Trash2,
  PlusCircle,
} from "lucide-react";

function Gates() {
  const [gates, setGates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    gateName: "",
    gateCode: "",
    location: "",
    status: "active",
  });

  const { role } = useContext(AuthContext);
  const isAdmin = role === "admin";

  const filteredGates = gates.filter(
    (gate) =>
      (gate.gateName || "").toLowerCase().includes(search.toLowerCase()) ||
      (gate.gateCode || "").toLowerCase().includes(search.toLowerCase()) ||
      (gate.location || "").toLowerCase().includes(search.toLowerCase())
  );

  const fetchGates = async () => {
    try {
      const res = await API.get("/gates");
      setGates(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load gates");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createGate = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await API.put(`/gates/${editingId}`, formData);
        setGates(
          gates.map((gate) =>
            gate._id === editingId ? res.data : gate
          )
        );
        setEditingId(null);
      } else {
        const res = await API.post("/gates", formData);
        setGates((prev) => [...prev, res.data]);
      }
      setFormData({
        gateName: "",
        gateCode: "",
        location: "",
        status: "active",
      });
      setShowForm(false);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Operation failed");  
    }
  };

  const handleEdit = (gate) => {
    setFormData({
      gateName: gate.gateName,
      gateCode: gate.gateCode,
      location: gate.location,
      status: gate.status,
    });
    setEditingId(gate._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gate?"
    );
    if (!confirmDelete) return;
    try {
      await API.delete(`/gates/${id}`);
      setGates((prev) => prev.filter((gate) => gate._id !== id));
    } catch (error) {
      console.log(error);
      alert("Failed to delete gate");
    }
  };

  useEffect(() => {
    fetchGates();
  }, []);

  return (
    <DashboardLayout
      title="Gates"
      description="Manage entry and exit gate configurations"
    >
      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm">Total Gates</p>

            <h2 className="text-4xl font-bold mt-2 text-slate-900">
              {gates.length}
            </h2>
          </div>

          <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <DoorOpen className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm">Search Results</p>

            <h2 className="text-4xl font-bold mt-2 text-green-600">
              {filteredGates.length}
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
            placeholder="Search by name, code or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {isAdmin && (
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setFormData({
                gateName: "",
                gateCode: "",
                location: "",
                status: "active",
              });
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2"
          >
            <PlusCircle size={18} />
            Add Gate
          </button>
          )}
        </div>

        {/* Form */}

        {isAdmin && showForm && (
          <div className="bg-slate-50 rounded-xl p-5 mb-6 border">
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Gate" : "Add Gate"}
            </h3>

            <form onSubmit={createGate}>
              <div className="grid md:grid-cols-4 gap-4">
                <input
                  required
                  type="text"
                  name="gateName"
                  placeholder="Gate Name"
                  value={formData.gateName}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-2"
                />

                <input
                  required
                  type="text"
                  name="gateCode"
                  placeholder="Gate Code"
                  value={formData.gateCode}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-2"
                />

                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-2"
                />

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-2 bg-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"
                >
                  {editingId ? "Update Gate" : "Save Gate"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({
                      gateName: "",
                      gateCode: "",
                      location: "",
                      status: "active",
                    });
                  }}
                  className="bg-slate-200 hover:bg-slate-300 px-5 py-2 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Loading */}

        {loading ? (
          <div className="py-12 text-center text-slate-500">
            Loading gates...
          </div>
        ) : filteredGates.length === 0 ? (
          <div className="py-16 text-center">
            <DoorOpen className="h-12 w-12 mx-auto text-slate-300 mb-3" />

            <p className="text-lg font-semibold text-slate-700">
              No Gates Found
            </p>

            <p className="text-slate-500 mt-2">
              Gate records will appear here.
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
                    Gate Name
                  </th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Gate Code
                  </th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Location
                  </th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredGates.map((gate, index) => (
                  <tr
                    key={gate._id}
                    className="border-b hover:bg-blue-50 transition-colors"
                  >
                    <td className="p-3">{index + 1}</td>

                    <td className="p-3 font-medium text-slate-800">
                      {gate.gateName}
                    </td>

                    <td className="p-3">
                      <span className="font-mono text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                        {gate.gateCode}
                      </span>
                    </td>

                    <td className="p-3 text-slate-600">{gate.location}</td>

                    <td className="p-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          gate.status === "active"
                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                            : "bg-slate-100 text-slate-500 ring-1 ring-slate-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            gate.status === "active"
                              ? "bg-emerald-500"
                              : "bg-slate-400"
                          }`}
                        />
                        {gate.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="p-3">
                      {isAdmin ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(gate)}
                            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1 rounded-lg flex items-center gap-1"
                          >
                            <Pencil size={14} />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(gate._id)}
                            className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-lg flex items-center gap-1"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      ):(
                      <span className="text-slate-400 text-sm">
                        Read Only
                      </span>
                      )}
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

export default Gates;