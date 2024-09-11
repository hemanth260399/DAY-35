import { model, Schema } from "mongoose";
let mentorschema = new Schema({
    id: {
        type: "string",
        required: true
    },
    mentor_name: {
        type: "string",
        required: true
    },
    mentor_email: {
        type: "string",
        required: true
    },
    mentor_number: {
        type: "string",
        required: true
    },
    language: {
        type: Array,
        required: true
    },
    courses: {
        type: Array,
        required: true
    },
    student_list: {
        type: Array,
        required: true
    }
})
export let mentormodel = new model("Post", mentorschema, "mentordata")