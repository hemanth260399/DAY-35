import express from "express"
import { mentormodel } from "./DBFILES/mentor_model.js"
import { studentmodel } from "./DBFILES/student_model.js"
import { v4 } from "uuid"
let mentorserver = express.Router()
//Get all mentor details 
mentorserver.get("/", async (req, res) => {
    let mentoralldata = await mentormodel.find({})
    res.json(mentoralldata)
})
//Post new mentor
mentorserver.post("/", async (req, res) => {
    let mendata = req.body
    let mentorname = await mentormodel.find({ mentor_email: mendata.mentor_email })
    console.log(mentorname)
    if (mentorname.length > 0) {
        res.status(409).json({ msg: "Mentor already exists" })
    }
    else {
        let mentordata = new mentormodel({
            ...mendata,
            id: v4(),
            student_list: []
        })
        try {
            await mentordata.save()
            console.log("Mentor data added successfully")
            res.json({ msg: "Mentor data added" })
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
//Here you can assign multiple students to mentor 
mentorserver.patch("/addstudent/:id", async (req, res) => {
    let { id } = req.params
    let studentdata = req.body
    let status = []
    let studentalldata = await studentmodel.find({})
    let mentordata = await mentormodel.findOne({ mentor_email: id })
    if (mentordata) {
        studentdata.student.forEach((data) => {
            studentalldata.filter(async (studata) => {
                if (studata.student_email === data) {
                    if (studata.current_mentor.length == 0) {
                        await studentmodel.updateOne({ student_email: studata.student_email }, { $set: { current_mentor: id } })
                        await mentormodel.updateOne({ mentor_email: id }, { $push: { student_list: data } })
                    }
                    else {
                        status.push({ "msg": `${data} already have mentor` })
                    }
                }
            })
        })
    }
    else {
        res.status(404).json({ msg: "Mentor not found" })
    }
    if (status.length == 0) {
        res.json({ msg: "students assigned " })
    } else {
        res.json(status)
    }
})
//Get mentor students list
mentorserver.get("/getstudentlist/:id", async (req, res) => {
    let { id } = req.params
    let mentorid = await mentormodel.findOne({ mentor_email: id })
    if (mentorid) {
        let stulist = await mentormodel.find({ mentor_email: id }, { student_list: 1, _id: 0 })
        res.json(stulist)
    } else {
        res.status(404).json({ msg: "Mentor not found" })
    }

})
export default mentorserver