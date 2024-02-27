import React, { useState, useEffect } from 'react';
import { Input, Button } from '@nextui-org/react';
import { TypewriterEffectSmooth } from '../../components/typewriter-effect';
import PasswordInput from '../../components/passwordInput';
import { CircularProgress } from '@nextui-org/react';
import DefaultLayout from '@/layouts/default';
import AlertComponent from '../../components/alert';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  useEffect(() => {
    if (message !== '') {
      const timer = setTimeout(() => {
        setMessage('');
        setError(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const validateEmail = (email: string) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const isInvalid = React.useMemo(() => {
    if (email === '') return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const onclick = async () => {
    setIsLoading(true);
    axios
      .post('/api/login', {
        email: email,
        password: password,
      })
      .then(function (response: any) {
        console.log(response);
        localStorage.setItem('token', response.data.token)
        setEmail('');
        setPassword('');
      })
      .catch(function (error: any) {
        console.log(error);
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
        setMessage('Logged in successfully');
      });
  };
  const words = [
    {
      text: 'Login Now',
    },
    {
      text: '& Register',
    },
    {
      text: 'to Create',
    },
    {
      text: 'Quizzes',
      className: 'text-blue-500 dark:text-blue-500',
    },
  ];
  return (
    <DefaultLayout>
      <div className="flex flex-col flex-wrap justify-center content-center w-96">
        <div className="w-98 ml-6 text-center">
          <TypewriterEffectSmooth words={words} />
        </div>
        {message && (error ? <AlertComponent title="Failed" message={message} color="error" /> : <AlertComponent title="Success" message={message} color="success" />)}
        <Input isRequired type="email" label="Email" value={email} variant="bordered" placeholder="Enter Your Email" color={isInvalid ? 'danger' : 'default'} errorMessage={isInvalid && 'Please enter a valid email'} className="max-w-md m-7 mb-1" onChange={onEmailChange} />
        <PasswordInput
          label="Password"
          variant="bordered"
          placeholder="Enter Your Password"
          className="max-w-md m-7 mb-1"
          onChange={onPasswordChange}
          value={password}
        />
       {isLoading ? (
          <div className="flex justify-center">
            <CircularProgress size="lg" aria-label="Loading..." />
          </div>
        ) : (
          <Button onClick={onclick} className="w-96 m-7 mt-3" color="primary" variant="solid">
            Login
          </Button>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Login;
