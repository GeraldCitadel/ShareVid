import { useRef, useState } from 'react'


export default function VideoPicker({ label, name, ...props }) {

   const [pickedVideo, setPickedVideo] = useState()
   const videoInput = useRef()

   function handlePickVideo() {
      videoInput.current.click()
   }

   function handleVideoInput(event) {
      const file = event.target.files[0]

      if (!file) {
         setPickedVideo(null)
         return
      }

      const fileReader = new FileReader()

      fileReader.onload = () => {
         setPickedVideo(fileReader.result)
      }

      fileReader.readAsDataURL(file)

   }


   return (
      <div>
         <label htmlFor={name}>{label}</label>
         <div className='flex items-start gap-5 mb-4'>
            <div className='w-40  h-40 border-2 border-[#a4abb9] flex justify-center items-center text-center text-[#a4abb9] relative'>
               {!pickedVideo && <p className='m-0 p-4'>No Video selected yet!</p>}
               {pickedVideo &&
                  <video className='object-cover w-40 h-40' src={pickedVideo}  />
               }
            </div>
            <input
               className='hidden'
               type='file'
               id={name}
               name={name}
            //    accept='video/mp4, video/mkv'
               ref={videoInput}
               onChange={handleVideoInput}
               {...props}
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
      </div>
   )
}