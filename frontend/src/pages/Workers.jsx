import DashboardLayout from "../layouts/DashboardLayout";
import { useState, useEffect } from "react";
import API from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  HardHat,
  UserPlus,
  Search,
  Pencil,
  Trash2,
  Building2,
} from "lucide-react";

function Workers() {
  const [workers, setWorkers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [idProofType, setIdProofType] = useState("");
  const [idProofNumber, setIdProofNumber] = useState("");
  const [mobile, setMobile] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const { role } = useContext(AuthContext);
  const isAdmin = role === "admin";
  const isReceptionist = role === "receptionist";
  const isReports = role === "reports";

  const filteredWorkers = workers.filter(
    (worker) =>
      (worker.name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (worker.mobile || "").includes(search) ||
      (worker.department || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await API.get("/workers");
      setWorkers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        const response = await API.put(
          `/workers/${editingId}`,
          {
            name,
            mobile,
            department,
            designation,
            address,
            idProofType,
            idProofNumber,
            startDate,
            expiryDate,
          }
        );
        setWorkers(prev =>
          prev.map(worker =>
            worker._id === editingId ? response.data : worker
          )
        );
        setEditingId(null);
      } else {
        const response = await API.post("/workers", {
          name,
          mobile,
          department,
          designation,
          address,
          idProofType,
          idProofNumber,
          startDate,
          expiryDate,
        });
        setWorkers((prev) => [...prev, response.data]);
      }
      setName("");
      setMobile("");
      setDepartment("");
      setDesignation("");
      setAddress("");
      setIdProofType("");
      setIdProofNumber("");
      setStartDate("");
      setExpiryDate("");
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this worker?"
    );
    if (!confirmDelete) return;
    await API.delete(`/workers/${id}`);
    setWorkers((prev) => prev.filter((worker) => worker._id !== id));
  };

  const handleEdit = (worker) => {
    setName(worker.name);
    setMobile(worker.mobile);
    setDepartment(worker.department);
    setDesignation(worker.designation);
    setAddress(worker.address || "");
    setIdProofType(worker.idProofType || "");
    setIdProofNumber(worker.idProofNumber || "");
    setStartDate(worker.startDate ? worker.startDate.split("T")[0] : "");
    setExpiryDate(worker.expiryDate ? worker.expiryDate.split("T")[0] : "");
    setEditingId(worker._id);
    setShowForm(true);
  };

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <DashboardLayout
      title="Workers"
      description="Manage worker records and details"
    >
      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm">Total Workers</p>

            <h2 className="text-4xl font-bold mt-2 text-slate-900">
              {workers.length}
            </h2>
          </div>

          <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center">
            <HardHat className="h-6 w-6 text-amber-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm">Search Results</p>

            <h2 className="text-4xl font-bold mt-2 text-green-600">
              {filteredWorkers.length}
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
            placeholder="Search by name, mobile or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {(isAdmin || isReceptionist) && (
            <button
              onClick={() => {
                setShowForm(true);
                setEditingId(null);
                setName("");
                setAddress("");
                setIdProofType("");
                setIdProofNumber("");
                setMobile("");
                setDepartment("");
                setDesignation("");
                setStartDate("");
                setExpiryDate("");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2"
            >
              <UserPlus size={18} />
              Add Worker
            </button>
          )}
        </div>

        {/* Form */}

        {(isAdmin || isReceptionist) && showForm && (
          <div className="bg-slate-50 rounded-xl p-5 mb-6 border">
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Worker" : "Add Worker"}
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-xl px-4 py-2"
              />

              <input
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border rounded-xl px-4 py-2"
              />

              <select
                value={idProofType}
                onChange={(e) => setIdProofType(e.target.value)}
                className="border rounded-xl px-4 py-2"
              >
                <option value="">Select ID Proof</option>
                <option value="Aadhaar">Aadhaar</option>
                <option value="PAN">PAN</option>
                <option value="Driving License">Driving License</option>
                <option value="Passport">Passport</option>
                <option value="Voter ID">Voter ID</option>
                <option value="Other">Other</option>
              </select>

              <input
                placeholder="ID Proof Number"
                value={idProofNumber}
                onChange={(e) => setIdProofNumber(e.target.value)}
                className="border rounded-xl px-4 py-2"
              />

              <input
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="border rounded-xl px-4 py-2"
              />

              <input
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="border rounded-xl px-4 py-2"
              />

              <input
                placeholder="Designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="border rounded-xl px-4 py-2"
              />

              <div>
                <label className="text-xs text-slate-500 mb-1 block">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border rounded-xl px-4 py-2 w-full"
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 mb-1 block">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="border rounded-xl px-4 py-2 w-full"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"
              >
                {editingId ? "Update Worker" : "Save Worker"}
              </button>

              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setName("");
                  setAddress("");
                  setIdProofType("");
                  setIdProofNumber("");
                  setMobile("");
                  setDepartment("");
                  setDesignation("");
                  setStartDate("");
                  setExpiryDate("");
                }}
                className="bg-slate-200 hover:bg-slate-300 px-5 py-2 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Loading */}

        {loading ? (
          <div className="py-12 text-center text-slate-500">
            Loading workers...
          </div>
        ) : filteredWorkers.length === 0 ? (
          <div className="py-16 text-center">
            <HardHat className="h-12 w-12 mx-auto text-slate-300 mb-3" />

            <p className="text-lg font-semibold text-slate-700">
              No Workers Found
            </p>

            <p className="text-slate-500 mt-2">
              Worker records will appear here.
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
                    Address
                  </th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    ID Type
                  </th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    ID Number
                  </th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Mobile
                  </th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Department
                  </th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Designation
                  </th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Start Date
                  </th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Expiry Date
                  </th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredWorkers.map((worker, index) => (
                  <tr
                    key={worker._id}
                    className="border-b hover:bg-blue-50 transition-colors"
                  >
                    <td className="p-3">{index + 1}</td>

                    <td className="p-3 font-medium text-slate-800">
                      {worker.name}
                    </td>
                    <td className="p-3">{worker.address}</td>
                    <td className="p-3">{worker.idProofType}</td>
                    <td className="p-3">{worker.idProofNumber}</td>
                    <td className="p-3">{worker.mobile}</td>

                    <td className="p-3">
                      <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">
                        <Building2 size={12} />
                        {worker.department}
                      </span>
                    </td>

                    <td className="p-3">{worker.designation}</td>

                    <td className="p-3 text-slate-500">
                      {worker.startDate
                        ? new Date(worker.startDate).toLocaleDateString(
                          "en-IN",
                          { day: "2-digit", month: "short", year: "numeric" }
                        )
                        : "—"}
                    </td>

                    <td className="p-3">
                      <span
                        className={`text-sm ${isExpired(worker.expiryDate)
                            ? "text-red-600 font-medium"
                            : "text-slate-500"
                          }`}
                      >
                        {worker.expiryDate
                          ? new Date(worker.expiryDate).toLocaleDateString(
                            "en-IN",
                            { day: "2-digit", month: "short", year: "numeric" }
                          )
                          : "—"}
                      </span>
                    </td>

                    <td className="p-3">
                      {isReports ? (
                        <span className="text-slate-400 text-sm">
                          Read Only
                        </span>
                      ) : (
                        <div className="flex gap-2">

                          <button
                            onClick={() => handleEdit(worker)}
                            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1 rounded-lg flex items-center gap-1"
                          >
                            <Pencil size={14} />
                            Edit
                          </button>

                          {isAdmin && (
                            <button
                              onClick={() => handleDelete(worker._id)}
                              className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-lg flex items-center gap-1"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          )}

                        </div>
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

export default Workers;