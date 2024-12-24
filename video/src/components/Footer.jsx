import React from 'react'

const Footer = () => {
const d = new Date()
const year = d.getFullYear()


  return (
    <div className='text-center m-auto mb-2 text-white'>
        <p><hr className='w-[90dvw] text-stone-900 m-auto mt-5' />Copyright {year} @ ShareVid - All rights reserved.</p>
    </div>
  )
}

export default Footer