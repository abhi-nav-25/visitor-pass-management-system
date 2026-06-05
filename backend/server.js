const express = require("express");
const app = express();
app.use(express.json()); 

const visitorRoutes = require("./routes/visitorRoutes");
app.use("/api/visitors", visitorRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
