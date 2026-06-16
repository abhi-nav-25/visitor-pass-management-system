import DashboardLayout from "../layouts/DashboardLayout";
import { useState, useEffect } from "react";
import API from "../services/api";

function Workers() {
  const [workers, setWorkers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await API.get("/workers");
        setWorkers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWorkers();
  }, []);

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
            startDate,
            expiryDate,
          }
        );
        setWorkers(workers.map((worker) =>worker._id === editingId?response.data:worker));
        setEditingId(null);
      } else {
        const response = await API.post(
          "/workers",
          {
            name,
            mobile,
            department,
            designation,
            startDate,
            expiryDate,
          }
        );
        setWorkers([
          ...workers,
          response.data,
        ]);
      }
      setName("");
      setMobile("");
      setDepartment("");
      setDesignation("");
      setStartDate("");
      setExpiryDate("");
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (worker) => {
    setName(worker.name);
    setMobile(worker.mobile);
    setDepartment(worker.department);
    setDesignation(worker.designation);
    setStartDate(
      worker.startDate.split("T")[0]
    );
    setExpiryDate(
      worker.expiryDate.split("T")[0]
    );
    setEditingId(worker._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/workers/${id}`);
      setWorkers(
        workers.filter(
          (worker) => worker._id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Workers</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)}>
            Add Worker
          </button>
        )}
      </div>
      {showForm && (
        <div style={{background: "white",padding: "20px",marginTop: "20px",borderRadius: "10px",}}>
          <h3>
            {editingId ? "Edit Worker" : "Add Worker"}
          </h3>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br /><br />
          <input
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <br /><br />
          <input
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <br /><br />
          <input
            placeholder="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
          <br /><br />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <br /><br />
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
          <br /><br />
          <button onClick={handleSubmit}>
            {editingId?"Update Worker":"Save Worker"}
          </button>
        </div>
      )}
      <table
        style={{
          width: "100%",
          background: "white",
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Start Date</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {workers.map((worker) => (
            <tr key={worker._id}>
              <td>{worker.name}</td>
              <td>{worker.mobile}</td>
              <td>{worker.department}</td>
              <td>{worker.designation}</td>
              <td>{worker.startDate}</td>
              <td>{worker.expiryDate}</td>
              <td>
                <button onClick={() => handleEdit(worker)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(worker._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default Workers;