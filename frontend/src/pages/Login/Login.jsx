import React, { useState } from 'react';
import LoginBg from '../../assets/images/loginbg.png';
import LoginGoogle from '../../assets/images/logingoogle.png';
import LoginApple from '../../assets/images/loginapple.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/loginSlice';
import SideAlert from '../../components/SideAlert';

const Login = () => {
  const loggedIn = useSelector((state) => state.login);
  const [sideAlert, setSideAlert] = useState(false);
  const [errorText, setErrorText] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // console.log(loggedIn);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const { data } = await axios.post('/auth/login', {
        c2: email,
        c3: password,
      });

      console.log(data);

      // console.log(data.result.LoginData.error);

      if (data.error) {
        setErrorText(data.result.LoginData.error);
        setSideAlert(true);
        return;
      }

      localStorage.setItem('name', data.result.data.LoginData.c1);
      localStorage.setItem('token', data.result.data.LoginData.token);

      dispatch(login(true));
      navigate('/');

      if (!data.err) {
        if (
          data.result.data.LoginData.cat === 0 ||
          data.result.data.LoginData.cat === 1
        ) {
          localStorage.setItem('name', data.result.data.LoginData.c1);
          localStorage.setItem('token', data.result.data.LoginData.token);

          dispatch(login(true));
          navigate('/');
        } else if (data.result.data.LoginData.cat === 2) {
          navigate('/lobby');
        } else {
          localStorage.setItem('id', data.result.data.LoginData._id);
          navigate('/login/joinArtists');
        }
      }
    } catch (error) {
      // Handle error response
      console.error('Authentication failed:', error.response.data.error);
    }
  };
  return (
    <div className="w-screen h-screen relative bg-black">
      <div className="w-full h-1/2">
        <img
          src={LoginBg}
          alt="Login Background"
          className="object-center object-cover w-full h-full"
        />
      </div>

      <div
        className={`fixed top-4 transition-all duration-700 ${
          sideAlert ? 'right-4' : '-right-full'
        }`}
      >
        <SideAlert name={errorText} />
      </div>

      <div className="w-3/4 md:w-2/5 py-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl flex flex-col space-y-8 items-center">
        <p className="text-xl font-semibold mb-3 text-white">Login</p>
        <form
          className="w-full flex flex-col space-y-8 items-center"
          onSubmit={handleFormSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-3/4 md:w-3/5 py-2 px-3 text-white bg-white bg-opacity-10 rounded-xl active:outline-none focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-3/4 md:w-3/5 py-2 px-3 text-white bg-white bg-opacity-10 rounded-xl active:outline-none focus:outline-none"
          />

          <button className="w-3/4 md:w-3/5 py-2 px-3 text-black text-sm bg-white rounded-xl active:outline-none focus:outline-none">
            Next
          </button>
        </form>

        <p className="text-2xl text-white">or</p>

        <div className="flex items-center space-x-3">
          <button>
            <img src={LoginGoogle} alt="Google button" className="w-8" />
          </button>
          <button>
            <img src={LoginApple} alt="Apple button" className="w-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
