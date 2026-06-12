function Navbar() {
  return (
    <div style={{height: "70px",background: "white",display: "flex",alignItems: "center",justifyContent: "space-between",padding: "0 20px",borderBottom: "1px solid #e2e8f0"}}>
      <h3>Visitor Pass Management System</h3>
      <div>
        <div style={{display: "flex",alignItems: "center",gap: "10px"}}>
          <span>👤</span>
          <span>Admin</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;