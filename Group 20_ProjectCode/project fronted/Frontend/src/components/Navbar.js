import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const isUserSignedIn = !!localStorage.getItem('token')
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

  return (
    <nav className='flex justify-around p-3 border-b items-center bg-gradient-to-r from-violet-800 to-indigo-900'>
        <Link to='/'><h1 className='text-4xl text-white font-extrabold' ><span className='text-5xl bg-gradient-to-r from-yellow-300 to-red-500 bg-clip-text text-transparent'>Vid</span>Magic</h1></Link>
        <ul className='flex gap-6'>
            {isUserSignedIn ? (
                <>
                <Link to='/login'><li className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'><span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-black rounded-md group-hover:bg-opacity-0'>Login</span></li></Link>
                <li className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'><button onClick={handleSignOut}>Sign Out</button></li>
                </>
            ) : (
                <>
                <Link to='/login'><li className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'><span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-black hover:text-white rounded-md group-hover:bg-opacity-0'>Login</span></li></Link>
                <Link to='/signup'><li className=' text-white bg-violet-700 hover:bg-gradient-to-r from-yellow-300 to-red-400 hover:text-black font-bold px-5 py-2.5 rounded-lg'>Signup</li></Link>
                {/* text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2 */}
                </>
            )}
        </ul>
    </nav>
  )
}

export default Navbar