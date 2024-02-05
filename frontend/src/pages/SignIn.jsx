import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure('An unexpected error occurred. Please try again.'));
    }
  };

  return (
    <div className="p-2 max-w-md mx-auto my-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl text-center font-bold my-7 mx-3">Sign In</h1>
      <form className="flex flex-col gap-4 mx-3" onSubmit={submitHandler}>
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <input
          type="text"
          placeholder="Email"
          className="border p-2 rounded-lg"
          id="email"
          onChange={handleChange}
        />

        <label htmlFor="password" className="text-sm font-semibold">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded-lg"
          id="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-2 rounded-lg uppercase disabled:opacity-50 hover:opacity-90"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth></OAuth>
      </form>
      <div className="flex items-center my-2 mx-3">
    <p className="text-sm font-semibold">Don't have an account?</p>
   <Link to="/sign-up">
     <span className="text-blue-700 ml-1 hover:underline font-semibold text-sm">Sign Up</span>
   </Link>
   </div>

      {error && <p className='text-red-500 mt-2'>{error}</p>}
    </div>
  );
}
