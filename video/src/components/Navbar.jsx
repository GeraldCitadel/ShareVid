import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

const Navbar = () => {
    return (
        <div className='flex justify-around px-10 pt-4 mb-11 text-white'>
            <div className='flex gap-2'>
                <img className='w-9 h-9' src={logo} alt="logo" />
                <h1 className='font-semibold text-2xl'><Link to='/'>ShareVid</Link></h1>
            </div>
            <ul className='flex  gap-3'>
                <NavLink to='/' className={({ isActive }) => isActive ? "button-text" : undefined} end>
                    <li className='font-medium text-base'>Home</li>
                </NavLink>
                <NavLink to='/get-videos' className={({ isActive }) => isActive ? "button-text" : undefined}>
                    <li className='font-medium text-base'>Videos</li>
                </NavLink>
            </ul>
        </div>
    )
}

export default Navbar