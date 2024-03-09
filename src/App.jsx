import { useEffect, useState } from 'react';
import './App.css'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationFrom'


function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const userToken = sessionStorage.getItem('token');
    if (userToken) {
      setToken(userToken);
    }
  }, []);

  return (
    <>
      {token ? <LoginForm /> : <RegistrationForm />}
    </>
  );
}


export default App
