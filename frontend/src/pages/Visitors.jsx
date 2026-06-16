import DashboardLayout from "../layouts/DashboardLayout";
import { useState, useEffect } from "react";
import API from "../services/api";


function Visitors() {
  const [visitors, setVisitors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [purpose, setPurpose] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await API.get("/visitors");
        setVisitors(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVisitors();
  }, []);

  const handleSubmit = async () => {
    try {
      if(editingId){
        const response = await API.put(
          `/visitors/${editingId}`,
          {
            name,
            mobile,
            purpose,
          }
        );
        setVisitors(
          visitors.map((visitor) =>
            visitor._id === editingId?response.data:visitor)
        );
        setEditingId(null);
      }else{
        const response=await API.post(
          "/visitors",
          {
            name,
            mobile,
            purpose,
          }
        );
        setVisitors([...visitors,response.data,]);
      }
      setName("");
      setMobile("");
      setPurpose("");
      setShowForm(false);
    } catch(error){
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    await API.delete(`/visitors/${id}`);
    setVisitors(  
      visitors.filter((visitor) => visitor._id !== id)
    );
  };

  const handleEdit = (visitor) => {
    setName(visitor.name);
    setMobile(visitor.mobile);
    setPurpose(visitor.purpose);
    setEditingId(visitor._id);
    setShowForm(true);
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
  <h1>Visitors</h1>
  {!showForm && (
    <button onClick={() => setShowForm(true)}>
      Add Visitor
    </button>
  )}
  {showForm && (
    <div
      style={{
        background: "white",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "10px",
      }}
    >
      <h3>{editingId?"Edit Visitor":"Add Visitor"}</h3>
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
        placeholder="Purpose"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
    />
      <br /><br />
      <button onClick={handleSubmit}>
        {editingId?"Update Visitor":"Save Visitor"}
      </button>
    </div>
  )}
  </div>
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
        <th>Purpose</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {visitors.map((visitor) => (
        <tr key={visitor._id}>
          <td>{visitor.name}</td>
          <td>{visitor.mobile}</td>
          <td>{visitor.purpose}</td>
          <td>
            <button onClick={() => handleEdit(visitor)}>
              Edit
            </button>
            <button onClick={() => handleDelete(visitor._id)}>
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

export default Visitors;