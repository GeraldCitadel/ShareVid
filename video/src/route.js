import express from 'express'
import upload from './multer.js'
import { addVideo, allVideo, deleteVideo, updateVideo, video } from './controller.js'


const router = express.Router()

router.post('/add-video', upload.single('video'), addVideo)
router.post('/all-videos', allVideo)
router.delete('/delete-video/:id', deleteVideo)
router.get(`/video/:videoId`, video)
router.patch('/update-video/:videoId', upload.single('video'),  updateVideo) 


export default router