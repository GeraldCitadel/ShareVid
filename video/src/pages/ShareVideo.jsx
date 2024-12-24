import axios from 'axios'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ShareVideo = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [video, setVideo] = useState(null)
    const [videoPreview, setVideoPreview] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [isPending, setIsPending] = useState(false)
    const navigate = useNavigate()

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const videoInput = useRef()

    function handlePickVideo() {
        videoInput.current.click()
    }


    async function uploadVideo(event) {
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
            const { data } = await axios.post(backendUrl + "/api/add-video", formData)
            console.log(data)
            if (data.success) {
                toast.success(data.message)
                navigate('/get-videos')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
        setIsPending(false)
    }


    function handleVideoInput(event) {
        const file = event.target.files[0]

        if (!file) {
            setVideoPreview(null)
            setVideo(null)
            return
        }

        setVideo(file)
        const previewUrl = URL.createObjectURL(file)
        setVideoPreview(previewUrl)

    }

  

    return (
        <main className='w-[90%] h-full max-w-[75rem] my-12 mx-auto text-white'>
            <form onSubmit={uploadVideo} className='max-w-[50rem]'>
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
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label htmlFor="email" className='block mb-2 text-base uppercase text-[#b3aea5] font-bold'>Your Email</label>
                <input
                    className='block w-[100%] py-2 px-4 border-2 border-[#454952] bg-[#1c2027] text-[#ddd6cb] focus:outline-[#f99f2a] focus:bg-[hsl(214,18%,15%)] mb-3'
                    type="email"
                    id='email'
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="title" className='block mb-2 text-base uppercase text-[#b3aea5] font-bold'>Video Title</label>
                <input
                    className='block w-[100%] py-2 px-4 border-2 border-[#454952] bg-[#1c2027] text-[#ddd6cb] focus:outline-[#f99f2a] focus:bg-[hsl(214,18%,15%)] mb-3'
                    type="text"
                    id='title'
                    name='title'
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label htmlFor="description" className='block mb-2 text-base uppercase text-[#b3aea5] font-bold'>Video Description</label>
                <textarea
                    className='block w-[100%] py-2 px-4 border-2 border-[#454952] bg-[#1c2027] text-[#ddd6cb] focus:outline-[#f99f2a] focus:bg-[#1f252d] mb-3'
                    id='description'
                    name='description'
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    required
                />

                <label htmlFor={'video'} className='block mb-2 text-base uppercase text-[#b3aea5] font-bold'>Your Video</label>
                <div className='flex items-start gap-5 mb-4'>
                    <div className='w-40  h-40 border-2 border-[#a4abb9] flex justify-center items-center text-center text-[#a4abb9] relative'>
                        {!video && <p className='m-0 p-4'>No Video selected yet!</p>}
                        {video &&
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
                    className='border-0 py-3 px-8 bg-[#ff9b05] border-none text-white rounded-sm cursor-pointer text-xl shadow-[0_2ppx_5px_rgba(0_0_0_0.3)] hover:[#f9b241] focus:[#f9b241] disabled:bg-[#ccc] disabled:text-[#979797] disabled:cursor-not-allowed hover:disabled:bg-[#ccc] hover:disabled:text-[#979797] hover:disabled:cursor-not-allowed focus:disabled:bg-[#ccc] focus:disabled:text-[#979797] focus:disabled:cursor-not-allowed' disabled={isPending}>{isPending ? 'Submitting...' : 'Share Video'}</button>
            </form>
        </main>
    )
}

export default ShareVideo