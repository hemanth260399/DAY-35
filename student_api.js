import express, { json } from "express"
import { studentmodel } from "./DBFILES/student_model.js"
import { mentormodel } from "./DBFILES/mentor_model.js"
import { v4 } from "uuid"
import mongoose from "mongoose"
let studentserver = express.Router()
//get all student details
studentserver.get("/", async (req, res) => {
    let studata = await studentmodel.find({})
    res.json(studata)
})
//Post new student
studentserver.post("/", async (req, res) => {
    let studata = req.body
    let stuname = await studentmodel.findOne({ student_email: studata.student_email })
    if (stuname) {
        res.status(409).json({ msg: "student already exists" })
    }
    else {
        let studentdata = new studentmodel({
            ...studata,
            id: v4(),
            current_mentor: [],
            previous_mentor: []
        })
        try {
            await studentdata.save()
            console.log("Student data added successfully")
            res.json({ msg: "student data added" })
        } catch (err) {
            console.log("something went wrong", err)
            if (err instanceof mongoose.Error.ValidationError) {
                res.status(400).json({ msg: "Sorry some field are missing" })
            } else {
                res.status(500).json({ msg: "Internal server error" })
            }
        }
    }
})
//Here you can change the student mentor current mentor goes to previous mentor
studentserver.patch("/changementor/:id", async (req, res) => {
    let { id } = req.params
    let changementor = req.body
    let stuname = await studentmodel.findOne({ student_email: id })
    if (stuname) {
        let currentmentordata = await mentormodel.find({ mentor_email: changementor.mentor })
        let studentdata = await studentmodel.findOne({ student_email: id })
        let prementordata = await mentormodel.find({ mentor_email: studentdata.current_mentor })
        if (changementor.mentor[0] !== prementordata[0].mentor_email) {
            if (!currentmentordata.length == 0) {
                await studentmodel.updateOne({ student_email: studentdata.student_email }, { $set: { previous_mentor: studentdata.current_mentor } })
                await studentmodel.updateOne({ student_email: studentdata.student_email }, { $set: { current_mentor: changementor.mentor } })
                await mentormodel.updateOne({ mentor_email: changementor.mentor }, { $push: { student_list: id } })
                let preremovearray = prementordata[0].student_list.filter((data) => data !== id)
                await mentormodel.updateOne({ mentor_email: prementordata[0].mentor_email }, { $set: { student_list: preremovearray } })
                res.json({ msg: "Data updated" })
            } else {
                res.status(404).json("Mentor not found")
            }
        } else {
            res.status(404).json({ msg: "You entered mentor is already current mentor for student" })
        }
    } else {
        res.status(500).json({ msg: "student not found" })
    }
})
//get student previous mentor
studentserver.get("/studentprementor/:id", async (req, res) => {
    let { id } = req.params
    let studentid = await studentmodel.findOne({ student_email: id })
    if (studentid) {
        let prementor = await studentmodel.find({ student_email: id }, { previous_mentor: 1, _id: 0 })
        res.json(prementor)
    } else {
        res.status(404).json({ msg: "Mentor not found" })
    }
})
export default studentserver