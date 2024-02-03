import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
export default function SignIn() {
  const navigate=useNavigate();
  const [formData,setFormData]=useState({});
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
  const handleChange=(event)=>{
    setFormData({
      ...formData,
      [event.target.id]:event.target.value,
    })
  }
  const submitHandler=async (event)=>{
    setLoading(true);
    event.preventDefault();
    try{
    const res= await fetch('/api/auth/signin',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data =await res.json();
    if(data.success==false){
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(null);
   navigate('/');
  }catch(error){
      setLoading(false);
      setError('An unexpected error occurred. Please try again.');
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
