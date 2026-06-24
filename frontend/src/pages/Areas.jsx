import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import {
  MapPin,
  Search,
  Pencil,
  Trash2,
  PlusCircle,
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Areas() {
  const [areas, setAreas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { role } = useContext(AuthContext);
  const isAdmin = role === "admin";

  const [formData, setFormData] = useState({
    areaName: "",
    areaCode: "",
    description: "",
  });

  const filteredAreas = areas.filter(
    (area) =>
      (area.areaName || "").toLowerCase().includes(search.toLowerCase()) ||
      (area.areaCode || "").toLowerCase().includes(search.toLowerCase()) ||
      (area.description || "").toLowerCase().includes(search.toLowerCase())
  );

  const fetchAreas = async () => {
    try {
      const res = await API.get("/areas");
      setAreas(res.data);
    } catch (error) {
      console.log(error);
    alert(error.response?.data?.message || "Operation failed");
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

  const createArea = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await API.put(`/areas/${editingId}`, formData);
        setAreas(
          areas.map((area) =>
            area._id === editingId ? res.data : area
          )
        );
        setEditingId(null);
      } else {
        const res = await API.post("/areas", formData);
        setAreas((prev) => [...prev, res.data]);
      }
      setFormData({
        areaName: "",
        areaCode: "",
        description: "",
      });
      setShowForm(false);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (area) => {
    setFormData({
      areaName: area.areaName,
      areaCode: area.areaCode,
      description: area.description || "",
    });
    setEditingId(area._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this area?"
    );
    if (!confirmDelete) return;
    try {
      await API.delete(`/areas/${id}`);
      setAreas((prev) => prev.filter((area) => area._id !== id));
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  return (
    <DashboardLayout
      title="Areas"
      description="Manage facility areas and zones"
    >
      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm">Total Areas</p>

            <h2 className="text-4xl font-bold mt-2 text-slate-900">
              {areas.length}
            </h2>
          </div>

          <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <MapPin className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm">Search Results</p>

            <h2 className="text-4xl font-bold mt-2 text-green-600">
              {filteredAreas.length}
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
            placeholder="Search by name, code or description..."
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
                  areaName: "",
                  areaCode: "",
                  description: "",
                });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2"
            >
              <PlusCircle size={18} />
              Add Area
            </button>
          )}
        </div>

        {/* Form */}

        {isAdmin && showForm && (
          <div className="bg-slate-50 rounded-xl p-5 mb-6 border">
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Area" : "Add Area"}
            </h3>

            <form onSubmit={createArea}>
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  required
                  type="text"
                  name="areaName"
                  placeholder="Area Name"
                  value={formData.areaName}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-2"
                />

                <input
                  required
                  type="text"
                  name="areaCode"
                  placeholder="Area Code"
                  value={formData.areaCode}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-2"
                />

                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-2"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"
                >
                  {editingId ? "Update Area" : "Save Area"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({
                      areaName: "",
                      areaCode: "",
                      description: "",
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
            Loading areas...
          </div>
        ) : filteredAreas.length === 0 ? (
          <div className="py-16 text-center">
            <MapPin className="h-12 w-12 mx-auto text-slate-300 mb-3" />

            <p className="text-lg font-semibold text-slate-700">
              No Areas Found
            </p>

            <p className="text-slate-500 mt-2">
              Area records will appear here.
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
                    Area Name
                  </th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Area Code
                  </th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Description
                  </th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredAreas.map((area, index) => (
                  <tr
                    key={area._id}
                    className="border-b hover:bg-blue-50 transition-colors"
                  >
                    <td className="p-3">{index + 1}</td>

                    <td className="p-3 font-medium text-slate-800">
                      {area.areaName}
                    </td>

                    <td className="p-3">
                      <span className="font-mono text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                        {area.areaCode}
                      </span>
                    </td>

                    <td className="p-3 text-slate-600">
                      {area.description || (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>

                    <td className="p-3">
                      {isAdmin ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(area)}
                            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1 rounded-lg flex items-center gap-1"
                          >
                            <Pencil size={14} />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(area._id)}
                            className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-lg flex items-center gap-1"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      ) : (
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

export default Areas;