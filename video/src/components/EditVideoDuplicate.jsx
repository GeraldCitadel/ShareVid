import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditVideo = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [video, setVideo] = useState(null)
    const [videoPreview, setVideoPreview] = useState(null)
    const [videoData, setVideoData] = useState([])
    const [title, setTitle] = useState(videoData.title ? videoData.title : "")
    const [description, setDescription] = useState(videoData.description ? videoData.description : '')

    const videoInput = useRef()
    const [isPending, setIsPending] = useState(false)
    const { videoId } = useParams()
    // console.log(videoId)

    const backendUrl = import.meta.env.VITE_BACKEND_URL


    function handlePickVideo() {
        videoInput.current.click()
    }

    function handleVideoInput(event) {
        const file = event.target.files[0]

        if (!file) {
            setVideoPreview(null)
            setVideo((prev) => ({ ...prev }))
            return
        }

        setVideo((prev) => ({ ...prev, video: file }))
        const previewUrl = URL.createObjectURL(file)
        setVideoPreview(previewUrl)
    }


    async function updateVideo(event) {
        event.preventDefault()
        setIsPending(true)

        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('email', email)
            formData.append('title', title)
            formData.append('description', description)
            formData.append('video', video)

            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`)
            })

            const { data } = await axios.patch(backendUrl + `/api/update-video/${videoId}`, formData)
            console.log(data)
            console.log(videoId)
            if (data.success) {
                toast.success(data.message)
                // setVideoData({ ...videoData, formData })
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
        setIsPending(false)
    }
    useEffect(() => {
        fetchVideo()
    }, [])

    async function fetchVideo() {
        try {
            const { data } = await axios.get(backendUrl + `/api/video/${videoId}`)
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

    return (

        <main className='w-[90%] h-full max-w-[75rem] my-12 mx-auto text-white'>
            <form onSubmit={updateVideo} className='max-w-[50rem]'>
                <div className='gap-12 mt-12 mr-auto mb-2 ml-auto max-w-[75rem] text-[#ddd6cb] font-semibold'>
                    <h1 className='text-2xl lg:text-3xl'>Share your <span className='highlight'>favourite video</span></h1>
                    <p className='text-xl lg:text-2xl mb-5'>Or any other video you feel needs sharing</p>
                </div>
                <label htmlFor="name" className='block mb-2 text-base uppercase text-[#b3aea5] font-bold'>Your Name</label>
                <input
                    className='block w-[100%] py-2 px-4 border-2 border-[#454952] bg-[#1c2027] text-[#ddd6cb] focus:outline-[#f99f2a] focus:bg-[hsl(214,18%,15%)] mb-3'
                    type="text"
                    id='name'
                    name='name'
                    // onChange={(e) => setName((prev) => ({ ...prev, name: e.target.value }))}
                    onChange={handleInputChange}
                    value={name}
                    defaultValue={videoData.name}
                    required
                />
                <label htmlFor="email" className='block mb-2 text-base uppercase text-[#b3aea5] font-bold'>Your Email</label>
                <input
                    className='block w-[100%] py-2 px-4 border-2 border-[#454952] bg-[#1c2027] text-[#ddd6cb] focus:outline-[#f99f2a] focus:bg-[hsl(214,18%,15%)] mb-3'
                    type="email"
                    id='email'
                    name='email'
                    onChange={handleInputChange}
                    // onChange={(e) => setEmail((prev) => ({ ...prev, email: e.target.value }))}
                    defaultValue={videoData.email}
                    value={email}
                    required
                />
                <label htmlFor="title" className='block mb-2 text-base uppercase text-[#b3aea5] font-bold'>Video Title</label>
                <input
                    className='block w-[100%] py-2 px-4 border-2 border-[#454952] bg-[#1c2027] text-[#ddd6cb] focus:outline-[#f99f2a] focus:bg-[hsl(214,18%,15%)] mb-3'
                    type="text"
                    id='title'
                    name='title'
                    onChange={(e) => setTitle((prev) => ({ ...prev, title: e.target.value }))}
                    defaultValue={videoData.title}
                    required
                />
                <label htmlFor="description" className='block mb-2 text-base uppercase text-[#b3aea5] font-bold'>Video Description</label>
                <textarea
                    className='block w-[100%] py-2 px-4 border-2 border-[#454952] bg-[#1c2027] text-[#ddd6cb] focus:outline-[#f99f2a] focus:bg-[#1f252d] mb-3'
                    id='description'
                    name='description'
                    onChange={(e) => setDescription((prev) => ({ ...prev, description: e.target.value }))}
                    defaultValue={videoData.description}
                    rows={5}
                    required
                />
                <label htmlFor={'video'} className='block mb-2 text-base uppercase text-[#b3aea5] font-bold'>Your Video</label>
                <div className='flex items-start gap-5 mb-4'>
                    <div className='w-40  h-40 border-2 border-[#a4abb9] flex justify-center items-center text-center text-[#a4abb9] relative'>
                        {!videoPreview && <p className='m-0 p-4'>No Video selected yet!</p>}
                        {videoPreview &&
                            <video className='object-cover w-[100%] h-[100%]' src={videoData.video || videoPreview} />
                        }
                    </div>
                    <input
                        className='hidden'
                        type='file'
                        id="video"
                        name="video"
                        accept='video/*'
                        ref={videoInput}
                        onChange={handleVideoInput}
                        required
                    />
                    <button
                        className='border-0 py-2 px-5 bg-[#a4abb9] rounded-sm cursor-pointer hover:bg-[#b3b9c6] focus:bg-[#b3b9c6]'
                        type='button'
                        onClick={handlePickVideo}
                    >
                        Pick a Video
                    </button>
                </div>

                <button
                    type='submit'
                    className='border-0 py-3 px-8 bg-[#ff9b05] border-none text-white rounded-sm cursor-pointer text-xl shadow-[0_2ppx_5px_rgba(0_0_0_0.3)] hover:[#f9b241] focus:[#f9b241] disabled:bg-[#ccc] disabled:text-[#979797] disabled:cursor-not-allowed hover:disabled:bg-[#ccc] hover:disabled:text-[#979797] hover:disabled:cursor-not-allowed focus:disabled:bg-[#ccc] focus:disabled:text-[#979797] focus:disabled:cursor-not-allowed' disabled={isPending}>{isPending ? 'Submitting...' : 'Update Video'}</button>
            </form>
        </main>
    )
}

export default EditVideo