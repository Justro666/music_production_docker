import React, { useState } from 'react';
import LoginBg from '../../assets/images/loginbg.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [careerRole, setCareerRole] = useState('');

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await axios.post('/auth/register', {
        c1: username,
        c2: email,
        c3: password,
        c5: careerRole,
      });

      console.log(response);

      localStorage.setItem('id', response.data.result.data.RegisterData._id);

      navigate('/login/joinArtists');
    } catch (error) {
      console.error('Authentication failed:', error.response.data.error);
    }
  };

  return (
    <div className="w-screen h-screen relative bg-black">
      <div>
        <img
          src={LoginBg}
          alt="Login Background"
          className="object-center object-cover"
        />
      </div>

      <div className="w-3/4 md:w-2/5 py-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl flex flex-col space-y-8 items-center">
        <p className="text-xl font-semibold mb-3 text-white">Create Account</p>
        <form
          className="w-full flex flex-col space-y-8 items-center"
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="w-3/4 md:w-3/5 py-2 px-3 text-white bg-white bg-opacity-10 rounded-xl active:outline-none focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-3/4 md:w-3/5 py-2 px-3 text-white bg-white bg-opacity-10 rounded-xl active:outline-none focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-3/4 md:w-3/5 py-2 px-3 text-white bg-white bg-opacity-10 rounded-xl active:outline-none focus:outline-none"
          />
          <input
            type="text"
            placeholder="Career Role Name"
            value={careerRole}
            required
            onChange={(e) => setCareerRole(e.target.value)}
            className="w-3/4 md:w-3/5 py-2 px-3 text-white bg-white bg-opacity-10 rounded-xl active:outline-none focus:outline-none"
          />

          <button
            type="submit"
            className="w-3/4 md:w-3/5 py-2 px-3 text-black text-sm bg-white rounded-xl active:outline-none focus:outline-none"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
