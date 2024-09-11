import express from "express"
import studentserver from "./student_api.js"
import mentorserver from "./mentor_api.js"
import { connectclouddb } from "./DBFILES/db-connection.js"
let server = express()
server.use(express.json())
server.use("/student", studentserver)
server.use("/mentor", mentorserver)
let PORT = 7777
await connectclouddb();
server.listen(PORT, () => {
    console.log("server started")
})