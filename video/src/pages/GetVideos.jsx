import{ useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const GetVideos = () => {
    const { videos, fetchAllVideos, handleDelete } = useContext(AppContext)

    const navigate = useNavigate()

    useEffect(() => {
        fetchAllVideos()
    }, [])

    return (
        <main className='mx-4 text-white'>
            <h1 className='font-bold text-3xl px-3 pt-6 text-center'>Our Videos</h1>
            <p className='mx-2 font-medium text-base text-center'>Lovely videos shared by our community</p>
            <div className='lg:flex md:flex gap-4 mt-7'>
                {videos.reverse().map((video, index) => (
                    <div key={index} className='w-[350px] h-[450px] bg-slate-600 pt-2 rounded-xl gap-4 m-auto mb-5 '>
                        <video src={video.video} controls alt="videos" className='h-[70%] w-[95%] m-auto rounded-lg bg-slate-100 ' />
                        <h1 className='mx-2 font-semibold text-2xl'>{video.title}</h1>
                        <p className='mx-2 font-medium text-base max-w-[25ch] truncate overflow-hidden'>{video.description}</p>
                        <p className='mx-2 font-semibold text-[#ff8a05] text-base'>Author: {video.name}</p>
                        <p className='mx-2 font-medium text-[#ff8a05] text-base'>Email: {video.email}</p>
                        <div className='flex justify-center items-center gap-4'>
                            {/* <button className='button-text' onClick={() => navigate(`/get-videos/${video._id}`)}>Edit</button> */}
                            <button className='button-text' onClick={() => navigate(`/get-video/${video._id}`)}>View</button>
                            <button className='button-text' onClick={() => handleDelete(video._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default GetVideos