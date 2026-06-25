const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.disable("x-powered-by");
const path = require("path");

require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://visitor-pass-management-system-pi.vercel.app",
    ],
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json());

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests. Please try again later.",
});

app.use(limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Please try again later.",
});

const logger = require("./middleware/logger");
app.use(logger);

const visitorRoutes=require("./routes/visitorRoutes");
app.use("/api/visitors", visitorRoutes);

const workerRoutes = require("./routes/workerRoutes");
app.use("/api/workers", workerRoutes);

const passRoutes = require("./routes/passRoutes");
app.use("/api/passes", passRoutes);

const entryExitRoutes = require("./routes/entryExitRoutes");
app.use("/api/logs", entryExitRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authLimiter, authRoutes);

const gateRoutes = require("./routes/gateRoutes");
app.use("/api/gates", gateRoutes);

const areaRoutes = require("./routes/areaRoutes");
app.use("/api/areas", areaRoutes);

const buildingRoutes = require("./routes/buildingRoutes");
app.use("/api/buildings", buildingRoutes);

const departmentRoutes = require("./routes/departmentRoutes");
app.use("/api/departments", departmentRoutes);

const uploadRoutes = require("./routes/uploadRoutes");
app.use("/api/upload", uploadRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});
