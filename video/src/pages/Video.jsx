import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Video = () => {

const { fetchVideo, videoData, handleDelete } = useContext(AppContext)
const navigate = useNavigate()
const { videoId } = useParams()

useEffect(() => {
    fetchVideo(videoId)
}, [videoId])

  return (
    <main className='h-full text-white overflow-x-hidden'>
            <div className='flex md:flex-row flex-col justify-evenly gap-4 px-11 mb-5 lg:mt-20 '>
                {/* <div className='w-[350px] h-[350px]'> */}
                <video controls alt="video file" className='lg:w-[760px] w-[350px] object-cover bg-slate-500 rounded-lg'>
                    <source src={videoData.video}/>
                </video>
                {/* </div> */}
                <div>
                    <h1 className='font-semibold text-xl  text-[#ff8a05] mt-3 md:mt-0'>By {videoData.name}</h1>
                    <p className='font-medium text-base text-[#ff8a05]'>Email: {videoData.email}</p>
                    <p className='font-medium text-base mt-3'>Title: {videoData.title}</p>
                    <p className='font-medium text-base'>Description: {videoData.description}</p>
                    <div className='flex gap-5 mt-5 justify-center items-center'>
                      <button className='button' onClick={() => navigate(`/get-video/edit/${videoData._id}`)}>Edit</button>
                            <button className='button' onClick={() => handleDelete(videoData._id)}>Delete</button>
                    </div>
                </div>
            </div>
        </main>
  )
}

export default Video