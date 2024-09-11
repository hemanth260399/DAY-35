import { model, Schema } from "mongoose";
let studentschema = new Schema({
    id: {
        type: "string",
        required: true
    },
    student_name: {
        type: "string",
        required: true
    },
    dob: {
        type: "string",
        required: true
    },
    student_email: {
        type: "string",
        required: true
    },
    student_number: {
        type: "string",
        required: true
    },
    current_mentor: {
        type: Array,
        required: true
    },
    previous_mentor: {
        type: Array,
        required: true
    },
})
export let studentmodel = new model("post", studentschema, "studentdata")