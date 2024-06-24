import React, { useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import summaryApi from '../common';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate()

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const dataResponse = await fetch(summaryApi.signIn.url ,{
      method: summaryApi.signIn.method,
      credentials : 'include', //include cookies etc
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      toast.success(dataApi.message)
      navigate('/')
    }
    if(dataApi.error){
      toast.error(dataApi.message)
    }

  };

  console.log('data login', data);

  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-2 py-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto'>
            <img
              src={loginIcons}
              alt='login icon'
            />
          </div>
          <form
            action=''
            className='p-6 flex flex-col gap-2'
            onSubmit={handleSubmit}>
            <div className='grid'>
              <label htmlFor=''>Email :</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  onChange={handleOnchange}
                  name='email'
                  value={data.email}
                  placeholder='Enter Email'
                  className='w-full h-full outline-none bg-transparent  '
                />
              </div>
            </div>
            <div>
              <label htmlFor=''>Password :</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter Password'
                  onChange={handleOnchange}
                  name='password'
                  value={data.password}
                  className='w-full h-full outline-none bg-transparent  '
                />
                <div
                  className='cursor-pointer text-xl'
                  onClick={() => setShowPassword((preve) => !preve)}>
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={'/forgot-password'}
                className='w-fit block ml-auto hover:underline hover:text-red-600'>
                forgot-password ?
              </Link>
            </div>
            <button className='bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
              Login
            </button>
          </form>
          <p className='my-5'>
            Don't have account ?{' '}
            <Link
              to={'/sign-up'}
              className='text-red-600 hover:text-red-700 hover:underline'>
              Sign Up
            </Link>{' '}
          </p>
        </div>
      </div>
    </section>
  );
}

export { Login };
