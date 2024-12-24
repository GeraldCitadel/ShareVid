import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";


export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
    const [videos, setVideos] = useState([])
    const [videoData, setVideoData] = useState({
        name: '',
        email: '',
        title: '',
        description: '',
        video: ''
    })

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    async function fetchAllVideos() {
        try {
            const { data } = await axios.post(backendUrl + "/api/all-videos")
            if (data.success) {
                toast.success(data.message)
                setVideos(data.videos)

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    async function handleDelete(id) {
        try {
            const { data } = await axios.delete(backendUrl + `/api/delete-video/${id}`)
            console.log(data)
            if (data.success) {
                toast.success(data.message)
                fetchAllVideos()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    async function fetchVideo(videoId) {
        try {
            const { data } = await axios.get(backendUrl + `/api/video/${videoId}`)
            console.log(data)
            if (data.success) {
                toast.success(data.message)
                setVideoData(data.video)

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


   const  value = {
        backendUrl,
        videos,
        setVideos,
        fetchAllVideos,
        handleDelete,
        fetchVideo,
        videoData,
        setVideoData
    }

    return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
    )
}

export default AppContextProvider