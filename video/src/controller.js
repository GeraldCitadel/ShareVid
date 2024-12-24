import { v2 as cloudinary } from 'cloudinary'
import videoModel from './videoModel.js'




//API for adding a video
const addVideo = async (req, res) => {
    try {
        const { name, email, title, description } = req.body
        const videoFile = req.file

        // checking for all data to add video
        if (!name || !email || !title || !description) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // upload image to cloudinary
        const videoUpload = await cloudinary.uploader.upload(videoFile.path, { resource_type: 'video' })
        if (!videoUpload) {
            throw new Error("Failed to upload video to cloudinary")
        }
        const videoUrl = videoUpload.secure_url

        const videoData = {
            name,
            email,
            title,
            description,
            video: videoUrl,
        }

        const newVideo = new videoModel(videoData)
        await newVideo.save()

        res.json({ success: true, message: 'Video Added' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Failed to add video' || error.message })
    }
}



// API for getting all videos
const allVideo = async (req, res) => {
    try {

        const videos = await videoModel.find()
        res.json({ success: true, videos })

    } catch (error) {
        console.log(error)
        res.json({ succes: false, message: error.message })
    }
}


// API for getting individual video details
const video = async (req, res) => {
    try {
        const { videoId } = req.params

        const video = await videoModel.findById(videoId)

        res.json({ success: true, video })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// API for deleting  a video
const deleteVideo = async (req, res) => {
    try {
        const videoId = req.params.id

        await videoModel.findByIdAndDelete(videoId)

        res.json({ success: true, message: 'Video Deleted!' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



//API for updating a video
const updateVideo = async (req, res) => {
    try {
        const { videoId } = req.params

        const { name, email, title, description } = req.body
        const videoFile = req.file


        // upload video to cloudinary
        const videoUpload = await cloudinary.uploader.upload(videoFile.path, { resource_type: 'video' })
        if (!videoUpload) {
            throw new Error("Failed to upload video to cloudinary")
        }
        const videoUrl = videoUpload.secure_url

        const videoData = {
            name,
            email,
            title,
            description,
            video: videoUrl
        }
        await videoModel.findByIdAndUpdate(videoId, videoData)
 
        res.json({ success: true, message: 'Video Updated Successfully!' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Failed to update video' || error.message })
    }
}



export { addVideo, allVideo, video, updateVideo, deleteVideo }