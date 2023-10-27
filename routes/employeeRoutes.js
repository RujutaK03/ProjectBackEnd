const express = require("express");
const employeeSchema = require("../schema/employeeSchema");
const route = express.Router();

// Router inbuilt functions - get, post, delete

// insert data into the database
route.post("/create-employee", (request, response, next) => {
    employeeSchema.create(request.body, (err, data) => {
        if (err) {
            return next(err);
        } else {
            return response.json(data);
        }
    });
});

// retrieve data form the database
route.get("/", (request, response, next) => {
    employeeSchema.find((err, data) => {
        if (err) {
            return next(err);
        } else {
            return response.json(data);
        }
    });
});

route.delete("/delete-employee/:id", (request, response, next) => {
    employeeSchema.findByIdAndDelete(request.params.id, (err, data) => {
        if (err) {
            return next(err);
        } else {
            return response.json(data);
        }
    });
});

route.post("/login", (request, response, next) => {
    const [name, email, password] = request.body;
    employeeSchema.findOne({ email: email })
        .then((employee) => {
            if (employee) {
                if (employee.password === password) {
                    response.json("Login Successful");
                } else {
                    response.json("Password error");
                }
            } else {
                response.json("No records found");
            }
        })
})

route.route("/update-employee/:id").get((request, response, next) => {
    employeeSchema.findById(request.params.id, (err, data) => {
        if (err) {
            return next(err);
        } else {
            return response.json(data);
        }
    });
}).put((request, response, next) => {
    employeeSchema.findByIdAndUpdate(request.params.id, { $set: request.body }, (err, data) => {
        if (err) {
            return next(err);
        } else {
            return response.json(data);
        }
    })
})

module.exports = route;