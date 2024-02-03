import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
export default function SignIn() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [formData,setFormData]=useState({});
  const {loading,error}=useSelector((state)=>state.user);
  const handleChange=(event)=>{
    setFormData({
      ...formData,
      [event.target.id]:event.target.value,
    })
  }
  const submitHandler=async (event)=>{
    event.preventDefault();
    try{
      dispatch(signInStart());
    const res= await fetch('/api/auth/signin',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data =await res.json();
    if(data.success==false){
      dispatch(signInFailure(data.message));
      return;
    }
   dispatch(signInSuccess(data));
   navigate('/');
  }catch(error){
      dispatch(signInFailure('An unexpected error occurred. Please try again.'));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 mx-3">Sign In</h1>
      <form className="flex flex-col gap-5 mx-3" onSubmit={submitHandler}>
        <input type="text" placeholder='email' className="border p-3 rounded-lg" id='email'
        onChange={handleChange}/>
        <input type="password" placeholder='password' className="border  p-3 rounded-lg" id='password'
        onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg
         uppercase disabled:opacity-50 hover:opacity-90">{loading?'loading...':'Sign UP'}</button>
      </form>
      <div className='flex gap-1 mt-1 mx-4'>
        <p>Don't have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
