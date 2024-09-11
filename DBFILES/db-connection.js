import mongoose from "mongoose";
let dbname = "Day-35-task"
let cloudurl = `mongodb+srv://hemanthraja26:Y4oJcMM43rWs2kot@cluster0.ofmmc.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`
export let connectclouddb = async () => {
    try {
        await mongoose.connect(cloudurl)
        console.log("DB CONNECTED SUCCESSFULLY")
    } catch (err) {
        console.log("Something went wrong :", err)
        process.exit(1)
    }
}