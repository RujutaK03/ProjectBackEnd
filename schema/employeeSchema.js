const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
},
    {
        collection: "Employees",
    }
);

module.exports = mongoose.model("Employees", employeeSchema);