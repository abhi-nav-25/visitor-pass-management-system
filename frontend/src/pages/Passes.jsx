import DashboardLayout from "../layouts/DashboardLayout";
import { useState,useEffect } from "react";
import API from "../services/api";

function Passes() {
const [passes,setPasses]=useState([]);
const [visitors,setVisitors]=useState([]);
const [workers,setWorkers]=useState([]);

const [showForm,setShowForm]=useState(false);
const [selectedQR,setSelectedQR]=useState(null);
const [passType,setPassType]=useState("visitor");
const [visitor,setVisitor]=useState("");
const [worker,setWorker]=useState("");
const [expiryDate,setExpiryDate]=useState("");
const [search,setSearch]=useState("");
const [loading, setLoading] = useState(true);

useEffect(()=>{
fetchData();
},[]);

const fetchData=async()=>{
try{
const passRes=await API.get("/passes");
const visitorRes=await API.get("/visitors");
const workerRes=await API.get("/workers");

  setPasses(passRes.data);
  setVisitors(visitorRes.data);
  setWorkers(workerRes.data);
}
catch(error){
  console.log(error);
}
finally{
  setLoading(false);
}
};
if (loading) {
  return (
    <DashboardLayout>
      <div className="text-center py-12">
        Loading passes...
      </div>
    </DashboardLayout>
  );
}
const handleSubmit=async()=>{
try{
const payload={
passType,
expiryDate
};

  if(passType==="visitor"){
    payload.visitor=visitor;
  }
  else{
    payload.worker=worker;
  }

  await API.post(
    "/passes",
    payload
  );

  await fetchData();

  setVisitor("");
  setWorker("");
  setExpiryDate("");

  setShowForm(false);
}
catch(error){
  console.log(error);
}


};

const handleDelete=async(id)=>{
if(!window.confirm("Delete this pass?")){
  return;
}  
try{
await API.delete(`/passes/${id}`);

  setPasses(
    passes.filter(
      (pass)=>pass._id!==id
    )
  );
}
catch(error){
  console.log(error);
}

};

const handleRenew=async(id)=>{
  const newExpiryDate=prompt(
    "Enter new expiry date (YYYY-MM-DD)"
  );
  if(!newExpiryDate) return;
  try{
    await API.put(
      `/passes/${id}/renew`,
      { newExpiryDate }
    );
    await fetchData();
  }
  catch(error){
    console.log(error);
  }
};

const filteredPasses=passes.filter((pass)=>{
  const holder=pass.passType==="visitor"
    ?pass.visitor?.name
    :pass.worker?.name;

  return holder
    ?.toLowerCase()
    .includes(search.toLowerCase());
});

return (
<DashboardLayout
  title="Pass Management"
  description="Create, renew and manage visitor and worker passes"
  actions={
    <button
      onClick={()=>setShowForm(!showForm)}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-sm"
    >
      {showForm ? "Close Form" : "Add Pass"}
    </button>
  }
>
    {showForm && (
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6 sm:p-8 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Create New Pass
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Pass Type
            </label>

            <select
              value={passType}
              onChange={(e)=>setPassType(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="visitor">
                Visitor
              </option>

              <option value="worker">
                Worker
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Expiry Date
            </label>

            <input
              type="date"
              value={expiryDate}
              onChange={(e)=>setExpiryDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {passType==="visitor" ? (
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">
                Select Visitor
              </label>

              <select
                value={visitor}
                onChange={(e)=>setVisitor(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">
                  Choose Visitor
                </option>

                {visitors.map((v)=>(
                  <option
                    key={v._id}
                    value={v._id}
                  >
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">
                Select Worker
              </label>

              <select
                value={worker}
                onChange={(e)=>setWorker(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">
                  Choose Worker
                </option>

                {workers.map((w)=>(
                  <option
                    key={w._id}
                    value={w._id}
                  >
                    {w.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-8 pt-6 border-t border-slate-100">
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold px-8 py-2.5 rounded-xl shadow-sm text-sm transition-colors"
          >
            Save Pass
          </button>
          <button
            onClick={() => {
              setShowForm(false);
              setVisitor("");
              setWorker("");
              setExpiryDate("");
            }}
            className="bg-slate-200 hover:bg-slate-300 px-8 py-2.5 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </div>
    )}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm text-slate-500">Total Passes</p>
        <h3 className="text-4xl font-bold mt-2 text-slate-900">{passes.length}</h3>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm text-slate-500">Active Passes</p>
        <h3 className="text-4xl font-bold mt-2 text-green-600">
          {passes.filter(p=>p.status==="active").length}
        </h3>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm text-slate-500">Expired Passes</p>
        <h3 className="text-4xl font-bold mt-2 text-red-600">
          {passes.filter(p=>p.status==="expired").length}
        </h3>
      </div>
    </div>
    
    {/* Passes table */}
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          All Passes
        </h2>

        <div className="relative w-full sm:w-72">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>

          <input
            type="text"
            value={search}
            placeholder="Search by holder name..."
            onChange={(e)=>setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
      </div>

      {passes.length===0 ? (
        <div className="py-16 text-center">
          <p className="text-lg font-semibold text-slate-700">
            No Passes Found
          </p>
          <p className="text-slate-500 mt-2">
            Create your first pass to get started.
          </p>
        </div>
      ) : filteredPasses.length===0 ? (
        <p className="text-slate-500 text-sm text-center py-12">
          No matching passes found.
        </p>
      ) : (
        <div className="overflow-x-auto -mx-6">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-6 py-3 font-medium text-slate-500 text-xs uppercase tracking-wide">Pass ID</th>
                <th className="text-left px-6 py-3 font-medium text-slate-500 text-xs uppercase tracking-wide">Type</th>
                <th className="text-left px-6 py-3 font-medium text-slate-500 text-xs uppercase tracking-wide">Holder</th>
                <th className="text-left px-6 py-3 font-medium text-slate-500 text-xs uppercase tracking-wide">Issue Date</th>
                <th className="text-left px-6 py-3 font-medium text-slate-500 text-xs uppercase tracking-wide">Expiry</th>
                <th className="text-left px-6 py-3 font-medium text-slate-500 text-xs uppercase tracking-wide">Status</th>
                <th className="text-left px-6 py-3 font-medium text-slate-500 text-xs uppercase tracking-wide">QR</th>
                <th className="text-left px-6 py-3 font-medium text-slate-500 text-xs uppercase tracking-wide">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredPasses
                .map((pass)=>(
                  <tr
                    key={pass._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-slate-700 font-medium">{pass._id.slice(-6)}</td>
                    <td className="px-6 py-4 capitalize text-slate-700">
                      {pass.passType}
                    </td>

                    <td className="px-6 py-4 text-slate-700 font-medium">
                      {pass.passType==="visitor"
                        ?pass.visitor?.name
                        :pass.worker?.name}
                    </td>
                    
                    <td className="px-6 py-4 text-slate-600"> 
                      {new Date(pass.issueDate)
                      .toLocaleDateString("en-IN")}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {new Date(pass.expiryDate).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          pass.status === "active"
                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                            : pass.status === "expired"
                            ? "bg-red-50 text-red-700 ring-1 ring-red-200"
                            : "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200"
                        }`}
                      >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          pass.status === "active"
                            ? "bg-emerald-500"
                            : pass.status === "expired"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      />
                        {pass.status.charAt(0).toUpperCase() +
                          pass.status.slice(1)}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4">
                      <img
                        src={pass.qrCode}
                        alt="QR"
                        onClick={()=>setSelectedQR(pass.qrCode)}
                        className="h-16 w-16 rounded-lg border border-slate-200 shadow-sm cursor-pointer hover:scale-110 transition-transform"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={()=>handleRenew(pass._id)}
                          className="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                        >
                          Renew
                        </button>
                        <button
                          onClick={()=>handleDelete(pass._id)}
                          className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  {selectedQR && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Pass QR Code
        </h3>
        <img
          src={selectedQR}
          alt="QR"
          className="w-72 h-72 mx-auto"
        />
        <button
          onClick={()=>setSelectedQR(null)}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
        >
          Close
        </button>
        <a
          href={selectedQR}
          download="pass-qr.png"
          className="mt-2 block text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl"
        >
          Download QR
        </a>
      </div>
    </div>
  )}
</DashboardLayout>
);
}

export default Passes;