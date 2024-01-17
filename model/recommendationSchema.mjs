import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    recommendation:{
        type:String,
        required:true
    }
})

const Recommend = mongoose.model('RECOMMEND', recommendationSchema)
export default Recommend
