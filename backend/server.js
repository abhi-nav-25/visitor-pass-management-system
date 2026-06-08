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

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});
