import { useState } from "react";

function App() {
  const [visitorCount, setVisitorCount] = useState(0);

  return (
    <div>
      <h1>Visitor Pass Management System</h1>

      <h2>Total Visitors: {visitorCount}</h2>

      <button
        onClick={() => setVisitorCount(visitorCount + 1)}
      >
        Add Visitor
      </button>
    </div>
  );
}

export default App;