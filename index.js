const express = require("express");
const app = express();
const mongoose = require('mongoose');
const StudentModel = require("./models/StudentModel");
const multer = require('multer')
const upload = multer({ dest: './uploads/' })
const fs = require("fs");
const cors = require("cors");
const path = require('path');
require('dotenv').config()
const { request } = require("https");

app.use(express.json());
app.use(cors());


app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.get("/", (req, res) => {
    res.send("working...")
})

app.post("/upload-image", upload.single('image'), (request, response) => {
    console.log(request.file);
    let ext = request.file.mimetype.split("/")[1];
    if (ext == 'plain') {
        ext = "txt";
    }
    fs.rename(request.file.path, request.file.path + "." + ext, () => {
        console.log("done")
    });
})


app.get("/students", async (request, response) => {

    try {
        const students = await StudentModel.find();
        return response.json({
            status: true,
            students: students
        })
    } catch (error) {
        return response.json({
            status: false,
            msg: "Students not found"
        })
    }
})

app.get("/student/:id", async (request, response) => {
    const id = request.params.id;
    try {
        const student = await StudentModel.findById(id);
        return response.json({
            status: true,
            student: student
        })
    } catch (error) {
        return response.json({
            status: false,
            message: "Student not found"
        })
    }
})

app.post("/create-student", upload.single('image'), async (request, response) => {

    let ext = request.file.mimetype.split("/")[1];
    const imageName = request.file.path + "." + ext;
    fs.rename(request.file.path, imageName, () => {
        console.log("done")
    });


    try {
        request.body.image = imageName;
        await StudentModel.create(request.body);
        return response.json({
            status: true,
            msg: "Successfully created"
        })
    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return response.json({
                "status": false,
                errors: errors
            })
        }
    }
})
app.delete("/Student-delete/:id", async (request, response) => {
    try {
        await StudentModel.findByIdAndDelete(request.params.id)
        return response.json({
            status: true,
            msg: "deleted"
        })
    } catch (error) {
        return response.json({
            status: false,
            msg: "not deleted"
        })
    }
})
app.get("/search", async (request, response) => {

    const search = request.query.q;
    
    try {
        const students = await StudentModel.find({name:{$regex:search,$options:"i"}});
        return response.json({
            status: true,
            products: students
        });

    } catch (error) {
        return response.json({
            status: false,
            error: error.message
        })
    }

});




// javeriaakmal457
// LESGvRaVeKeCWLMu
mongoose.connect(process.env.DB).then(() => {

    app.listen(process.env.PORT, () => {
        console.log("db & server is running");
    })
})
//mongodb://localhost:27017

