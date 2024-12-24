import axios from 'axios'
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'

const EditVideo = () => {

    const [videoPreview, setVideoPreview] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const videoInput = useRef()
    const { videoId } = useParams()
    const navigate = useNavigate()

    const { backendUrl, videoData, setVideoData, fetchVideo } = useContext(AppContext)


    function handlePickVideo() {
        videoInput.current.click()
    }

    function handleVideoInput(event) {
        const file = event.target.files[0]
        if (!file) {
            setVideoPreview(null)
            return
        }
        setVideoData({ ...videoData, video: file })
        const previewUrl = URL.createObjectURL(file)
        setVideoPreview(previewUrl)
    }

    async function updateVideo(event) {
        event.preventDefault()
        setIsPending(true)

        try {
            document.getElementById('video').focus()
            const formData = new FormData()
            formData.append('name', videoData.name)
            formData.append('email', videoData.email)
            formData.append('title', videoData.title)
            formData.append('description', videoData.description)
            formData.append('video', videoData.video)

            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`)
            })

            const { data } = await axios.patch(backendUrl + `/api/update-video/${videoId}`, formData)
            if (data.success) {
                toast.success(data.message)
                navigate('/get-video')
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
        fetchVideo(videoId)
    }, [videoId])

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
                    onChange={(e) => setVideoData({ ...videoData, name: e.target.value })}
                    defaultValue={videoData.name}
                    required
                />
                <label htmlFor="email" className='block mb-2 text-base uppercase text-[#b3aea5] font-bold'>Your Email</label>
                <input
                    className='block w-[100%] py-2 px-4 border-2 border-[#454952] bg-[#1c2027] text-[#ddd6cb] focus:outline-[#f99f2a] focus:bg-[hsl(214,18%,15%)] mb-3'
                    type="email"
                    id='email'
                    name='email'
                    onChange={(e) => setVideoData({ ...videoData, email: e.target.value })}
                    defaultValue={videoData.email}
                    required
                />
                <label htmlFor="title" className='block mb-2 text-base uppercase text-[#b3aea5] font-bold'>Video Title</label>
                <input
                    className='block w-[100%] py-2 px-4 border-2 border-[#454952] bg-[#1c2027] text-[#ddd6cb] focus:outline-[#f99f2a] focus:bg-[hsl(214,18%,15%)] mb-3'
                    type="text"
                    id='title'
                    name='title'
                    onChange={(e) => setVideoData({ ...videoData, title: e.target.value })}
                    defaultValue={videoData.title}
                    required
                />
                <label htmlFor="description" className='block mb-2 text-base uppercase text-[#b3aea5] font-bold'>Video Description</label>
                <textarea
                    className='block w-[100%] py-2 px-4 border-2 border-[#454952] bg-[#1c2027] text-[#ddd6cb] focus:outline-[#f99f2a] focus:bg-[#1f252d] mb-3'
                    id='description'
                    name='description'
                    onChange={(e) => setVideoData({ ...videoData, description: e.target.value })}
                    defaultValue={videoData.description}
                    rows={5}
                    required
                />
                <label htmlFor={'video'} className='block mb-2 text-base uppercase text-[#b3aea5] font-bold'>Your Video</label>
                <div className='flex items-start gap-5 mb-4'>
                    <div className='w-40  h-40 border-2 border-[#a4abb9] flex justify-center items-center text-center text-[#a4abb9] relative'>
                        {!videoPreview && <p className='ml-40  p-4'>No Video selected yet!</p>}
                        {
                            <video className='object-cover w-[100%] h-[100%]' src={videoPreview} />
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
                    className='border-0 py-3 px-8 bg-[#ff9b05] border-none text-white rounded-sm cursor-pointer text-xl shadow-[0_2ppx_5px_rgba(0_0_0_0.3)] hover:[#f9b241] focus:[#f9b241] disabled:bg-[#ccc] disabled:text-[#979797] disabled:cursor-not-allowed hover:disabled:bg-[#ccc] hover:disabled:text-[#979797] hover:disabled:cursor-not-allowed focus:disabled:bg-[#ccc] focus:disabled:text-[#979797] focus:disabled:cursor-not-allowed' disabled={isPending}>{isPending ? 'Updating...' : 'Update Video'}</button>
            </form>
        </main>
    )
}

export default EditVideo