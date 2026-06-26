import DashboardLayout from "../layouts/DashboardLayout";
import { useState, useEffect } from "react";
import API from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Users,
  UserPlus,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";


function Visitors() {
  const [visitors, setVisitors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [purpose, setPurpose] = useState("");
  const [address, setAddress] = useState("");
  const [idProofType, setIdProofType] = useState("");
  const [idProofNumber, setIdProofNumber] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [personPhoto, setPersonPhoto] = useState(null);
  const [idProofPhoto, setIdProofPhoto] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

  const { role } = useContext(AuthContext);
  const isAdmin = role === "admin";
  const isReceptionist = role === "receptionist";
  const isReports = role === "reports";

  const filteredVisitors = visitors.filter(
    (visitor) =>
      (visitor.name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (visitor.mobile || "")
        .includes(search) ||
      (visitor.idProofNumber || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const response = await API.get("/visitors");
      setVisitors(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("address", address);
        formData.append("mobile", mobile);
        formData.append("purpose", purpose);
        formData.append("idProofType", idProofType);
        formData.append("idProofNumber", idProofNumber);

        if (personPhoto) {
          formData.append("personPhoto", personPhoto);
        }

        if (idProofPhoto) {
          formData.append("idProofPhoto", idProofPhoto);
        }

        const response = await API.put(
          `/visitors/${editingId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setVisitors(
          visitors.map((visitor) =>
            visitor._id === editingId
              ? response.data
              : visitor
          )
        );

        setEditingId(null);
      } else {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("address", address);
        formData.append("mobile", mobile);
        formData.append("purpose", purpose);
        formData.append("idProofType", idProofType);
        formData.append("idProofNumber", idProofNumber);

        if (personPhoto) {
          formData.append(
            "personPhoto",
            personPhoto
          );
        }

        if (idProofPhoto) {
          formData.append(
            "idProofPhoto",
            idProofPhoto
          );
        }

        const response = await API.post(
          "/visitors",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        ); setVisitors(prev => [...prev, response.data]);
      }
      setName("");
      setMobile("");
      setPurpose("");
      setAddress("");
      setIdProofType("");
      setIdProofNumber("");
      setPersonPhoto(null);
      setIdProofPhoto(null);
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this visitor?"
    );
    if (!confirmDelete) return;
    await API.delete(`/visitors/${id}`);
    setVisitors(prev =>
      prev.filter(visitor => visitor._id !== id)
    );
  };

  const handleEdit = (visitor) => {
    setName(visitor.name);
    setMobile(visitor.mobile);
    setPurpose(visitor.purpose);
    setEditingId(visitor._id);
    setAddress(visitor.address || "");
    setIdProofType(visitor.idProofType || "");
    setIdProofNumber(visitor.idProofNumber || "");
    setShowForm(true);
  };

  return (
    <DashboardLayout
      title="Visitors"
      description="Manage visitor records and details"
    >
      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm">
              Total Visitors
            </p>

            <h2 className="text-4xl font-bold mt-2 text-slate-900">
              {visitors.length}
            </h2>
          </div>

          <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm">
              Search Results
            </p>

            <h2 className="text-4xl font-bold mt-2 text-green-600">
              {filteredVisitors.length}
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
            placeholder="Search by name, mobile or ID proof..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {(isAdmin || isReceptionist) && (
            <button
              onClick={() => {
                setShowForm(true);
                setEditingId(null);
                setPersonPhoto(null);
                setIdProofPhoto(null);
                setName("");
                setMobile("");
                setPurpose("");
                setAddress("");
                setIdProofType("");
                setIdProofNumber("");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2"
            >
              <UserPlus size={18} />
              Add Visitor
            </button>
          )}
        </div>

        {/* Form */}

        {(isAdmin || isReceptionist) && showForm && (
          <div className="bg-slate-50 rounded-xl p-5 mb-6 border">
            <h3 className="text-lg font-semibold mb-4">
              {editingId
                ? "Edit Visitor"
                : "Add Visitor"}
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

              <input
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
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
                placeholder="Purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="border rounded-xl px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">
                Person Photo
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPersonPhoto(e.target.files[0])
                }
                className="border rounded-xl px-4 py-2 w-full"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">
                ID Proof Photo
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setIdProofPhoto(e.target.files[0])
                }
                className="border rounded-xl px-4 py-2 w-full"
              />
            </div>
            {personPhoto && (
              <img
                src={URL.createObjectURL(personPhoto)}
                alt="person"
                className="h-20 w-20 rounded-lg object-cover"
              />
            )}

            {idProofPhoto && (
              <img
                src={URL.createObjectURL(idProofPhoto)}
                alt="idproof"
                className="h-20 w-20 rounded-lg object-cover"
              />
            )}

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"
              >
                {editingId
                  ? "Update Visitor"
                  : "Save Visitor"}
              </button>

              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setPersonPhoto(null);
                  setIdProofPhoto(null);
                  setName("");
                  setMobile("");
                  setPurpose("");
                  setAddress("");
                  setIdProofType("");
                  setIdProofNumber("");
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
            Loading visitors...
          </div>
        ) : filteredVisitors.length === 0 ? (

          <div className="py-16 text-center">

            <Users className="h-12 w-12 mx-auto text-slate-300 mb-3" />

            <p className="text-lg font-semibold text-slate-700">
              No Visitors Found
            </p>

            <p className="text-slate-500 mt-2">
              Visitor records will appear here.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">#</th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Name</th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Address</th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">ID Type</th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">ID Number</th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Mobile</th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Purpose</th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Photo</th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">ID Proof</th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredVisitors.map((visitor, index) => (
                  <tr
                    key={visitor._id}
                    className="border-b hover:bg-blue-50 transition-colors"
                  >
                    <td className="p-3">
                      {index + 1}
                    </td>

                    <td className="p-3">
                      {visitor.name}
                    </td>

                    <td className="p-3">{visitor.address}</td>
                    <td className="p-3">{visitor.idProofType}</td>
                    <td className="p-3">{visitor.idProofNumber}</td>
                    <td className="p-3">
                      {visitor.mobile}
                    </td>

                    <td className="p-3">
                      {visitor.purpose}
                    </td>

                    <td className="p-3">
                      {visitor.personPhoto ? (
                        <a
                          href={`${BACKEND_URL}/${visitor.personPhoto}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          View Photo
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>

                    <td className="p-3">
                      {visitor.idProofPhoto ? (
                        <a
                          href={`${BACKEND_URL}/${visitor.idProofPhoto}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          View ID
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>

                    <td>
                      {isReports ? (
                        <span className="text-slate-400 text-sm">
                          Read Only
                        </span>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(visitor)}
                            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1 rounded-lg flex items-center gap-1"
                          >
                            <Pencil size={14} />
                            Edit
                          </button>

                          {isAdmin && (
                            <button
                              onClick={() => handleDelete(visitor._id)}
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

export default Visitors;