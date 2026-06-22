import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import {
  LayoutGrid,
  Search,
  Pencil,
  Trash2,
  PlusCircle,
} from "lucide-react";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    departmentName: "",
    departmentCode: "",
    building: "",
  });

  const filteredDepartments = departments.filter(
    (dept) =>
      (dept.departmentName || "").toLowerCase().includes(search.toLowerCase()) ||
      (dept.departmentCode || "").toLowerCase().includes(search.toLowerCase()) ||
      (dept.building?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const fetchDepartments = async () => {
    try {
      const res = await API.get("/departments");
      setDepartments(res.data);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchBuildings = async () => {
    try {
      const res = await API.get("/buildings");
      setBuildings(res.data);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/departments/${editingId}`, formData);
        await fetchDepartments();
        setEditingId(null);
      } else {
        await API.post("/departments", formData);
        await fetchDepartments();
      }
      setFormData({
        departmentName: "",
        departmentCode: "",
        building: "",
      });
      setShowForm(false);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (dept) => {
    setFormData({
      departmentName: dept.departmentName,
      departmentCode: dept.departmentCode,
      building: dept.building?._id || dept.building || "",
    });
    setEditingId(dept._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?"
    );
    if (!confirmDelete) return;
    try {
      await API.delete(`/departments/${id}`);
      setDepartments((prev) => prev.filter((dept) => dept._id !== id));
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchBuildings();
  }, []);

  return (
    <DashboardLayout
      title="Departments"
      description="Manage departments and their assigned buildings"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm">Total Departments</p>

            <h2 className="text-4xl font-bold mt-2 text-slate-900">
              {departments.length}
            </h2>
          </div>

          <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <LayoutGrid className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm">Search Results</p>

            <h2 className="text-4xl font-bold mt-2 text-green-600">
              {filteredDepartments.length}
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
            placeholder="Search by name, code or building..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setFormData({
                departmentName: "",
                departmentCode: "",
                building: "",
              });
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2"
          >
            <PlusCircle size={18} />
            Add Department
          </button>
        </div>

        {/* Form */}

        {showForm && (
          <div className="bg-slate-50 rounded-xl p-5 mb-6 border">
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Department" : "Add Department"}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  required
                  type="text"
                  name="departmentName"
                  placeholder="Department Name"
                  value={formData.departmentName}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-2"
                />

                <input
                  required
                  type="text"
                  name="departmentCode"
                  placeholder="Department Code"
                  value={formData.departmentCode}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-2"
                />

                <select
                  required
                  name="building"
                  value={formData.building}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-2 bg-white"
                >
                  <option value="">Select Building</option>
                  {buildings.map((building) => (
                    <option key={building._id} value={building._id}>
                      {building.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"
                >
                  {editingId ? "Update Department" : "Save Department"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({
                      departmentName: "",
                      departmentCode: "",
                      building: "",
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
            Loading departments...
          </div>
        ) : filteredDepartments.length === 0 ? (
          <div className="py-16 text-center">
            <LayoutGrid className="h-12 w-12 mx-auto text-slate-300 mb-3" />

            <p className="text-lg font-semibold text-slate-700">
              No Departments Found
            </p>

            <p className="text-slate-500 mt-2">
              Department records will appear here.
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
                    Department Name
                  </th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Department Code
                  </th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Building
                  </th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredDepartments.map((dept, index) => (
                  <tr
                    key={dept._id}
                    className="border-b hover:bg-blue-50 transition-colors"
                  >
                    <td className="p-3">{index + 1}</td>

                    <td className="p-3 font-medium text-slate-800">
                      {dept.departmentName}
                    </td>

                    <td className="p-3">
                      <span className="font-mono text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                        {dept.departmentCode}
                      </span>
                    </td>

                    <td className="p-3">
                      <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">
                        {dept.building?.name || (
                          <span className="text-slate-300">—</span>
                        )}
                      </span>
                    </td>

                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(dept)}
                        className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1 rounded-lg flex items-center gap-1"
                      >
                        <Pencil size={14} />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(dept._id)}
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
    </DashboardLayout>
  );
}

export default Departments;