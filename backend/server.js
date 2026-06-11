const express=require("express");
const app=express();

require("dotenv").config();
const connectDB=require("./config/db");
connectDB();

app.use(express.json()); 

const visitorRoutes=require("./routes/visitorRoutes");
app.use("/api/visitors", visitorRoutes);

const workerRoutes = require("./routes/workerRoutes");
app.use("/api/workers", workerRoutes);

const passRoutes = require("./routes/passRoutes");
app.use("/api/passes", passRoutes);

const entryExitRoutes = require("./routes/entryExitRoutes");
app.use("/api/logs", entryExitRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});
