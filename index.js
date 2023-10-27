const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");
const app = express();

// enable case sensitivity
mongoose.set("strictQuery", true);

// connect to database
mongoose.connect("mongodb+srv://rujutak:rujutak@cluster0.6nwg7rh.mongodb.net/Company");

// check connection
const db = mongoose.connection;
db.on("open", () => {
    console.log("Database connected");
});
db.on("error", (err) => {
    console.log("Error while connecting to database", err);
});
app.use(express.json());

// use cors to transfer data between environments
app.use(cors());
app.use("/employee", employeeRoutes);  // data will be visible on localhost:5050/employee

app.get("", (request, response) => {
    response.send("Hi from Server");
});

const PORT = 5050;
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});