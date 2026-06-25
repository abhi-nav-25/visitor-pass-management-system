import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import {
    ScanLine,
    CheckCircle2,
    XCircle,
    RefreshCw,
    User,
    IdCard,
    ShieldCheck,
    CalendarClock,
} from "lucide-react";

function QRScanner() {
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [gates, setGates] = useState([]);
    const [selectedGate, setSelectedGate] = useState("");

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: 250,
            },
            false
        );

        scanner.render(
            async (decodedText) => {
                try {
                    const response = await API.post("/passes/verify-qr", {
                        qrData: decodedText,
                    });
                    setError("");
                    setResult(response.data.pass);
                    scanner.clear();
                } catch (err) {
                    setResult(null);
                    setError(
                        err.response?.data?.message || "QR verification failed"
                    );
                    scanner.clear();
                }
            },
            () => { }
        );

        return () => {
            scanner.clear().catch(() => { });
        };
    }, []);

    useEffect(() => {
        const fetchGates = async () => {
            try {
                const res = await API.get("/gates");
                setGates(res.data);

                if (res.data.length > 0) {
                    setSelectedGate(res.data[0]._id);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchGates();
    }, []);

    const restartScanner = () => {
        window.location.reload();
    };



    const personName =
        result?.passType === "visitor"
            ? result?.visitor?.name
            : result?.worker?.name;


    const handleEntry = async () => {
        try {
            await API.post(`/logs/entry/${result._id}`, {
                gate: selectedGate
            }); alert("Entry recorded");
        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    const handleExit = async () => {
        try {
            await API.post(`/logs/exit/${result._id}`, {
                gate: selectedGate
            });
            alert("Exit recorded");
        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    return (
        <DashboardLayout
            title="QR Scanner"
            description="Scan visitor and worker passes"
        >
            <div className="max-w-2xl mx-auto space-y-6">

                {/* Scanning state */}
                {!result && !error && (
                    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                <ScanLine className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-800">
                                    Camera Scanner
                                </h3>
                                <p className="text-xs text-slate-400">
                                    Point the camera at a pass QR code
                                </p>
                            </div>
                            {/* Pulse indicator */}
                            <div className="ml-auto flex items-center gap-2">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
                                </span>
                                <span className="text-xs text-slate-400">Live</span>
                            </div>
                        </div>

                        {/* Scanner viewport */}
                        <div
                            className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50"
                            id="reader"
                        />
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
                        {/* Red top bar */}
                        <div className="bg-red-500 px-6 py-4 flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                                <XCircle className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-white">
                                    Entry Denied
                                </h2>
                                <p className="text-xs text-red-100">
                                    Pass verification failed
                                </p>
                            </div>
                        </div>

                        {/* Error body */}
                        <div className="p-6">
                            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 mb-5">
                                {error}
                            </div>

                            <button
                                onClick={restartScanner}
                                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-xl transition"
                            >
                                <RefreshCw size={16} />
                                Scan Again
                            </button>
                        </div>
                    </div>
                )}

                {/* Success state */}
                {result && (
                    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
                        {/* Green top bar */}
                        <div className="bg-emerald-500 px-6 py-4 flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                                <CheckCircle2 className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-white">
                                    Welcome, {personName}!
                                </h2>
                                <p className="text-xs text-emerald-100">
                                    Pass verified successfully
                                </p>
                            </div>
                        </div>

                        {/* Pass details */}
                        <div className="p-6 space-y-3">
                            <DetailRow
                                icon={<User size={15} className="text-slate-400" />}
                                label="Name"
                                value={personName}
                            />
                            <DetailRow
                                icon={<IdCard size={15} className="text-slate-400" />}
                                label="Pass Type"
                                value={
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 ring-1 ring-blue-200">
                                        {result.passType
                                            ? result.passType.charAt(0).toUpperCase() +
                                            result.passType.slice(1)
                                            : "—"}
                                    </span>
                                }
                            />
                            <DetailRow
                                icon={<ShieldCheck size={15} className="text-slate-400" />}
                                label="Status"
                                value={
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ${result.status === "active"
                                            ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                                            : "bg-slate-100 text-slate-500 ring-slate-200"
                                            }`}
                                    >
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${result.status === "active"
                                                ? "bg-emerald-500"
                                                : "bg-slate-400"
                                                }`}
                                        />
                                        {result.status
                                            ? result.status.charAt(0).toUpperCase() +
                                            result.status.slice(1)
                                            : "—"}
                                    </span>
                                }
                            />
                            <DetailRow
                                icon={<CalendarClock size={15} className="text-slate-400" />}
                                label="Expiry Date"
                                value={
                                    result.expiryDate
                                        ? new Date(result.expiryDate).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })
                                        : "—"
                                }
                            />

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Gate
                                </label>

                                <select
                                    value={selectedGate}
                                    onChange={(e) => setSelectedGate(e.target.value)}
                                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {gates.map((gate) => (
                                        <option key={gate._id} value={gate._id}>
                                            {gate.gateName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-4">
                                <button
                                    onClick={handleEntry}
                                    className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl"
                                >
                                    Mark Entry
                                </button>

                                <button
                                    onClick={handleExit}
                                    className="bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-xl"
                                >
                                    Mark Exit
                                </button>
                            </div>

                            <div className="pt-3">
                                <button
                                    onClick={restartScanner}
                                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-xl transition"
                                >
                                    <RefreshCw size={16} />
                                    Scan Another Pass
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

function DetailRow({ icon, label, value }) {
    return (
        <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
            <div className="flex items-center gap-2 text-sm text-slate-500">
                {icon}
                {label}
            </div>
            <div className="text-sm font-medium text-slate-800">{value}</div>
        </div>
    );
}

export default QRScanner;