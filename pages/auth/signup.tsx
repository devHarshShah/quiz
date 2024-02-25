import React, { useState, useEffect } from 'react';
import { Input, Button } from '@nextui-org/react';
import { CircularProgress } from '@nextui-org/react';
import AlertComponent from '../../components/alert';
import DefaultLayout from '@/layouts/default';
import { TypewriterEffectSmooth } from '../../components/typewriter-effect';
import PasswordInput from '../../components/passwordInput';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [cpassword, setCPassword] = React.useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  let newPassword = '';
  let newCPassword = '';
  useEffect(() => {
    if (message !== '') {
      const timer = setTimeout(() => {
        setMessage('');
        setError(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    newPassword = e.target.value;
    setPassword(newPassword);
  };
  const onCPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    newCPassword = e.target.value;
    setCPassword(newCPassword);
  };
  const validateEmail = (email: string) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const isInvalid = React.useMemo(() => {
    if (email === '') return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const validatePassword = (password: string) => {
    return password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/);
  };

  const passwordsMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  const isInvalidPassword = React.useMemo(() => {
    if (password === '') return false;
    return validatePassword(password) ? false : true;
  }, [password]);

  const doPasswordsMatch = React.useMemo(() => {
    if (password === '' && cpassword === '') return true;
    return passwordsMatch(password, cpassword);
  }, [password, cpassword]);

  const onclick = async () => {
    if (isInvalid || isInvalidPassword || !doPasswordsMatch) {
      setMessage('Please check the required conditions..');
      setError(true);
      return;
    }

    setIsLoading(true);
    axios
      .post('/api/signup', {
        email: email,
        password: password,
      })
      .then(function (response: any) {
        console.log(response);
        setEmail('');
        setPassword('');
        setCPassword('');
      })
      .catch(function (error: any) {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        setMessage('User Created Successfully');
      });
  };
  const words = [
    {
      text: 'Sign Up Now',
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
        <div className="w-98 ml-4 text-center">
          <TypewriterEffectSmooth words={words} />
        </div>
        {message && (error ? <AlertComponent title="Failed" message={message} color="error" /> : <AlertComponent title="Success" message={message} color="success" />)}
        <Input isRequired type="email" label="Email" value={email} variant="bordered" placeholder="Enter Your Email" color={isInvalid ? 'danger' : 'default'} errorMessage={isInvalid && 'Please enter a valid email'} className="max-w-md m-7 mb-1" onChange={onEmailChange} />
        <PasswordInput
          label="Password"
          variant="bordered"
          placeholder="Enter Your Password"
          className="max-w-md m-7 mb-1"
          color={isInvalidPassword || !doPasswordsMatch ? 'danger' : 'default'}
          errorMessage={isInvalidPassword && 'Error! Create an 8-character alphanumeric password.'}
          onChange={onPasswordChange}
          value={password}
        />
        <PasswordInput
          label="Confirm Password"
          variant="bordered"
          placeholder="Confirm Your Password"
          className="max-w-md m-7 mb-1"
          color={!doPasswordsMatch ? 'danger' : 'default'}
          errorMessage={!doPasswordsMatch && 'Passwords do not match!'}
          onChange={onCPasswordChange}
          value={cpassword}
        />
        {isLoading ? (
          <div className="flex justify-center">
            <CircularProgress size="lg" aria-label="Loading..." />
          </div>
        ) : (
          <Button onClick={onclick} className="w-96 m-7 mt-3" color="primary" variant="solid">
            Sign Up
          </Button>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Signup;
