const express = require("express");
const app = express();
app.use(express.json()); 
const visitors = [];

app.get("/", (req, res) => {
    res.send("Visitor Pass Backend Running");
});

app.get("/api/visitors", (req, res) => {
    res.json(visitors);
});

app.post("/api/visitors", (req, res) => {
    visitors.push(req.body);
    res.json({
        message: "Visitor received",
        visitor: req.body
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
