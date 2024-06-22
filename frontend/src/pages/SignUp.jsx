import React from 'react';
import { useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import summaryApi from '../common';

function SignUp() {
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    profilePic: '',
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(summaryApi.signUp.url, {
        method: summaryApi.signUp.method,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();
      console.log('data: ', dataApi);
    } else {
      console.log('Password and confirm password are not the same');
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    console.log('imagePic', imagePic);
    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };

  return (
    <section id='signup'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-2 py-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto relative rounded-full overflow-hidden'>
            <div>
              <img
                src={data.profilePic || loginIcons}
                alt='login icon'
              />
            </div>
            <form action=''>
              <label>
                <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                  Upload Photo
                </div>
                <input
                  type='file'
                  className='hidden'
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <form
            action=''
            className='p-6 flex flex-col gap-2'
            onSubmit={handleSubmit}>
            <div className='grid'>
              <label htmlFor=''>Name :</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='text'
                  onChange={handleOnchange}
                  name='name'
                  required
                  value={data.name}
                  placeholder='Enter Your Name'
                  className='w-full h-full outline-none bg-transparent  '
                />
              </div>
            </div>
            <div className='grid'>
              <label htmlFor=''>Email :</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  onChange={handleOnchange}
                  name='email'
                  required
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
                  required
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
            </div>

            <div>
              <label htmlFor=''>Confirm Password :</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Enter Confirm Password'
                  onChange={handleOnchange}
                  name='confirmPassword'
                  required
                  value={data.confirmPassword}
                  className='w-full h-full outline-none bg-transparent  '
                />
                <div
                  className='cursor-pointer text-xl'
                  onClick={() => setConfirmShowPassword((preve) => !preve)}>
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button className='bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
              Sign Up
            </button>
          </form>
          <p className='my-5'>
            Already have account ?{' '}
            <Link
              to={'/login'}
              className='text-red-600 hover:text-red-700 hover:underline'>
              Login
            </Link>{' '}
          </p>
        </div>
      </div>
    </section>
  );
}

export { SignUp };
