import{ useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import heroImg from '../assets/hero.jpg'

const Home = () => {
    const navigate = useNavigate()
    const { videos, fetchAllVideos} = useContext(AppContext)

    useEffect(() => {
        fetchAllVideos()
    }, [])

    return (
        <main className='h-full text-white overflow-x-hidden'>
            <div className='flex md:flex-row flex-col justify-evenly gap-4 px-11 mb-5 lg:mt-9'>
                <img src={heroImg} alt="" className='w-[350px] h-[350px] bg-slate-500 rounded-lg object-cover' />
                <div>
                    <h1 className='font-semibold text-3xl'>Share Your Videos With Our Community</h1>
                    <p className='font-medium text-base'>Lovely videos with beautiful interface</p>
                    <button className='button mt-4' onClick={() => navigate('/share-video')}>Share Video</button>
                </div>
            </div>
            <h1 className='font-bold md:text-3xl text-xl w-full pt-6 md:ml-24 ml-11 '>Get The Latest Videos From Our Community</h1>
            <div className='md:flex md:flex-wrap m-auto gap-4 mt-7'>
                {videos.reverse().slice(0, 6).map(video => (
                    <div key={video._id} className='w-[350px] h-[400px] bg-slate-600 pt-2 rounded-xl gap-4 m-auto mb-5'>
                        <video src={video.video} alt="videos" className='h-[70%] w-[95%] m-auto rounded-lg bg-slate-100 ' />
                        <h1 className='mx-2 font-semibold text-2xl'>{video.title}</h1>
                        <p className='mx-2 font-medium text-base max-w-[25ch] truncate overflow-hidden'>{video.description}</p>
                        <p className='mx-2 font-semibold text-[#ff8a05] text-base'>Author: {video.name}</p>
                        <p className='mx-2 font-medium text-[#ff8a05] text-base'>Email: {video.email}</p>
                    </div>
                ))}
            </div>
            <button className='button flex m-auto items-center justify-center mt-5 mb-5' onClick={() => navigate('/get-videos')}>See more</button>
        </main>
    )
}

export default Home