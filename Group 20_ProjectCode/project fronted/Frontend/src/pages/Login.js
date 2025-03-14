import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Login() {
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = () => {
        axios
        .get('http://localhost:3001/register')
        .then((res) => {
            console.log(res.data)
        })
    }


    const handleLogin =  async (event) => {
        event.preventDefault();
        try {
            const response = await axios
            .post('http://localhost:3001/login', { username, password })
            const token = response.data.token
            alert('Login successful')
            setUsername('')
            setPassword('')
            fetchUsers();
            navigate('/account')
            window.location.reload();
            localStorage.setItem('token', token)
        } catch (error) {
            console.log('Login Error', error)
        }
    }


  return (
    <div className='w-full h-screen flex'>
         <div className='w-[100%] h-[100%] text-white flex justify-center items-center'>
            <form className='text-center border rounded-lg w-[600px] h-[400px] p-20 bg-gradient-to-r from-violet-300 to-violet-300'
            onSubmit={handleLogin}
            >
                 {/*Username Input */}
                 <label>Username</label>
                <br />
                <input className='w-[400px] h-[40px] rounded-xl bg-white p-2 text-black'
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
                <br />
                <br />
                 {/* Password Input */}
                 <label>Password</label>
                <br />
                <input className='w-[400px] h-[40px] rounded-xl bg-white p-2 text-black'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
                <br />
                <br />
                {/* Button */}
                <button className='w-[200px] h-[50px] border hover:bg-[#6d28d9]'
                type='submit'>Login</button>
            </form>
        </div>
        <div className='w-[50%] h-[100%] flex justify-center items-center bg-gradient-to-r from-violet-600 to-violet-600'>
            <h2 className='text-3xl text-white '>Login</h2>
        </div>
    </div>
  )
}

export default Login