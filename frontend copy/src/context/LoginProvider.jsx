import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);

    if (!userInfo) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <LoginContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(LoginContext);
};

export default LoginProvider;
