import mongoose from "mongoose";  

const videoSchema = new mongoose.Schema({
   name: {type: String, required: true},
   email: {type: String, required: true},
   title: {type: String, required: true},
   description: {type: String, required: true},
   video: {type: String, required: true},
  
}, 
{
    timestamps: true
})


const videoModel = mongoose.models.video || mongoose.model('video', videoSchema)


export default videoModel;